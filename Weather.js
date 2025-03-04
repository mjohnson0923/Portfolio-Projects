// src/components/Weather.js
class Weather extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .weather {
          font-family: Arial, sans-serif;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 300px;
          text-align: center;
        }
        .weather input {
          margin-top: 10px;
          padding: 5px;
          width: 100%;
        }
        .weather button {
          margin-top: 10px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .weather-icon {
          font-size: 50px;
          margin: 10px 0;
        }
      </style>
      <div class="weather">
        <h3>Weather</h3>
        <div class="weather-icon" id="weather-icon"></div>
        <div class="forecast"></div>
        <input type="text" id="postal-code" placeholder="Enter postal code">
        <button id="update-location">Get Weather</button>
      </div>
    `;

    this.shadowRoot.getElementById('update-location').addEventListener('click', () => this.fetchWeather());
  }

  async fetchWeather() {
    const postalCode = this.shadowRoot.getElementById('postal-code').value;
    if (!postalCode) {
      alert('Please enter a postal code.');
      return;
    }

    // Step 1: Get location key using postal code
    const locationResponse = await fetch(
      `https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=YOUR_API_KEY&q=${postalCode}`
    );
    const locationData = await locationResponse.json();

    if (locationData.length === 0) {
      alert('Location not found.');
      return;
    }

    const locationKey = locationData[0].Key;

    // Step 2: Get weather data using location key
    const weatherResponse = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=YOUR_API_KEY`
    );
    const weatherData = await weatherResponse.json();

    // Step 3: Display weather data
    const forecastDiv = this.shadowRoot.querySelector('.forecast');
    const weatherIconDiv = this.shadowRoot.getElementById('weather-icon');

    const temperatureF = weatherData[0].Temperature.Imperial.Value;
    const condition = weatherData[0].WeatherText;

    forecastDiv.innerHTML = `
      <p>Temperature: ${temperatureF}°F</p>
      <p>Condition: ${condition}</p>
      <p>Humidity: ${weatherData[0].RelativeHumidity}%</p>
    `;

    // Step 4: Add weather animation
    this.setWeatherIcon(condition, weatherIconDiv);
  }

  setWeatherIcon(condition, iconDiv) {
    let icon = '☀️'; // Default icon (sunny)
    switch (condition.toLowerCase()) {
      case 'cloudy':
      case 'mostly cloudy':
        icon = '☁️';
        break;
      case 'rain':
      case 'showers':
        icon = '🌧️';
        break;
      case 'snow':
        icon = '❄️';
        break;
      case 'thunderstorm':
        icon = '⛈️';
        break;
    }
    iconDiv.textContent = icon;
  }
}

customElements.define('custom-weather', Weather);
