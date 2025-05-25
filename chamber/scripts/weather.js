const apiKey = 'be66aa58132df599c33628ecbde10b15';
const lat = -19.461869898988077;
const lon = 29.811439161806486;

async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather');
    const data = await response.json();
    displayCurrentWeather(data);
    displayForecast(data);
  } catch (error) {
    console.error(error);
    document.getElementById('weather-info').textContent = 'Weather data unavailable.';
  }
}

function displayCurrentWeather(data) {
  const current = data.list[0];
  const temp = Math.round(current.main.temp);
  const desc = current.weather[0].description;
  const condition = current.weather[0].main;

  let iconFile = 'sunny.webp';

  if (condition === 'Clear') {
    if (temp < 10) {
      iconFile = 'no-rain.webp';
    } else {
      iconFile = 'sunny.webp';
    }
  } else if (condition === 'Clouds') {
    iconFile = 'cloudy.webp';
  } else if (condition === 'Rain') {
    iconFile = 'rainfall.webp';
  } else if (condition === 'Drizzle') {
    iconFile = 'wet.webp';
  } else if (condition === 'Thunderstorm') {
    iconFile = 'cloud-lightning.webp';
  } else if (condition === 'Snow') {
    iconFile = 'no-rain.webp';
  } else if (['Mist', 'Fog'].includes(condition)) {
    iconFile = 'fog.webp';
  } else if (['Smoke', 'Haze'].includes(condition)) {
    iconFile = 'haze.webp';
  } else if (['Dust', 'Sand', 'Ash'].includes(condition)) {
    iconFile = 'dusty-day.webp';
  } else if (condition === 'Squall') {
    iconFile = 'stormy-weather.webp';
  } else if (condition === 'Tornado') {
    iconFile = 'windy.webp';
  }

  const iconPath = `images/weather-icons/${iconFile}`;

  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `
    <img src="${iconPath}" alt="${desc}" width="80" />
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Condition:</strong> ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
  `;
}

function displayForecast(data) {
  const forecastContainer = document.querySelector('.weather-forecast');
  const days = {};
  for (let item of data.list) {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString('en-ZA', { weekday: 'long' });
    if (!days[day]) {
      days[day] = item.main.temp;
      if (Object.keys(days).length === 3) break;
    }
  }
  let forecastHTML = '<h2>Weather Forecast</h2>';
  for (let [day, temp] of Object.entries(days)) {
    forecastHTML += `<p><strong>${day}:</strong> ${Math.round(temp)}°C</p>`;
  }
  forecastContainer.innerHTML = forecastHTML;
}

document.addEventListener('DOMContentLoaded', fetchWeather);
