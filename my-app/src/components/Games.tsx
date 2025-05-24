import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the separate CSS file

const Games: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    console.log("🔄 Navigating to /gamepage...");
    navigate('/GamePage'); // Ensure this matches the route path in App.js
  };

  return (
    <section id="games" className="games-section">
      <div className="container text-center">
        <h2 className="games-title">Games & Rewards</h2>
        <p className="games-description">
          Click "Play Game" to open a new page integrated with a free game API.
        </p>
        <button id="playGameBtn" className="btn games-btn" onClick={handlePlayGame}>
          Play Game
        </button>
      </div>
    </section>
  );
};

export default Games;
