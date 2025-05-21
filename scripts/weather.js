const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=be66aa58132df599c33628ecbde10b15';

const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.getElementById('weather-description');

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc.charAt(0).toUpperCase() + desc.slice(1));
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

apiFetch(url);