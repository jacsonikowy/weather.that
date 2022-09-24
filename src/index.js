const API_KEY = "YOUR_API_KEY"

// html paragraphs for information
const weather_desc = document.querySelector(".weather")
const city_desc = document.querySelector(".city")
const date_desc = document.querySelector(".date")
const hour_desc = document.querySelector(".hour")

const temperature = document.querySelector(".temperature")

const humidity = document.querySelector(".humidity")
const feelsLike = document.querySelector(".feels-like")
const windSpeed = document.querySelector(".wind-speed")
const pressure = document.querySelector(".pressure")

var cityName = ""
var lat = 0;
var lon = 0;

function getLatAndLon(city){
	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`, {mode: 'cors'})
		.then(response => {
			console.log("Data successfully fetched!")
			return response.json()
		})
		.then(response => {
			console.log(response)
			cityName = response[0].name
			lat = response[0].lat
			lon = response[0].lon

			gettingApiData(lat,lon)
		})
		.catch(error => {
			console.log("Something wrong happened")
		});

}

function gettingApiData(lat,lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`, {mode: 'cors'})
		.then(response => {
			console.log("Successfully fetched!")
			return response.json()
		})
		.then(response => {
			console.log(response)
			weather_desc.textContent = response.weather[0].description
			city_desc.textContent = cityName
			temperature.textContent = parseInt(response.main.temp) + "°C"
			feelsLike.textContent = "Feels Like: " + parseInt(response.main.feels_like) + "°C"
			humidity.textContent = "Humidity: " + response.main.humidity + "%"
			windSpeed.textContent = "Wind Speed: " + response.wind.speed + "m/s"
			pressure.textContent = "Pressure: " + response.main.pressure + "hPa"

			displayIcons(response)
		})
		.catch(error => {
			console.log("Something Wrong happened")
		})
}

function displayIcons(response){
	const image = document.querySelector(".weather-img")

	let url = `http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`

	image.src=url
}

function displayDateAndTime(){
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	]

	const weekdays = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	]


	const date = new Date()

	const day = date.getDate()
	const weekday = weekdays[date.getDay()]
	const month = months[date.getMonth()]
	const year = date.getFullYear()

	const hour = date.getHours()
	const minute = date.getMinutes()

	date_desc.textContent = `${weekday}, ${day}th ${month} ${year}`
	hour_desc.textContent = `${hour}:${minute}`
}

displayDateAndTime()

getLatAndLon("Sydney")


console.log(lon)
