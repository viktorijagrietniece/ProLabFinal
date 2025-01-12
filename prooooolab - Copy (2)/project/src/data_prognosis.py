import pandas as pd
from firebase_admin import db

def get_last_n_data_from_firebase(n=5):
    ref = db.reference("sensors/sensor_1/data")
    all_data = ref.order_by_key().limit_to_last(n).get()

    if not all_data:
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
    return df

def calculate_moving_average(data, column):
    return data[column].mean()

def make_prognosis():
    data = get_last_n_data_from_firebase(5)
    if data.empty or len(data) < 5:
        return {"error": "Not enough data for a 5-point moving average."}
    prognosis = {}
    for column in ["co2", "temperature", "humidity"]:
        avg = calculate_moving_average(data, column)
        prognosis[f"predicted_{column}"] = round(avg, 2)
    return prognosis
