    const firebaseConfig = {
        apiKey: "AIzaSyAnx46u8MjCHvfIPEgHUyGhOZ2gBqPbyjk",
        authDomain: "prolab-8c87f.firebaseapp.com",
        databaseURL: "https://prolab-8c87f-default-rtdb.firebaseio.com",
        projectId: "prolab-8c87f",
        storageBucket: "prolab-8c87f.firebasestorage.app",
        messagingSenderId: "1094875952377",
        appId: "1:1094875952377:web:c9031f1c88689b8ade5e28"
    };
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    console.log("Firebase initialized:", firebaseConfig.databaseURL);
    async function fetchSensorData(sensorId) {
        try {
            const sensorRef = firebase.database().ref(`sensors/${sensorId}/data`);
            const snapshot = await sensorRef.orderByKey().limitToLast(30).once('value');
            const data = [];
            snapshot.forEach(childSnapshot => {
                const value = childSnapshot.val();
                data.push({
                    time: `${value.date}_${value.time.replace(/:/g, '-')}`,
                    time: `${value.date}_${value.time.replace(/:/g, '-')}`,
                    temperature: value.temperature,
                    humidity: value.humidity,
                    co2: value.co2
                });
            });
            return data;
        } catch (error) {
            return [];
        }
    }
       document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', () => {
        const parentWrapper = button.closest('.chart-wrapper');
        const tabs = parentWrapper.querySelector('.tabs');
        const activeTab = parentWrapper.querySelector('.tab-button.active');
        const chartContainers = parentWrapper.querySelectorAll('.chart-container');
        const toggleIcon = button.querySelector('img');

        document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
            if (wrapper !== parentWrapper) {
                wrapper.querySelector('.tabs').classList.add('hidden');
                wrapper.querySelectorAll('.chart-container').forEach(container => container.classList.add('hidden'));
                const icon = wrapper.querySelector('.toggle-button img');
                if (icon) icon.src = '/static/Buttons/arrowhead-right-solid-svgrepo-com.svg';
            }
        });

        if (tabs.classList.contains('hidden')) {
            tabs.classList.remove('hidden');
            chartContainers.forEach(container => container.classList.add('hidden'));
            if (activeTab) {
                const target = activeTab.dataset.target;
                parentWrapper.querySelector(`#${target}`).classList.remove('hidden');
            }
            toggleIcon.src = '/static/Buttons/arrowhead-down-solid-svgrepo-com.svg';
        } else {
            tabs.classList.add('hidden');
            chartContainers.forEach(container => container.classList.add('hidden'));
            toggleIcon.src = '/static/Buttons/arrowhead-right-solid-svgrepo-com.svg';
        }
    });
});

    document.querySelectorAll('.tabs .tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const parentWrapper = button.closest('.chart-wrapper');
        const target = button.dataset.target;
        parentWrapper.querySelectorAll('.chart-container').forEach(container => {
            container.classList.add('hidden');
        });
        parentWrapper.querySelector(`#${target}`).classList.remove('hidden');
        parentWrapper.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});
