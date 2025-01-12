from flask import Flask, jsonify, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from data_prognosis import make_prognosis
import firebase_admin
from firebase_admin import credentials, db
from Routes.registerRoute import register_blueprint
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
import logging


app = Flask(__name__)
CORS(app)
app.secret_key = "SecR33Tk3y"

cred = credentials.Certificate(r"C:\Users\Vikto\Desktop\RTU\5_semestris\Projektēšanas laboratorija\prolab-8c87f-firebase-adminsdk-kknrj-d1283fa05e.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://prolab-8c87f-default-rtdb.firebaseio.com'
})

@app.route('/')
def home():
    return jsonify({"message": "Hello, Flask from IntelliJ!"})

@app.route('/data')
def data():
    return jsonify({"message": "This is a data endpoint"})

def get_last_n_data_from_firebase(n=30):
    ref = db.reference("sensors/sensor_1/data")
    all_data = ref.order_by_key().limit_to_last(n).get()
    if not all_data:
        return pd.DataFrame()
    data = [
        {
            "date": value.get("date"),
            "time": value.get("time"),
            "temperature": value.get("temperature"),
            "humidity": value.get("humidity"),
            "co2": value.get("co2"),
        }
        for value in all_data.values()
    ]
    df = pd.DataFrame(data)
    df["datetime"] = pd.to_datetime(df["date"] + " " + df["time"])
    df.set_index("datetime", inplace=True)
    return df[["temperature", "humidity", "co2"]]

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(message)s')

def get_last_n_data_from_firebase(n=30):
    ref = db.reference("sensors/sensor_1/data")
    all_data = ref.order_by_key().limit_to_last(n).get()

    if not all_data:
        logging.error("No data fetched from Firebase.")
        return pd.DataFrame()

    data = []
    for key, value in all_data.items():
        data.append({
            "date": value.get("date"),
            "time": value.get("time"),
            "co2": value.get("co2"),
            "temperature": value.get("temperature"),
            "humidity": value.get("humidity")
        })

    df = pd.DataFrame(data)
    df.sort_values(by=["date", "time"], inplace=True)
    logging.debug("Fetched and processed Firebase data:\n%s", df.head())
    return df

def make_stationary(ts):
    adf_test = adfuller(ts.dropna())
    if adf_test[1] > 0.05:
        ts = ts.diff().dropna()
    return ts

def prepare_time_series(data, column):
    data['datetime'] = pd.to_datetime(data['date'] + ' ' + data['time'], errors='coerce')
    data.dropna(subset=['datetime'], inplace=True)
    data.set_index('datetime', inplace=True)
    data = data.drop(columns=['date', 'time'])
    data[column] = pd.to_numeric(data[column], errors='coerce')
    data.dropna(subset=[column], inplace=True)
    data = data.resample('h').mean()
    data[column] = data[column].interpolate(method='linear')
    return data[column]

def train_arima_and_predict(data, column, steps=3):
    ts = prepare_time_series(data, column)
    if ts.empty:
        return [None] * steps
    last_value = ts.iloc[-1]
    ts = make_stationary(ts)
    try:
        model = ARIMA(ts, order=(1, 1, 1))
        model_fit = model.fit()
        forecast_differences = model_fit.forecast(steps=steps)
        forecast = []
        cumulative_value = last_value
        for diff in forecast_differences:
            cumulative_value += diff
            forecast.append(float(cumulative_value))
        return forecast
    except Exception as e:
        logging.error(f"ARIMA error for {column}: {e}")
        return [None] * steps

def generate_prognosis():
    data = get_last_n_data_from_firebase(30)
    if data.empty or len(data) < 20:
        return {"error": "Insufficient data for ARIMA models."}

    prognosis = {}
    for column in ["co2", "temperature", "humidity"]:
        forecast = train_arima_and_predict(data, column, steps=3)
        prognosis[column] = forecast

    return prognosis

def fetch_dashboard_data():
    data = get_last_n_data_from_firebase(30)
    if data.empty:
        return {"error": "No data available."}

    prognosis = generate_prognosis()
    return {
        "records": data.to_dict(orient="records"),
        "prognosis": prognosis
    }
app.register_blueprint(register_blueprint)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    print("Login attempt:")
    print(f"Email: {email}")
    print(f"Password: {password}")

    ref = db.reference("users")
    users = ref.get()
    print("Retrieved users:", users)

    for key, user in users.items():
        print(f"Checking user: {user}")
        if user['email'] == email:
            if check_password_hash(user['password'], password):
                session['user'] = {"id": key, "email": email, "role": user.get('role', 'viewer')}
                return jsonify({"message": "Login successful.", "user": session['user']}), 200
            else:
                print("Password mismatch")
                return jsonify({"message": "Invalid password."}), 401

    print("Email not found")
    return jsonify({"message": "Invalid email or password."}), 401


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "You have been logged out."}), 200

from flask import render_template

@app.route('/dashboard', methods=['GET'])
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/sensor/<sensor_id>', methods=['GET'])
def get_sensor_data(sensor_id):
    ref = db.reference(f"sensors/{sensor_id}/data")
    sensor_data = ref.order_by_key().limit_to_last(30).get()

    if not sensor_data:
        return jsonify({"data": []})

    transformed_data = [
        {
            "time": key,
            "temperature": value.get("temperature"),
            "humidity": value.get("humidity"),
            "co2": value.get("co2")
        }
        for key, value in sensor_data.items()
    ]
    return jsonify({"data": transformed_data})

if __name__ == '__main__':
    app.run(debug=True)
