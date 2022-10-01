import * as handle from './apiHandling.js';

// html paragraphs for information

const dateDesc = document.querySelector('.date');
const hourDesc = document.querySelector('.hour');

const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const pressure = document.querySelector('.pressure');
const weatherDesc = document.querySelector('.weather');
const cityDesc = document.querySelector('.city');

// Functions
function displayDateAndTime() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const date = new Date();

  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hour = date.getHours();
  const minute = date.getMinutes();

  dateDesc.textContent = `${weekday}, ${day}th ${month} ${year}`;
  hourDesc.textContent = `${hour}:${minute}`;
}

function displayOnPageData(response, cityName) {
  weatherDesc.textContent = response.weather[0].description;
  cityDesc.textContent = cityName;
  temperature.textContent = `${parseInt(response.main.temp, 10)}°C`;
  feelsLike.textContent = `Feels: ${parseInt(response.main.feels_like, 10)}°C`;
  humidity.textContent = `Humidity: ${response.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${response.wind.speed}m/s`;
  pressure.textContent = `Pressure: ${response.main.pressure}hPa`;

  handle.displayIcons(response);
}

async function startup() {
  const { weatherData, cityName } = await handle.getLatAndLon('Auckland');
  displayOnPageData(weatherData, cityName);
  displayDateAndTime();
}

// on Load
window.addEventListener('load', () => {
  startup();
});

// Listeners
const searchBtn = document.querySelector('.searchBtn');
const locationSearch = document.querySelector('.locationSearch');

locationSearch.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const { weatherData, cityName } = await handle.getLatAndLon(locationSearch.value);
    displayOnPageData(weatherData, cityName);
    displayDateAndTime();
  }
});

searchBtn.addEventListener('click', async (e) => {
  if (e.target) {
    const { weatherData, cityName } = await handle.getLatAndLon(locationSearch.value);
    displayOnPageData(weatherData, cityName);
    displayDateAndTime();
  }
});
