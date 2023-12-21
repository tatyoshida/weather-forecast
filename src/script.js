function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let currentDescriptionElement = document.querySelector("#description");
  
  let currentTemperatureElement = document.querySelector("#current-temperature-value");
  let currentTemperature = response.data.temperature.current;
  let temperature = Math.round(currentTemperature);
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let pressureElement = document.querySelector("#pressure");
  

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  currentDescriptionElement.innerHTML = response.data.condition.description;
  currentTemperatureElement.innerHTML = `${temperature}°`
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} Km/h`;
  pressureElement.innerHTML = `${response.data.temperature.pressure} mb`;
}
function searchCity(city) {
  let apiKey = "ofa9b4df40ba3b4e1688atf2bb780ddd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function searchSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formatDay = days[day];
  return `${formatDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Montevideo");


