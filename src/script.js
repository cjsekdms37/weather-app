let now = new Date();

// Week Days
let weekDay = document.querySelector(".weekDay");
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
weekDay.innerHTML = `${theDay}`;

// Months
let todayMonth = document.querySelector("#todayMonth");
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
todayMonth.innerHTML = `${theMonth}`;

// Date
let todayDate = document.querySelector("#todayDate");
let theDate = now.getDate();
todayDate.innerHTML = `${theDate}`;

// Year
let todayYear = document.querySelector("#todayYear");
let theYear = now.getFullYear();
todayYear.innerHTML = `${theYear}`;

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
  searchKey(searchInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitSearch);

searchKey("Chicago");

//Temperature
function showCelTemp(tempC) {
  tempC.preventDefault();
  let temperatureCelElement = document.querySelector("#today-degrees");
  temperatureCelElement.innerHTML = 20;
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
  temperatureFahElement.innerHTML = 68;
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
  console.log(position);
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
