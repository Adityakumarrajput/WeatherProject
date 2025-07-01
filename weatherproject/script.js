document.querySelector("#getWeatherBtn").addEventListener('click', () => {
  const place = document.getElementById('location').value;
  const weatherInfo = document.getElementById("weatherInfo");
  const loading = document.getElementById("loading");

  if (!place) {
    weatherInfo.innerHTML = "Please enter a location.";
    return;
  }

  loading.style.display = "block";
  weatherInfo.innerHTML = "";

  const url = `https://api.weatherapi.com/v1/current.json?key=f0a56191e1114b9db0482147252906&q=${place}&aqi=yes`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then(data => {
      const condition = data.current.condition.text.toLowerCase();
      const background = document.querySelector('.background');

      if (condition.includes("cloud")) {
        background.style.backgroundImage = "url('cloudy.jpg')";
      } else if (condition.includes("rain")) {
        background.style.backgroundImage = "url('rainy.jpg')";
      } else {
        background.style.backgroundImage = "url('sunny.jpg')";
      }

      weatherInfo.innerHTML = `
        <h3>${data.location.name}, ${data.location.country}</h3>
        <p><strong>Local Time:</strong> ${data.location.localtime}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C / ${data.current.temp_f}°F</p>
        <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <img src="https:${data.current.condition.icon}" alt="weather icon" />
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `Error: ${error.message}`;
    })
    .finally(() => {
      loading.style.display = "none";
    });
});




