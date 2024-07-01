import React, { useState } from 'react';
import countryList from 'country-list';
import CityInput from './CityInput';
import Graph from './hourlyGraph';
import TodayWeather from "./TodayWeather";
import StoryForm from './StoryForm';
import StoryList from './StoryList';

const RightContainer = ({ weatherData, screenWidth, cityName, fetchWeatherData }) => {
  const [stories, setStories] = useState([]);
  const [category, setCategory] = useState('event planners');

  const addStory = (story) => {
    setStories([story, ...stories]);
  };

  return (
    <div className='rightContainer'>
      <div className='topBar'>
        {screenWidth > 550 && <CityInput fetchWeatherData={fetchWeatherData} />}
        <div>
          <a
            href={`https://zoom.earth/places/${countryList.getName(
              weatherData.sys.country
            )}/${weatherData.name}/#map=precipitation/model=icon`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="map">
              <span className="material-symbols-rounded">map</span> Map
            </h3>
          </a>
        </div>
      </div>
      <div className="hourlyWeather">
        <Graph city={cityName} screenWidth={screenWidth} />
      </div>
      <TodayWeather weatherData={weatherData} />
      <div className="storyCategories">
        <button className="categoryButton" onClick={() => setCategory('event planners')}>
          Event Planners
        </button>
        <button className="categoryButton" onClick={() => setCategory('farmers')}>
          Farmers
        </button>
        <button className="categoryButton" onClick={() => setCategory('travelers')}>
          Travelers
        </button>
      </div>
      <StoryForm addStory={addStory} />
      <StoryList stories={stories} category={category} />
    </div>
  );
};

export default RightContainer;
