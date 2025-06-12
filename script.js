async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://wttr.in/${city}?format=j1`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const desc = current.weatherDesc[0].value;
    const humidity = current.humidity;

    resultDiv.innerHTML = `
      <h2>${city}</h2>
      <p>🌡️ Temperature: ${temp} °C</p>
      <p>☁️ Condition: ${desc}</p>
      <p>💧 Humidity: ${humidity}%</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}
