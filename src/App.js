import React, { useState, useEffect } from 'react';
import './App.css';

import ErrorComp from "./comps/ErrorMessage";
import LeftContainer from './comps/LeftContainer';
import RightContainer from './comps/RightContainer';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("Chennai");
  const [showError, setShowError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const apiKey = '1d163b3cfed52c9d06c4a73626bf2c57';

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchWeatherData = async (city) => {
    try {
      setCityName(city);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setShowError(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('City not found!');
        setShowError(true);
      }
    } catch (error) {
      setError('Error fetching weather data ...');
      setShowError(true);
    }
  };

  useEffect(() => {
    const fetchWeatherByGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            )
              .then((response) => response.json())
              .then((data) => {
                setCityName(data.name);
              });
          },
          (error) => {
            console.error('Error getting location: ' + error.message);
            setCityName(cityName);
          }
        );
      } else {
        setCityName(cityName);
      }
    };

    fetchWeatherByGeolocation();
  }, [apiKey]);

  useEffect(() => {
    fetchWeatherData(cityName);
  }, [cityName]);

  return (
    <div className="App">
      {weatherData && (
        <div className="container">
          <LeftContainer fetchWeatherData={fetchWeatherData} weatherData={weatherData} screenWidth={screenWidth} />
          <RightContainer fetchWeatherData={fetchWeatherData} weatherData={weatherData} screenWidth={screenWidth} cityName={cityName} />
        </div>
      )}
      {showError && (
        <ErrorComp message={error} onClose={() => setShowError(false)} />
      )}
    </div>
  );
}

export default App;
