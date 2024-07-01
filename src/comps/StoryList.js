import React from 'react';

const StoryList = ({ stories, category }) => {
  const filteredStories = stories.filter(story => story.category === category);
  
  return (
    <div className="storyList">
      {filteredStories.map((story, index) => (
        <div className="storyItem" key={index}>
          <h3>{story.name}</h3>
          <p>{story.story}</p>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
