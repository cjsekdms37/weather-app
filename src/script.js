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
function forecastDayFormat(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  forecastDayFormat(dailyForecast);
  console.log(response);
  // Forecast Box One
  let boxOneDay = document.querySelector("#box-one-day");
  boxOneDay.innerHTML = forecastDayFormat(dailyForecast[1].time);

  let iconOne = document.querySelector("#weather-icon-one");
  let weatherIconOne = dailyForecast[1].condition.icon;

  iconOne.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconOne}.png`
  );
  iconOne.setAttribute("alt", dailyForecast[1].condition.icon);

  let forecastOneMax = document.querySelector("#first-box-max");
  forecastOneMax.innerHTML = Math.round(dailyForecast[1].temperature.maximum);
  let forecastOneMin = document.querySelector("#first-box-min");
  forecastOneMin.innerHTML = Math.round(dailyForecast[1].temperature.minimum);

  // Forecast Box Two
  let boxTwoDay = document.querySelector("#box-two-day");
  boxTwoDay.innerHTML = forecastDayFormat(dailyForecast[2].time);

  let iconTwo = document.querySelector("#weather-icon-two");
  let weatherIconTwo = dailyForecast[2].condition.icon;
  iconTwo.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconTwo}.png`
  );
  iconTwo.setAttribute("alt", dailyForecast[2].condition.icon);

  let forecastTwoMax = document.querySelector("#second-box-max");
  forecastTwoMax.innerHTML = Math.round(dailyForecast[2].temperature.maximum);
  let forecastTwoMin = document.querySelector("#second-box-min");
  forecastTwoMin.innerHTML = Math.round(dailyForecast[2].temperature.minimum);

  // Forecast Box Three
  let boxThreeDay = document.querySelector("#box-three-day");
  boxThreeDay.innerHTML = forecastDayFormat(dailyForecast[3].time);

  let iconThree = document.querySelector("#weather-icon-three");
  let weatherIconThree = dailyForecast[3].condition.icon;
  iconThree.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconThree}.png`
  );
  iconThree.setAttribute("alt", dailyForecast[3].condition.icon);

  let forecastThreeMax = document.querySelector("#third-box-max");
  forecastThreeMax.innerHTML = Math.round(dailyForecast[3].temperature.maximum);
  let forecastThreeMin = document.querySelector("#third-box-min");
  forecastThreeMin.innerHTML = Math.round(dailyForecast[3].temperature.minimum);

  // Forecast Box Four
  let boxFourDay = document.querySelector("#box-four-day");
  boxFourDay.innerHTML = forecastDayFormat(dailyForecast[4].time);

  let iconFour = document.querySelector("#weather-icon-four");
  let weatherIconFour = dailyForecast[4].condition.icon;
  iconFour.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconFour}.png`
  );
  iconFour.setAttribute("alt", dailyForecast[4].condition.icon);

  let forecastFourMax = document.querySelector("#fourth-box-max");
  forecastFourMax.innerHTML = Math.round(dailyForecast[4].temperature.maximum);
  let forecastFourMin = document.querySelector("#fourth-box-min");
  forecastFourMin.innerHTML = Math.round(dailyForecast[4].temperature.minimum);

  // Forecast Box Five
  let boxFiveDay = document.querySelector("#box-five-day");
  boxFiveDay.innerHTML = forecastDayFormat(dailyForecast[5].time);

  let iconFive = document.querySelector("#weather-icon-five");
  let weatherIconFive = dailyForecast[5].condition.icon;
  iconFive.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconFive}.png`
  );
  iconFive.setAttribute("alt", dailyForecast[5].condition.icon);

  let forecastFiveMax = document.querySelector("#fifth-box-max");
  forecastFiveMax.innerHTML = Math.round(dailyForecast[5].temperature.maximum);
  let forecastFiveMin = document.querySelector("#fifth-box-min");
  forecastFiveMin.innerHTML = Math.round(dailyForecast[5].temperature.minimum);
}

function getForecast(city) {
  console.log(city);
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=b6d6abf04ta9967430a746of97dac003&units=metric
`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.city);
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

  let dailyForecast = location.data.daily;

  // Forecast Box One
  let boxOneDay = document.querySelector("#box-one-day");
  boxOneDay.innerHTML = forecastDayFormat(dailyForecast[1].time);

  let iconOne = document.querySelector("#weather-icon-one");
  let weatherIconOne = dailyForecast[1].condition.icon;
  iconOne.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconOne}.png`
  );
  iconOne.setAttribute("alt", dailyForecast[1].condition.icon);

  let forecastOneMax = document.querySelector("#first-box-max");
  forecastOneMax.innerHTML = Math.round(dailyForecast[1].temperature.maximum);
  let forecastOneMin = document.querySelector("#first-box-min");
  forecastOneMin.innerHTML = Math.round(dailyForecast[1].temperature.minimum);

  // Forecast Box Two
  let boxTwoDay = document.querySelector("#box-two-day");
  boxTwoDay.innerHTML = forecastDayFormat(dailyForecast[2].time);

  let iconTwo = document.querySelector("#weather-icon-two");
  let weatherIconTwo = dailyForecast[2].condition.icon;
  iconTwo.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconTwo}.png`
  );
  iconTwo.setAttribute("alt", dailyForecast[2].condition.icon);

  let forecastTwoMax = document.querySelector("#second-box-max");
  forecastTwoMax.innerHTML = Math.round(dailyForecast[2].temperature.maximum);
  let forecastTwoMin = document.querySelector("#second-box-min");
  forecastTwoMin.innerHTML = Math.round(dailyForecast[2].temperature.minimum);

  // Forecast Box Three
  let boxThreeDay = document.querySelector("#box-three-day");
  boxThreeDay.innerHTML = forecastDayFormat(dailyForecast[3].time);

  let iconThree = document.querySelector("#weather-icon-three");
  let weatherIconThree = dailyForecast[3].condition.icon;
  iconThree.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconThree}.png`
  );
  iconThree.setAttribute("alt", dailyForecast[3].condition.icon);

  let forecastThreeMax = document.querySelector("#third-box-max");
  forecastThreeMax.innerHTML = Math.round(dailyForecast[3].temperature.maximum);
  let forecastThreeMin = document.querySelector("#third-box-min");
  forecastThreeMin.innerHTML = Math.round(dailyForecast[3].temperature.minimum);

  // Forecast Box Four
  let boxFourDay = document.querySelector("#box-four-day");
  boxFourDay.innerHTML = forecastDayFormat(dailyForecast[4].time);

  let iconFour = document.querySelector("#weather-icon-four");
  let weatherIconFour = dailyForecast[4].condition.icon;
  iconFour.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconFour}.png`
  );
  iconFour.setAttribute("alt", dailyForecast[4].condition.icon);

  let forecastFourMax = document.querySelector("#fourth-box-max");
  forecastFourMax.innerHTML = Math.round(dailyForecast[4].temperature.maximum);
  let forecastFourMin = document.querySelector("#fourth-box-min");
  forecastFourMin.innerHTML = Math.round(dailyForecast[4].temperature.minimum);

  // Forecast Box Five
  let boxFiveDay = document.querySelector("#box-five-day");
  boxFiveDay.innerHTML = forecastDayFormat(dailyForecast[5].time);

  let iconFive = document.querySelector("#weather-icon-five");
  let weatherIconFive = dailyForecast[5].condition.icon;
  iconFive.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconFive}.png`
  );
  iconFive.setAttribute("alt", dailyForecast[5].condition.icon);

  let forecastFiveMax = document.querySelector("#fifth-box-max");
  forecastFiveMax.innerHTML = Math.round(dailyForecast[5].temperature.maximum);
  let forecastFiveMin = document.querySelector("#fifth-box-min");
  forecastFiveMin.innerHTML = Math.round(dailyForecast[5].temperature.minimum);
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
