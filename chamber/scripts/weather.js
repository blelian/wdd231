const apiKey = 'be66aa58132df599c33628ecbde10b15';
const lat = -19.461869898988077;
const lon = 29.811439161806486;

async function fetchWeather() {
  try {
    const [forecastRes, currentRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`),
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    ]);

    if (!forecastRes.ok || !currentRes.ok) throw new Error('Failed to fetch weather');

    const forecastData = await forecastRes.json();
    const currentData = await currentRes.json();

    displayCurrentWeather(currentData, forecastData);
    displayForecast(forecastData);
  } catch (error) {
    console.error(error);
    document.getElementById('weather-info').textContent = 'Weather data unavailable.';
  }
}

function displayCurrentWeather(current, forecast) {
  const temp = Math.round(current.main.temp);
  const humidity = current.main.humidity;
  const desc = current.weather[0].description;
  const condition = current.weather[0].main;
  const sunrise = new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sunset = new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTemps = forecast.list.filter(item => item.dt_txt.startsWith(todayStr)).map(item => item.main.temp);
  const high = Math.round(Math.max(...todayTemps));
  const low = Math.round(Math.min(...todayTemps));

  let iconFile = 'sunny.webp';
  if (condition === 'Clear') {
    iconFile = temp < 10 ? 'no-rain.webp' : 'sunny.webp';
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
    <p><strong>Condition:</strong> ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>High:</strong> ${high}°C</p>
    <p><strong>Low:</strong> ${low}°C</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Sunrise:</strong> ${sunrise}</p>
    <p><strong>Sunset:</strong> ${sunset}</p>
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
