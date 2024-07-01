import React, { useState } from 'react';

const StoryForm = ({ addStory }) => {
  const [story, setStory] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('event planners');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (story && name) {
      addStory({ name, story, category });
      setStory('');
      setName('');
    }
  };

  return (
    <div className="storyContainer">
      <h2>Share Your Weather Story</h2>
      <form className="storyForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your Weather Story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="event planners">Event Planners</option>
          <option value="farmers">Farmers</option>
          <option value="travelers">Travelers</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StoryForm;
