import random
from datetime import datetime
from common.firebase_setup import db

def collect_sensor_1_data():
    sensor_id = "sensor_1"
    name = "Sensor ZK8-302"
    location = "Zunda Krastmala 8 - 302"

    date = datetime.now().strftime("%Y-%m-%d")
    time_now = datetime.now().strftime("%H:%M:%S")
    co2 = round(random.uniform(852, 893), 2)
    temperature = round(random.uniform(23.3, 23.8), 1)
    humidity = round(random.uniform(43.2, 44.2), 1)

    ref = db.reference(f"sensors/{sensor_id}")
    ref.update({
        "location": location,
        "name": name
    })
    ref.child("data").child(datetime.now().strftime("%Y-%m-%d_%H-%M-%S")).set({
        "date": date,
        "time": time_now,
        "co2": co2,
        "temperature": temperature,
        "humidity": humidity
    })
    print(f"Sensor 1 data uploaded: {date}, {time_now}, CO2: {co2}, Temp: {temperature}, Humidity: {humidity}")

    return {
        "sensor_id": sensor_id,
        "name": name,
        "location": location,
        "date": date,
        "time": time_now,
        "co2": co2,
        "temperature": temperature,
        "humidity": humidity
    }
