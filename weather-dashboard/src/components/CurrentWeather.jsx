import React from 'react';
import { getWeatherIconUrl, formatTemp, getWindDirection } from '../services/weatherApi';
import '../styles/CurrentWeather.css';

function CurrentWeather({ data }) {
  if (!data) return null;

  const { name, sys, main, weather, wind, clouds, visibility } = data;
  const temp = formatTemp(main.temp);
  const feelsLike = formatTemp(main.feels_like);
  const iconUrl = getWeatherIconUrl(weather[0].icon);
  const windDir = getWindDirection(wind.deg);

  return (
    <section className="current-weather">
      <div className="weather-header">
        <div className="location">
          <h2>{name}, {sys.country}</h2>
          <p className="weather-description">{weather[0].main}</p>
        </div>
        <div className="temperature">
          <img src={iconUrl} alt={weather[0].description} className="weather-icon" />
          <div className="temp-value">{temp}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{feelsLike}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{windDir} ({wind.deg}°)</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Cloudiness</span>
          <span className="detail-value">{clouds.all}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Min/Max Temp</span>
          <span className="detail-value">{formatTemp(main.temp_min)} / {formatTemp(main.temp_max)}</span>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;
