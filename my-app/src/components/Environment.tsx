import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Ensure styles are defined

const Environment: React.FC = () => {
    return (
        <section id="environment" className="environment-section">
            <div className="container text-center">
                <h2 className="section-title">Healthy Environment</h2>
                <p className="section-subtitle">
                    Improve your surroundings for better mental well-being.
                </p>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card environment-card">
                            <div className="card-body">
                                <h5 className="card-title">Greenery & Plants</h5>
                                <p className="card-text">Add indoor plants to purify air and reduce stress.</p>
                                <Link to="/environmentpage" className="btn btn-primary">View More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card environment-card">
                            <div className="card-body">
                                <h5 className="card-title">Declutter Your Space</h5>
                                <p className="card-text">A tidy room creates a calm mind. Organize regularly.</p>
                                <Link to="/environmentpage" className="btn btn-primary">View More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card environment-card">
                            <div className="card-body">
                                <h5 className="card-title">Natural Light</h5>
                                <p className="card-text">Increase sunlight exposure for better mood and energy.</p>
                                <Link to="/environmentpage" className="btn btn-primary">View More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Environment;
