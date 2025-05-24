import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the separate CSS file

const NavBar2: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="">
                    Mental Health Support
                </Link>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav2">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="">
                                <i className="bi bi-house me-1"></i>Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">
                                <i className="bi bi-box-arrow-right me-1"></i>Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar2;
