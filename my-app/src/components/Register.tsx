import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);

    if (!name || !email || !password || !dob) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dob }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Registration successful:", data);
        navigate("/login");
      } else {
        console.error("❌ Registration error:", data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("❌ Server error:", error);
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <section
      id="register"
      className="section bg-light"
      style={{ backgroundColor: "#f9f9f9", marginTop: "100px" }}
    >
      <div className="container">
        <h2 className="text-center">Register</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <form
              noValidate
              className={validated ? "was-validated" : ""}
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="regName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="regName"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="invalid-feedback">Please enter your name.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="regEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="regEmail"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="invalid-feedback">Enter a valid email.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="regPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="regPassword"
                  placeholder="Password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">
                  Password must be at least 6 characters.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="regDOB" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="regDOB"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <div className="invalid-feedback">Select your birth date.</div>
              </div>

              <button
                type="submit"
                className="btn btn-accent w-100 mt-3"
                style={{ backgroundColor: "#ffc107", border: "none" }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