function updateIndicators(wrapper, sensorData, moderateLevel, highLevel) {
    const indicators = wrapper.querySelectorAll('.tab-button');
    const stats = calculateStats(sensorData, moderateLevel, highLevel);
    const alertList = document.getElementById('alert-list');
    indicators.forEach((button, index) => {
        let levelColor;
        if (stats[index].aboveHigh > stats[index].total / 2) {
            levelColor = 'red';
        } else if (stats[index].aboveModerate > stats[index].total / 2) {
            levelColor = 'orange';
        } else {
            levelColor = 'green';
        }
        let circle = button.querySelector('.indicator-circle');
        if (!circle) {
            circle = document.createElement('span');
            circle.classList.add('indicator-circle');
            button.prepend(circle);
        }
        circle.style.backgroundColor = levelColor;
        const sensorName = wrapper.querySelector('.location').textContent.trim();
                const parameter = button.textContent.trim();

                if (levelColor === 'orange' || levelColor === 'red') {
                    addToAlertPanel(sensorName, parameter, levelColor);
                } else {
                    removeFromAlertPanel(sensorName, parameter);
                 }
    });
}
function addToAlertPanel(sensorName, parameter, color) {
    const alertList = document.getElementById('alert-list');
    const existingAlert = document.querySelector(
        `[data-sensor="${sensorName}"][data-parameter="${parameter}"]`
    );

    if (existingAlert) return;
    const alertItem = document.createElement('div');
    alertItem.classList.add('alert-item');
    alertItem.setAttribute('data-sensor', sensorName);
    alertItem.setAttribute('data-parameter', parameter);

    alertItem.innerHTML = `
        <span>${sensorName}<br>${parameter}</span>
        <span class="alert-indicator" style="background-color: ${color};"></span>
    `;

    alertList.appendChild(alertItem);
}
function removeFromAlertPanel(sensorName, parameter) {
    const alertItem = document.querySelector(
        `[data-sensor="${sensorName}"][data-parameter="${parameter}"]`
    );
    if (alertItem) {
        alertItem.remove();
    }
}
function calculateStats(sensorData, moderateLevel, highLevel) {
    return sensorData.map((dataSet, index) => {
        const aboveModerate = dataSet.filter(value => {
            return value > moderateLevel[index];
        }).length;

        const aboveHigh = dataSet.filter(value => {
            return value > highLevel[index];
        }).length;
        return {
            total: dataSet.length,
            aboveModerate,
            aboveHigh
        };
    });
}
const chartWrappers = document.querySelectorAll('.chart-wrapper');
chartWrappers.forEach((wrapper, sensorIndex) => {
    const sensorId = `sensor_${sensorIndex + 1}`;
    fetchSensorData(sensorId).then((sensorData) => {
        const temperatureData = sensorData.map(d => d.temperature);
        const humidityData = sensorData.map(d => d.humidity);
        const co2Data = sensorData.map(d => d.co2);
        const moderateLevels = [24, 60, 1000];
        const highLevels = [30, 70, 1200];

        updateIndicators(wrapper, [temperatureData, humidityData, co2Data], moderateLevels, highLevels);
    }).catch(error => {
    });
});
   function createChart(ctx, label, color, moderateLevel, badLevel) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: label,
                data: [],
                backgroundColor: color,
                borderColor: color,
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'Time', color: '#333' },
                    ticks: {
                        display: false, autoSkip: false, color: '#333'
                    }
                },
                y: {
                    title: { display: true, text: label, color: '#333' },
                    ticks: {
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                annotation: {
                    annotations: {
                        yellowLine: {
                            type: 'line',
                            xMin: -1,
                            xMax: -1,
                            borderColor: 'yellow',
                            borderWidth: 2,
                            label: {
                                content: 'Prognosis',
                                enabled: true,
                                position: 'end'
                            }
                        },
                        orangeLine: {
                            type: 'line',
                            yMin: moderateLevel,
                            yMax: moderateLevel,
                            borderColor: 'orange',
                            borderWidth: 1,
                            label: {
                                content: 'Moderate',
                                enabled: true,
                                position: 'start'
                            }
                        },
                        redLine: {
                            type: 'line',
                            yMin: badLevel,
                            yMax: badLevel,
                            borderColor: 'red',
                            borderWidth: 1,
                            label: {
                                content: 'Bad',
                                enabled: true,
                                position: 'start'
                            }
                        }
                    }
                }
            }
        }
    });
}
    const sensor1TemperatureChart = createChart(
    document.getElementById('sensor1TemperatureChart').getContext('2d'),
    'Temperature',
    'rgba(255, 99, 132, 1)',
    24,
    27
);
const sensor1HumidityChart = createChart(
    document.getElementById('sensor1HumidityChart').getContext('2d'),
    'Humidity',
    'rgba(54, 162, 235, 1)',
    60,
    70
);
const sensor1CO2Chart = createChart(
    document.getElementById('sensor1CO2Chart').getContext('2d'),
    'CO2',
    'rgba(75, 192, 192, 1)',
    1000,
    1500
);
    const sensor2TemperatureChart = createChart(
    document.getElementById('sensor2TemperatureChart').getContext('2d'),
    'Temperature',
    'rgba(255, 99, 132, 1)',
    24,
    27
);
const sensor2HumidityChart = createChart(
    document.getElementById('sensor2HumidityChart').getContext('2d'),
    'Humidity',
    'rgba(54, 162, 235, 1)',
    60,
    70
);
const sensor2CO2Chart = createChart(
    document.getElementById('sensor2CO2Chart').getContext('2d'),
    'CO2',
    'rgba(75, 192, 192, 1)',
    1000,
    1500
);
    const sensor3TemperatureChart = createChart(
    document.getElementById('sensor3TemperatureChart').getContext('2d'),
    'Temperature',
    'rgba(255, 99, 132, 1)',
    24,
    27
);
const sensor3HumidityChart = createChart(
    document.getElementById('sensor3HumidityChart').getContext('2d'),
    'Humidity',
    'rgba(54, 162, 235, 1)',
    60,
    70
);
const sensor3CO2Chart = createChart(
    document.getElementById('sensor3CO2Chart').getContext('2d'),
    'CO2',
    'rgba(75, 192, 192, 1)',
    1000,
    1500
);
    const sensor4TemperatureChart = createChart(
    document.getElementById('sensor4TemperatureChart').getContext('2d'),
    'Temperature',
    'rgba(255, 99, 132, 1)',
    24,
    27
);
const sensor4HumidityChart = createChart(
    document.getElementById('sensor4HumidityChart').getContext('2d'),
    'Humidity',
    'rgba(54, 162, 235, 1)',
    60,
    70
);
const sensor4CO2Chart = createChart(
    document.getElementById('sensor4CO2Chart').getContext('2d'),
    'CO2',
    'rgba(75, 192, 192, 1)',
    1000,
    1500
);
    async function updateCharts() {
        const sensor1Data = await fetchSensorData("sensor_1");
        const sensor2Data = await fetchSensorData("sensor_2");
        const sensor3Data = await fetchSensorData("sensor_3");
        const sensor4Data = await fetchSensorData("sensor_4");
        const sensor1Prognosis = generatePrognosis(sensor1Data);
        const sensor2Prognosis = generatePrognosis(sensor2Data);
        const sensor3Prognosis = generatePrognosis(sensor3Data);
        const sensor4Prognosis = generatePrognosis(sensor4Data);
        console.log("Fetched sensor 4 data:", sensor4Data);

        if (sensor1Data.length) {
            updateChart(
                sensor1TemperatureChart,
                sensor1Data.map(entry => ({ x: entry.time, y: entry.temperature })),
                sensor1Prognosis.temperature
            );
            updateChart(
                sensor1HumidityChart,
                sensor1Data.map(entry => ({ x: entry.time, y: entry.humidity })),
                sensor1Prognosis.humidity
            );
            updateChart(
                sensor1CO2Chart,
                sensor1Data.map(entry => ({ x: entry.time, y: entry.co2 })),
                sensor1Prognosis.co2
            );
        }

        if (sensor2Data.length) {
            updateChart(
                sensor2TemperatureChart,
                sensor2Data.map(entry => ({ x: entry.time, y: entry.temperature })),
                sensor2Prognosis.temperature
            );
            updateChart(
                sensor2HumidityChart,
                sensor2Data.map(entry => ({ x: entry.time, y: entry.humidity })),
                sensor2Prognosis.humidity
            );
            updateChart(
                sensor2CO2Chart,
                sensor2Data.map(entry => ({ x: entry.time, y: entry.co2 })),
                sensor2Prognosis.co2
            );
        }

        if (sensor3Data.length) {
            updateChart(
                sensor3TemperatureChart,
                sensor3Data.map(entry => ({ x: entry.time, y: entry.temperature })),
                sensor3Prognosis.temperature
            );
            updateChart(
                sensor3HumidityChart,
                sensor3Data.map(entry => ({ x: entry.time, y: entry.humidity })),
                sensor3Prognosis.humidity
            );
            updateChart(
                sensor3CO2Chart,
                sensor3Data.map(entry => ({ x: entry.time, y: entry.co2 })),
                sensor3Prognosis.co2
            );
        }
        if (sensor4Data.length) {
                    updateChart(
                        sensor4TemperatureChart,
                        sensor4Data.map(entry => ({ x: entry.time, y: entry.temperature })),
                        sensor4Prognosis.temperature
                    );
                    updateChart(
                        sensor4HumidityChart,
                        sensor4Data.map(entry => ({ x: entry.time, y: entry.humidity })),
                        sensor4Prognosis.humidity
                    );
                    updateChart(
                        sensor4CO2Chart,
                        sensor4Data.map(entry => ({ x: entry.time, y: entry.co2 })),
                        sensor4Prognosis.co2
                    );
                }
    }

