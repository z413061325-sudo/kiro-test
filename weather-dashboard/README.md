# Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API.

## Features

- 🌍 **Current Weather**: Real-time temperature, humidity, wind speed, and weather conditions
- 🔍 **City Search**: Search weather for any city in the world
- 📍 **Geolocation**: Auto-detect user's location and display weather
- 📅 **5-Day Forecast**: Extended weather forecast
- 🎨 **Responsive Design**: Works on desktop, tablet, and mobile devices
- ⚡ **Fast Performance**: Caching to minimize API calls
- 🌓 **Dark/Light Mode**: Toggle between themes

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file with your API key
echo "REACT_APP_WEATHER_API_KEY=your_api_key_here" > .env

# Start development server
npm start
```

## Prerequisites

- Node.js 14+
- API key from [OpenWeatherMap](https://openweathermap.org/api)

## Project Structure

```
weather-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── Forecast.jsx
│   │   ├── SearchBar.jsx
│   │   └── ThemeToggle.jsx
│   ├── services/
│   │   └── weatherApi.js
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── App.jsx
│   └── index.js
├── .env.example
└── package.json
```

## Technologies

- React 18
- Axios
- OpenWeatherMap API
- CSS3 with Flexbox/Grid

## License

MIT
