import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center text-secondary p-4 mt-auto" style={{ backgroundColor: '#f9f9f9' }}>
            <div className="container">
                <a href="https://www.facebook.com" className="text-secondary me-4" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f fa-2x"></i>
                </a>
                <a href="https://twitter.com" className="text-secondary me-4" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <i className="fab fa-twitter fa-2x"></i>
                </a>
                <a href="https://www.instagram.com" className="text-secondary me-4" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram fa-2x"></i>
                </a>
                <a href="https://www.linkedin.com" className="text-secondary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in fa-2x"></i>
                </a>
                <div className="mt-3">
                    <p className="text-secondary">&copy; 2025 Mental Health Support. All rights reserved.</p>
                    <a href="contact.html" className="text-secondary me-3">Contact Us</a>
                    <a href="privacy.html" className="text-secondary">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
