import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            console.log("🔄 Sending login request...");
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log("✅ API Response:", data);

            if (response.ok && data.success) {
                console.log("🔐 Login successful. Token:", data.token);
                localStorage.setItem('token', data.token);

                // Check that the backend returns a user object with an _id property.
                if (data.user && data.user._id) {
                    localStorage.setItem('userId', data.user._id);
                } else {
                    console.error("User data not returned in login response.");
                }

                navigate('/homepage2'); // Redirect to your homepage (or daily activity page)
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <section id="login" className="section" style={{ marginTop: '100px' }}>
            <div className="container">
                <h2 className="text-center">Login</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="loginEmail" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="loginEmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loginPassword" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="loginPassword"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
