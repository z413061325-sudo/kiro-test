import React, { useState, useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import { getWeatherByCity, getWeatherByCoords } from './services/weatherApi';
import './styles/App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Fetch weather by city name
  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      
      // Update search history
      const newHistory = [city, ...searchHistory.filter(c => c !== city)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by geolocation
  const handleGeolocation = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          setError(err.message || 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Location access denied');
        setLoading(false);
      }
    );
  };

  // Fetch on component mount (default to London)
  useEffect(() => {
    handleSearch('London');
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🌤️ Weather Dashboard</h1>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
        </div>
        <SearchBar
          onSearch={handleSearch}
          onGeolocation={handleGeolocation}
          searchHistory={searchHistory}
          loading={loading}
        />
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading weather data...</div>
        ) : weather ? (
          <>
            <CurrentWeather data={weather} />
            <Forecast data={weather} />
          </>
        ) : null}
      </main>

      <footer className="app-footer">
        <p>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
