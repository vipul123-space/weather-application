"use strict";

const getContainer = document.querySelector(".container");
const searchResult = document.querySelector(".search-space");
const searchButton = document.querySelector(".search-button");
const heading = document.querySelector(".heading");

const getInfo = function (data) {
  const Time = new Date();
  const currentTime = Time.toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const html = ` 
  <div class="section-weather">
      <h2 class="current-weather">${data.name}, Current Weather</h2>
      <h2 class="current-weather">${currentTime}</span></h2>
  </div>
  <div class="weather-condition">
    <div class="weather-box">
    <img
      class="weather-img"
      src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'
      alt=""
    />
  </div>
  <div class="temprature-box"><span class="temprature">${(
    data.main.temp - 273.15
  ).toFixed(2)}°</span></div>
  <div class="weather"><span class="weather-type">${
    data.weather[0].description
  }</span></div>
</div>
<div class="weather-statitics">
  <div class="weather-data">
    <h2 class="weather__heading-primary">Wind</h2>
    <h3 class="weather__heading-secondary">${data.wind.speed} Km/h</h3>
  </div>
  <div class="weather-data">
    <h2 class="weather__heading-primary">visibility</h2>
    <h3 class="weather__heading-secondary">${data.visibility} m</h3>
  </div>
  <div class="weather-data">
    <h2 class="weather__heading-primary">pressure</h2>
    <h3 class="weather__heading-secondary">${data.main.pressure} mb</h3>
  </div>
</div>`;
  getContainer.insertAdjacentHTML("beforeend", html);
};

const getData = async function (country) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=927614412d36ad058337bc86781cd305`
    );
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.meesage} (${response.status})`);

    getInfo(data);
  } catch (err) {
    alert(err);
  }
};

searchButton.addEventListener("click", function () {
  getContainer.textContent = "";
  getData(searchResult.value);
});
