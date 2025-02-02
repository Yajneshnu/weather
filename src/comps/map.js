import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data using the API key
    const apiKey = '1d163b3cfed52c9d06c4a73626bf2c57';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=India&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div>
      {weatherData && (
        <MapContainer
          center={[weatherData.coord.lat, weatherData.coord.lon]}
          zoom={6}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Add additional map components or markers as needed */}
        </MapContainer>
      )}
    </div>
  );
};

export default WeatherMap;
