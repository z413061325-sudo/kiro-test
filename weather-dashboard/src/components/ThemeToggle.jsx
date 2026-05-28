import React from 'react';
import '../styles/ThemeToggle.css';

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} title="Toggle theme">
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
