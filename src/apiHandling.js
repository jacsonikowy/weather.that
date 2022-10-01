const API_KEY = 'cf1262a2bcbb31bb02c713662121cd2d';

let cityName = '';
let lat = 0;
let lon = 0;

export function displayIcons(response) {
  const image = document.querySelector('.weather-img');

  const url = `http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`;

  image.src = url;
}

export async function getLatAndLon(city) {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`, { mode: 'cors' });
  const data = await response.json();

  cityName = data[0].name;
  lat = data[0].lat;
  lon = data[0].lon;

  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, { mode: 'cors' });
  const weatherData = await weather.json();

  return { weatherData, cityName };
}
