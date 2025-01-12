import time
from Sensors._init_ import collect_all_sensors_data

def run_all_sensors():
    while True:
        all_data = collect_all_sensors_data()
       # print("Collected data:", all_data)
        time.sleep(120)

if __name__ == "__main__":
    try:
        run_all_sensors()
    except KeyboardInterrupt:
        print("Data collection stopped.")
