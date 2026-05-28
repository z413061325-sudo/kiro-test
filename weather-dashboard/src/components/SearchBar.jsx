import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch, onGeolocation, searchHistory, loading }) {
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (city) => {
    setInput(city);
    onSearch(city);
    setShowHistory(false);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a city..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowHistory(true);
            }}
            disabled={loading}
          />
          <button
            type="submit"
            className="search-btn"
            disabled={loading || !input.trim()}
            title="Search"
          >
            🔍
          </button>
          <button
            type="button"
            className="geolocation-btn"
            onClick={onGeolocation}
            disabled={loading}
            title="Use current location"
          >
            📍
          </button>
        </div>

        {showHistory && searchHistory.length > 0 && input.length === 0 && (
          <div className="search-history">
            <p className="history-title">Recent Searches</p>
            {searchHistory.map((city, idx) => (
              <button
                key={idx}
                type="button"
                className="history-item"
                onClick={() => handleHistoryClick(city)}
              >
                🕐 {city}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
