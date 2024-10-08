const inputCity = document.getElementById("input-city");
const buttonCheck = document.getElementById("btn-check");
const spinner = document.getElementById("spinner");

const API_KEY = "EADEQJ94XHM6DPBV4XL3QUXUZ";

async function getCityWeather(cityName) {
  try {
    spinner.style.display = "block";
    const response =
      await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=${API_KEY}
`);
    const weatherData = await response.json();
    console.log(weatherData);
    renderCurrentWeather(weatherData);
  } catch (error) {
    console.error(cityName);
    renderErrorWeather(cityName);
  } finally {
    spinner.style.display = "none";
  }
}

function renderCurrentWeather(cityData) {
  const currentCondition = cityData.currentConditions;
  let isFahrenheit = true;

  const forecastDiv = document.querySelector(".forecast-content");
  forecastDiv.innerHTML = "";

  forecastDiv.innerHTML = `
      <div class="icon-div">
        <span class="condition-info">${currentCondition.conditions}</span>
        <img class="icon-img" src="icons/${currentCondition.icon}.svg"></img>
      </div>
      <p class="city-info">${cityData.resolvedAddress}</p>
      <div class="forecast-info">
        <p class="temperature-info">${currentCondition.temp}°F</p>
        <div class="extra-info">
          <span class="feel-info">Feels like: ${currentCondition.feelslike}°F</span>
          <span class="wind-info">Wind: ${currentCondition.windspeed} mph</span>
          <span class="humidity-info">Humidity: ${currentCondition.humidity}%</span>
        </div>
      </div>

      <div class="toggle-temperature">
        <button class="btn-toggle">In Celsius</button>
      </div>
  `;

  const btnToggle = document.querySelector(".btn-toggle");
  const tempText = document.querySelector(".temperature-info");
  const feelText = document.querySelector(".feel-info");
  btnToggle.addEventListener("click", () => {
    if (isFahrenheit) {
      const celsius = convertToCelsius(currentCondition.temp);
      const feelCelsius = convertToCelsius(currentCondition.feelslike);
      tempText.textContent = `${celsius.toFixed(2)}°C`;
      feelText.textContent = `${feelCelsius.toFixed(2)}°C`;
      btnToggle.textContent = "In Fahrenheit";
      isFahrenheit = false;
    } else {
      tempText.textContent = `${currentCondition.temp}°F`;
      feelText.textContent = `${currentCondition.feelslike}°F`;
      btnToggle.textContent = "In Celsius";
      isFahrenheit = true;
    }
  });
}

function convertToCelsius(temperature) {
  const celsius = ((temperature - 32) * 5) / 9;
  return celsius;
}

function renderErrorWeather(cityName) {
  const forecastDiv = document.querySelector(".forecast-content");
  forecastDiv.innerHTML = "";

  forecastDiv.innerHTML = `
    <h4>ERROR!</h4>
    <p>We could not find the city ${cityName} data. Please try it again. </p>
  `;
}

buttonCheck.addEventListener("click", (event) => {
  event.preventDefault();
  const cityValue = inputCity.value;
  console.log(cityValue);
  getCityWeather(cityValue);
  inputCity.value = "";
});
