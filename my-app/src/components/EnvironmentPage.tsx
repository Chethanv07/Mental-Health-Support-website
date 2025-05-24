import React, { useState, useEffect } from "react";
import "../App.css";

const EnvironmentPage: React.FC = () => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const meditationSound = "/sounds/meditation.mp3"; // Ensure this file is in the public/sounds folder

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const API_KEY = import.meta.env.VITE_PIXABAY_KEY;
                const response = await fetch(
                    `https://pixabay.com/api/?key=${API_KEY}&q=meditation&image_type=photo`
                );

                if (!response.ok) throw new Error("Failed to fetch images");

                const data = await response.json();
                if (!data.hits || data.hits.length === 0) {
                    throw new Error("No images found.");
                }

                setImages(data.hits);
                setError(null);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="image-container">
            {loading && <p>Loading images...</p>}
            {error && <p className="error">{error}</p>}

            {/* Background Meditation Music */}
            <audio autoPlay loop>
                <source src={meditationSound} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>

            {/* Display Meditation Image Cards in Horizontal Scrollable Layout */}
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-card">
                        <img src={image.webformatURL} alt="Meditation" className="meditation-image" />
                        <p className="image-title">Meditation & Relaxation</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnvironmentPage;
