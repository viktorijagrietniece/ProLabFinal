document.addEventListener("DOMContentLoaded", () => {
  const fetchPrognosisButton = document.getElementById("fetchPrognosis");
  const errorDiv = document.getElementById("error");
  const prognosisDiv = document.getElementById("prognosis");
  const predictedCO2 = document.getElementById("predictedCO2");
  const predictedTemperature = document.getElementById("predictedTemperature");
  const predictedHumidity = document.getElementById("predictedHumidity");

  const ctx = document.getElementById("prognosisChart").getContext("2d");
  let chart = null;

  fetchPrognosisButton.addEventListener("click", async () => {
    errorDiv.textContent = "";
    prognosisDiv.style.display = "none";
    try {
      const response = await fetch("http://127.0.0.1:5000/prognosis");
      const data = await response.json();

      if (data.error) {
        errorDiv.textContent = data.error;
        return;
      }

      predictedCO2.textContent = `Predicted CO2: ${data.predicted_co2}`;
      predictedTemperature.textContent = `Predicted Temperature: ${data.predicted_temperature}`;
      predictedHumidity.textContent = `Predicted Humidity: ${data.predicted_humidity}`;
      prognosisDiv.style.display = "block";

      const chartData = {
        labels: ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
        datasets: [
          {
            label: "CO2 Levels",
            data: [data.co2_1, data.co2_2, data.co2_3, data.co2_4, data.co2_5],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: "Temperature",
            data: [data.temp_1, data.temp_2, data.temp_3, data.temp_4, data.temp_5],
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
          },
          {
            label: "Humidity",
            data: [data.humidity_1, data.humidity_2, data.humidity_3, data.humidity_4, data.humidity_5],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
          },
        ],
      };
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    } catch (err) {
      console.error("Error fetching prognosis:", err);
      errorDiv.textContent = "An error occurred while fetching prognosis data.";
    }
  });
});
