import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css'; // CSS file for styling

const GamePage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedGameUrl, setSelectedGameUrl] = useState<string | null>(null);
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        // Simulate loading effect
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Game data
    const games = [
        {
            title: "Puzzle Game",
            url: "https://www.jigsawexplorer.com/",
            image: "https://wallpapers.com/images/featured/puzzle-games-14qbx4lgo1g7ck8d.jpg"
        },
        {
            title: "Memory Game",
            url: "https://www.memozor.com/memory-games",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202203/2306/7TdBaPoROJcF4Hz0cOrwQq2D.jpg?w=440"
        },
        {
            title: "Mind Relax Game",
            url: "https://www.calm.com/",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqXLGyfbJ4LAUpdaf-N3NGHzz4d3b2IB4B6LkoIZB9pkQ6K0rlSD4-60lXTqaTd5mUgwQ&usqp=CAU"
        }
    ];

    return (
        <div className="game-container">
            <h1 className="game-title">Choose a Mental Health Game</h1>

            {loading ? (
                <p className="loading-text">Loading games, please wait...</p>
            ) : (
                <div className="game-list">
                    {games.map((game, index) => (
                        <div key={index} className="game-card">
                            <img src={game.image} alt={game.title} className="game-banner" />
                            <h3>{game.title}</h3>
                            <button
                                className="play-button"
                                onClick={() => setSelectedGameUrl(game.url)}
                            >
                                Play Now
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedGameUrl && (
                <div className="game-frame-container">
                    <iframe
                        src={selectedGameUrl}
                        title="Mental Health Game"
                        className="game-frame"
                        allowFullScreen
                    ></iframe>
                    <button className="back-button" onClick={() => setSelectedGameUrl(null)}>
                        Back to Games
                    </button>
                </div>
            )}

            {/* Updated navigation for Back to Home */}
            <button className="home-button" onClick={() => navigate('/HomePage2')}>
                Back to Home
            </button>
        </div>
    );
};

export default GamePage;
