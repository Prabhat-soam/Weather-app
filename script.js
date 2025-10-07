async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a valid city name...</p>";
    return;
  }

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    const areaName = data.nearest_area?.[0]?.areaName?.[0]?.value;

    
    if (!areaName || !areaName.toLowerCase().includes(city.toLowerCase())) {
      resultDiv.innerHTML = `<p>⚠️ City "<b>${city}</b>" not found. Please enter a valid city.</p>`;
      return;
    }

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const desc = current.weatherDesc[0].value;
    const humidity = current.humidity;

    resultDiv.innerHTML = `
      <h2>${areaName}</h2>
      <p>🌡️ Temperature: ${temp} °C</p>
      <p>☁️ Condition: ${desc}</p>
      <p>💧 Humidity: ${humidity}%</p>
    `;

    // Background change
   if (humidity >= 60) {
  document.body.style.backgroundImage = 'url("assets/black_cloud.jpg")';
} else {
  document.body.style.backgroundImage = 'url("assets/cloud.jpg")';
}

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

  } catch (err) {
    resultDiv.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}