function updateChart(chart, data, prognosis = null) {

    chart.data.labels = data.map(point => {
        const rawTime = point.x;
        if (rawTime.includes(',')) {
            return rawTime.split(', ')[1]?.slice(0, 5);
        } else if (rawTime.includes('T')) {
            return new Date(rawTime).toTimeString().slice(0, 5);
        } else {
            return rawTime;
        }
    });

    chart.data.datasets[0].data = data.map(point => point.y);


    if (prognosis && prognosis.length > 0) {
        const lastTimestamp = chart.data.labels[chart.data.labels.length - 1];
        let lastDateTime = new Date(`1970-01-01T${lastTimestamp}:00`);

        prognosis.forEach(value => {
            lastDateTime.setMinutes(lastDateTime.getMinutes() + 60);
            const timeLabel = lastDateTime.toTimeString().slice(0, 5);
            chart.data.labels.push(timeLabel);
            chart.data.datasets[0].data.push(value);
        });

        const lastActualIndex = data.length - 1;
        chart.options.plugins.annotation.annotations.yellowLine.xMin = lastActualIndex + 0.5;
        chart.options.plugins.annotation.annotations.yellowLine.xMax = lastActualIndex + 0.5;
    } else {
        chart.options.plugins.annotation.annotations.yellowLine.xMin = -1;
        chart.options.plugins.annotation.annotations.yellowLine.xMax = -1;
    }
    chart.update();
}
  function generatePrognosis(sensorData) {
      if (!sensorData || sensorData.length < 20) {
          return { temperature: [], humidity: [], co2: [] };
      }

      const temperatureData = sensorData.map(entry => entry.temperature);
      const humidityData = sensorData.map(entry => entry.humidity);
      const co2Data = sensorData.map(entry => entry.co2);

      const temperaturePrognosis = calculatePrognosis(temperatureData);
      const humidityPrognosis = calculatePrognosis(humidityData);
      const co2Prognosis = calculatePrognosis(co2Data);


      return {
          temperature: temperaturePrognosis,
          humidity: humidityPrognosis,
          co2: co2Prognosis,
      };
  }
    function calculatePrognosis(data, steps = 3) {
        const n = data.length;
        const slope = (data[n - 1] - data[0]) / n;
        const forecast = [];
        for (let i = 1; i <= steps; i++) {
            forecast.push(data[n - 1] + i * slope);
        }
        return forecast;
    }
    setInterval(updateCharts, 5000);

    document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarMonth = document.getElementById("calendarMonth");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");
    let currentDate = new Date();
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const today = new Date();
        calendarMonth.textContent = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

        calendarGrid.innerHTML = "";
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const blankCell = document.createElement("div");
            calendarGrid.appendChild(blankCell);
        }

        for (let day = 1; day <= lastDate; day++) {
            const dayCell = document.createElement("div");
            const cellDate = new Date(year, month, day);

            dayCell.textContent = day;

            if (
                day === today.getDate() &&
                year === today.getFullYear() &&
                month === today.getMonth()
            ) {
                dayCell.classList.add("today");
            }

            if (cellDate > today) {
                dayCell.classList.add("disabled");
            }

            calendarGrid.appendChild(dayCell);
        }
    }
    prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });
    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
    renderCalendar(currentDate);
});
document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-location-button');
    editButtons.forEach(button => {
        const sensorId = button.dataset.sensorId;
        const modal = document.getElementById(`editLocationModal${sensorId}`);
        const locationInput = document.getElementById(`locationInput${sensorId}`);
        const saveButton = document.getElementById(`saveLocationButton${sensorId}`);
        const closeButton = modal.querySelector(`.close-button[data-sensor-id="${sensorId}"]`);

        const currentLocationElement = button.closest('.chart-wrapper').querySelector('.location');

        button.addEventListener('click', () => {
            modal.classList.remove('hidden');
            locationInput.value = currentLocationElement.textContent.trim();
        });
        saveButton.addEventListener('click', () => {
            if (locationInput.value.trim()) {
                currentLocationElement.textContent = locationInput.value.trim();
                modal.classList.add('hidden');
            }
        });
        closeButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-chart-button');
    deleteButtons.forEach(button => {
        const sensorId = button.dataset.sensorId;
        const modal = document.getElementById(`deleteModal${sensorId}`);
        const confirmDeleteButton = modal.querySelector('.confirm-delete');
        const cancelDeleteButton = modal.querySelector('.cancel-delete');
        const closeButton = modal.querySelector('.close-button');
        const chartWrapper = document.getElementById(`chartWrapper${sensorId}`);
        button.addEventListener('click', () => {
                console.log(`Delete button clicked for sensor ID: ${sensorId}`);
            });
        button.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
        cancelDeleteButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        closeButton.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        confirmDeleteButton.addEventListener('click', () => {
            const chartWrapper = document.getElementById(`chartWrapper${sensorId}`);
            if (chartWrapper) {
                chartWrapper.remove();
                console.log(`Chart for sensor ${sensorId} removed.`);
            }
            modal.classList.add('hidden');
        });
    });
});
