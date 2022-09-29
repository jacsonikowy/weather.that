const API_KEY = 'cf1262a2bcbb31bb02c713662121cd2d';

let cityName = '';
let lat = 0;
let lon = 0;

const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const pressure = document.querySelector('.pressure');
const weatherDesc = document.querySelector('.weather');
const cityDesc = document.querySelector('.city');

export function displayIcons(response) {
  const image = document.querySelector('.weather-img');

  const url = `http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`;

  image.src = url;
}

export function gettingApiData(latitude, longitude) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`, { mode: 'cors' })
    .then((response) => {
      console.log('Successfully fetched!');
      return response.json();
    })
    .then((response) => {
      weatherDesc.textContent = response.weather[0].description;
      cityDesc.textContent = cityName;
      temperature.textContent = `${parseInt(response.main.temp, 10)}°C`;
      feelsLike.textContent = `Feels: ${parseInt(response.main.feels_like, 10)}°C`;
      humidity.textContent = `Humidity: ${response.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${response.wind.speed}m/s`;
      pressure.textContent = `Pressure: ${response.main.pressure}hPa`;

      displayIcons(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getLatAndLon(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`, { mode: 'cors' })
    .then((response) => {
      console.log('Data successfully fetched!');
      return response.json();
    })
    .then((response) => {
      console.log(response);
      cityName = response[0].name;
      lat = response[0].lat;
      lon = response[0].lon;

      gettingApiData(lat, lon);
    })
    .catch((error) => {
      console.log(error);
    });
}
