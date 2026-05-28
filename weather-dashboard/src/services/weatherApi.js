import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.warn('REACT_APP_WEATHER_API_KEY is not set. Please add it to .env file');
}

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Cache for API responses (in-memory)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (params) => JSON.stringify(params);
const isCacheValid = (timestamp) => Date.now() - timestamp < CACHE_DURATION;

/**
 * Fetch weather data for a city
 * @param {string} city - City name
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherByCity = async (city) => {
  const params = { q: city, units: 'metric', appid: API_KEY };
  const cacheKey = getCacheKey(params);

  // Check cache
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    cache.delete(cacheKey);
  }

  try {
    const response = await weatherApi.get('/weather', { params });
    const data = response.data;
    
    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || `Failed to fetch weather for ${city}`
    );
  }
};

/**
 * Fetch weather data by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getWeatherByCoords = async (lat, lon) => {
  const params = { lat, lon, units: 'metric', appid: API_KEY };
  const cacheKey = getCacheKey(params);

  // Check cache
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    cache.delete(cacheKey);
  }

  try {
    const response = await weatherApi.get('/weather', { params });
    const data = response.data;
    
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch weather data'
    );
  }
};

/**
 * Get weather icon URL
 * @param {string} iconCode - Icon code from OpenWeatherMap
 * @returns {string} Icon URL
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

/**
 * Format temperature
 * @param {number} temp - Temperature in Celsius
 * @returns {string} Formatted temperature
 */
export const formatTemp = (temp) => {
  return `${Math.round(temp)}°C`;
};

/**
 * Get wind direction
 * @param {number} degrees - Wind direction in degrees
 * @returns {string} Wind direction (N, NE, E, etc.)
 */
export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % directions.length];
};

export default weatherApi;
