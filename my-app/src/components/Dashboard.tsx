import React, { useEffect, useState } from 'react';
import '../App.css'; // Import separate CSS

const Dashboard: React.FC = () => {
    const [userName, setUserName] = useState<string | null>(null);

    // Fetch username from local storage or API
    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Example: storing user as JSON
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser); // Convert to object
            setUserName(parsedUser.name); // Assuming user object has a "name" field
        }
    }, []);

    return (
        <section id="dashboard" className="dashboard-section">
            <div className="container text-center">
                <h2 className="dashboard-title">User Dashboard</h2>
                <p className="dashboard-welcome">
                    Welcome, <strong>{userName || 'Guest'}</strong>! Here are your available features:
                </p>
                <div className="row">
                    {/* Consultation Card */}
                    <div className="col-md-3 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Consultation</h5>
                                <p className="card-text">Book a session with our experts to discuss your mental health.</p>
                                <a href="#consultation" className="btn dashboard-btn">Learn More</a>
                            </div>
                        </div>
                    </div>
                    {/* Games & Rewards Card */}
                    <div className="col-md-3 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Games & Rewards</h5>
                                <p className="card-text">Play games and earn rewards for your mental wellness journey.</p>
                                <a href="#games" className="btn dashboard-btn">Explore</a>
                            </div>
                        </div>
                    </div>
                    {/* Daily Activities Card */}
                    <div className="col-md-3 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Daily Activities</h5>
                                <p className="card-text">Complete daily tasks and get rewarded for staying consistent.</p>
                                <a href="#daily-activities" className="btn dashboard-btn">View Tasks</a>
                            </div>
                        </div>
                    </div>
                    {/* Environment Card (Newly Added) */}
                    <div className="col-md-3 mb-3">
                        <div className="card dashboard-card">
                            <div className="card-body">
                                <h5 className="card-title">Environment</h5>
                                <p className="card-text">Discover ways to create a healthier and happier living space.</p>
                                <a href="#environment" className="btn dashboard-btn">Explore</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
