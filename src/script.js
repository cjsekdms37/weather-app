// Month Date Year
function showDateToday(timestamp) {
  let now = new Date(timestamp);
  let theMonths = [
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
    "December",
  ];

  let theMonth = theMonths[now.getMonth()];
  let theDate = now.getDate();
  let theYear = now.getFullYear();
  return `${theMonth} ${theDate}, ${theYear}`;
}

// Week Days
function cityDay(time) {
  let now = new Date(time);
  let theDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let theDay = theDays[now.getDay()];
  return `${theDay}`;
}

// City
function showData(response) {
  console.log(response);
  let cityName = response.data.city;
  let theCity = document.querySelector("#the-city");
  theCity.innerHTML = cityName;

  let temperatureCel = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#today-degrees");
  temperature.innerHTML = temperatureCel;
  celLink.classList.add("big");
  let fahLink = document.querySelector("#today-fah");
  fahLink.classList.remove("big");

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = windSpeed;

  let mainWeather = response.data.condition.description;
  let theWeather = document.querySelector(".presentWeather");
  theWeather.innerHTML = mainWeather;

  let humidity = response.data.temperature.humidity;
  let humidityPercent = document.querySelector("#humidity-percentage");
  humidityPercent.innerHTML = humidity;

  let currentDay = document.querySelector(".weekDay");
  currentDay.innerHTML = cityDay(response.data.time * 1000);

  let theCurrentDate = document.querySelector(".presentDate");
  theCurrentDate.innerHTML = showDateToday(response.data.time * 1000);

  let weatherIcon = response.data.condition.icon;
  let currentWeatherIcon = document.querySelector("#weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIcon}.png`
  );
  currentWeatherIcon.setAttribute("alt", response.data.condition.icon);

  celciusTemperature = response.data.temperature.current;
}

function searchKey(city) {
  let unit = `metric`;
  let apiKey = "b6d6abf04ta9967430a746of97dac003";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  let input = document.querySelector("#search-input");
  searchKey(searchInput);
  if (input.value === "") {
    input.placeholder = `Please enter a city`;
    searchKey("Chicago");
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);

searchKey("Chicago");

//Temperature
function showCelTemp(tempC) {
  tempC.preventDefault();
  let temperatureCelElement = document.querySelector("#today-degrees");
  temperatureCelElement.innerHTML = Math.round(celciusTemperature);
  let celLink = document.querySelector("#today-cel");
  celLink.classList.add("big");
  let fahLink = document.querySelector("#today-fah");
  fahLink.classList.remove("big");
}

let celLink = document.querySelector("#today-cel");
celLink.addEventListener("click", showCelTemp);

function showFahTemp(tempF) {
  tempF.preventDefault();
  let temperatureFahElement = document.querySelector("#today-degrees");
  temperatureFahElement.innerHTML = Math.round(celciusTemperature * 1.8 + 32);
  let celLink = document.querySelector("#today-cel");
  celLink.classList.remove("big");
  let fahLink = document.querySelector("#today-fah");
  fahLink.classList.add("big");
}
let fahLink = document.querySelector("#today-fah");
fahLink.addEventListener("click", showFahTemp);

// Geolocation
function showLocationInfo(location) {
  console.log(location);
  let locationTemperature = Math.round(location.data.daily[0].temperature.day);
  let temperatureElement = document.querySelector("#today-degrees");
  temperatureElement.innerHTML = locationTemperature;

  let locationName = location.data.city;
  let locationElement = document.querySelector("#the-city");
  locationElement.innerHTML = locationName;

  let locationWindSpeed = Math.round(location.data.daily[0].wind.speed);
  let locatiionWind = document.querySelector("#wind-speed");
  locatiionWind.innerHTML = locationWindSpeed;

  let locationWeather = location.data.daily[0].condition.description;
  let theWeather = document.querySelector(".presentWeather");
  theWeather.innerHTML = locationWeather;

  let locationHumidity = location.data.daily[0].temperature.humidity;
  let locationHumidityPercent = document.querySelector("#humidity-percentage");
  locationHumidityPercent.innerHTML = locationHumidity;
}

function userPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let unit = `metric`;
  let apiKey = "b6d6abf04ta9967430a746of97dac003";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showLocationInfo);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(userPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

let celciusTemperature = null;
