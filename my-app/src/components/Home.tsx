import React from 'react';
import '../App.css'; // Import the CSS file

const Home: React.FC = () => {
    return (
        <>
            <section className="hero-section vh-100 d-flex mt-10" id="home">
                <div className="container text-center col">
                    <span className="welcome playwrite-hu-bold">Welcome to,</span>
                    <span className="p-Name mental-health-heading boldonse-regular">
                        Mental Health <span className="sub">Support</span>
                    </span>
                    <p className="Sub-Title text-body-tertiary">
                        Your journey towards better mental health starts here. Please log in or register to access exclusive features.
                    </p>
                </div>
            </section>

            {/* Features Section with Card View */}
            <section className="features-section text-center">
                <div className="container">
                    <h2 className="section-title">Key Features</h2>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">
                            <div className="feature-card">
                                <h3>AI Chatbot Support</h3>
                                <p>Get instant mental health guidance and resources through our AI-powered chatbot.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <h3>Daily Well-being Tracker</h3>
                                <p>Track your emotions and mental health progress with personalized insights.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card">
                                <h3>Community Forum</h3>
                                <p>Connect with others, share experiences, and get support from a like-minded community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
