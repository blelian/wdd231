const apiKey = "be66aa58132df599c33628ecbde10b15";
const lat = -19.46187;
const lon = 29.81144;
const weatherInfo = document.getElementById("weather-info");

const iconMap = {
  Thunderstorm: "cloud-lightning.webp",
  Drizzle: "rainfall.webp",
  Rain: "wet.webp",
  Snow: "no-rain.webp",
  Mist: "fog.webp",
  Smoke: "haze.webp",
  Haze: "haze.webp",
  Dust: "dusty-day.webp",
  Fog: "fog.webp",
  Sand: "dusty-day.webp",
  Ash: "dusty-day.webp",
  Squall: "stormy-weather.webp",
  Tornado: "stormy-weather.webp",
  Clear: "sunny.webp",
  Clouds: "partly-cloudy.webp"
};

const getWeatherIcon = (main) => {
  return `images/weather-icons/${iconMap[main] || "partly-cloudy.webp"}`;
};

async function fetchWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const { temp } = data.main;
    const { description, main } = data.weather[0];

    const iconPath = getWeatherIcon(main);

    weatherInfo.innerHTML = `
      <img src="${iconPath}" alt="${description}" width="80" height="80" />
      <p><strong>${Math.round(temp)}°C</strong></p>
      <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Weather data unavailable</p>`;
    console.error("Weather fetch error:", error);
  }
}

fetchWeather();
