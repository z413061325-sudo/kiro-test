import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getWeatherIconUrl, formatTemp } from '../services/weatherApi';
import '../styles/Forecast.css';

function Forecast({ data }) {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data) return;

    const fetchForecast = async () => {
      try {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';
        
        const response = await axios.get(`${BASE_URL}/forecast`, {
          params: {
            lat: data.coord.lat,
            lon: data.coord.lon,
            units: 'metric',
            appid: API_KEY,
          },
          timeout: 10000,
        });

        // Get unique days (take every 8th item for 24-hour intervals)
        const dailyForecasts = response.data.list.filter((_, idx) => idx % 8 === 0).slice(0, 5);
        setForecast(dailyForecasts);
      } catch (err) {
        setError('Failed to fetch forecast');
        console.error(err);
      }
    };

    fetchForecast();
  }, [data]);

  if (!forecast) return null;

  return (
    <section className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, idx) => (
          <div key={idx} className="forecast-item">
            <div className="forecast-date">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            <img
              src={getWeatherIconUrl(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <div className="forecast-temp">
              <span className="temp-high">{formatTemp(day.main.temp_max)}</span>
              <span className="temp-low">{formatTemp(day.main.temp_min)}</span>
            </div>
            <div className="forecast-condition">{day.weather[0].main}</div>
            <div className="forecast-humidity">💧 {day.main.humidity}%</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
