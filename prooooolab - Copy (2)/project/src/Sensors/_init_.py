from .sensor_1 import collect_sensor_1_data
from .sensor_2 import collect_sensor_2_data
from .sensor_3 import collect_sensor_3_data

def collect_all_sensors_data():
    # Collect data from each sensor
    sensor_1_data = collect_sensor_1_data()
    sensor_2_data = collect_sensor_2_data()
    sensor_3_data = collect_sensor_3_data()

    # Aggregate the data
    all_data = {
        "sensor_1": sensor_1_data,
        "sensor_2": sensor_2_data,
        "sensor_3": sensor_3_data
    }
    return all_data
