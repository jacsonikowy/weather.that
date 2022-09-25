import * as handle from './apiHandling.js';

// html paragraphs for information
const dateDesc = document.querySelector('.date');
const hourDesc = document.querySelector('.hour');

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

function startup() {
  handle.getLatAndLon('Auckland');
  displayDateAndTime();
}

// on Load
window.addEventListener('load', () => {
  startup();
});

// Listeners
const searchBtn = document.querySelector('.searchBtn');
const locationSearch = document.querySelector('.locationSearch');

locationSearch.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handle.getLatAndLon(locationSearch.value);
    displayDateAndTime();
  }
});

searchBtn.addEventListener('click', (e) => {
  if (e.target) {
    handle.getLatAndLon(locationSearch.value);
    displayDateAndTime();
  }
});
