from common.firebase_setup import db
from datetime import datetime
import random

def collect_sensor_3_data():
    sensor_id = "sensor_3"
    name = "Sensor ZK8-107"
    location = "Zunda Krastmala 8 - 107"

    date = datetime.now().strftime("%Y-%m-%d")
    time_now = datetime.now().strftime("%H:%M:%S")
    co2 = round(random.uniform(700, 750), 2)
    temperature = round(random.uniform(23, 24), 1)
    humidity = round(random.uniform(47, 50), 1)

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
    print(f"Sensor 3 data uploaded: {date}, {time_now}, CO2: {co2}, Temp: {temperature}, Humidity: {humidity}")

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
