import React, { useState, useEffect } from "react";
import "../App.css"; // Import the CSS file

const Consultation: React.FC = () => {
    const [formData, setFormData] = useState({
        therapist: "",
        date: "",
        timeSlot: "",
        concerns: "",
    });

    const [errors, setErrors] = useState({
        therapist: false,
        date: false,
        timeSlot: false,
        concerns: false,
    });

    const [bookedSlots, setBookedSlots] = useState<{ [key: string]: number }>({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const timeSlots = [
        { label: "10:00 - 12:00", value: "10-12" },
        { label: "12:00 - 14:00", value: "12-2" },
        { label: "15:00 - 18:00", value: "3-6" },
        { label: "19:00 - 21:00", value: "7-9" },
    ];

    const getTodayDate = () => new Date().toISOString().split("T")[0];

    const fetchBookedSlots = async (selectedDate: string) => {
        if (!selectedDate) return;
        try {
            const response = await fetch(`http://localhost:5000/api/booked-slots?date=${selectedDate}`);
            const data = await response.json();
            if (response.ok) {
                setBookedSlots(data.bookedSlots || {});
            } else {
                console.error("Error fetching booked slots:", data.message);
            }
        } catch (error) {
            console.error("❌ Error fetching booked slots:", error);
        }
    };

    useEffect(() => {
        if (formData.date) {
            fetchBookedSlots(formData.date);
        }
    }, [formData.date]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: !value.trim() });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { therapist, date, timeSlot, concerns } = formData;
        const newErrors = {
            therapist: !therapist,
            date: !date,
            timeSlot: !timeSlot,
            concerns: !concerns.trim(),
        };

        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        // ✅ Retrieve token and extract userId
        const token = localStorage.getItem("token");
        if (!token) {
            setErrorMessage("Authentication required. Please log in.");
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            const userId = decodedToken.userId;

            if (!userId) {
                setErrorMessage("User authentication error.");
                return;
            }

            const consultationData = { userId, therapist, date, timeSlot, concerns: concerns.trim() };

            setLoading(true);
            setErrorMessage("");

            const response = await fetch("http://localhost:5000/api/book-consultation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // ✅ Ensure correct authorization
                },
                body: JSON.stringify(consultationData),
            });

            const result = await response.json();
            setLoading(false);

            if (!response.ok) throw new Error(result.message || "Booking failed");

            alert("Consultation booked successfully!");
            setFormData({ therapist: "", date: "", timeSlot: "", concerns: "" });
        } catch (error) {
            console.error("❌ Booking Error:", error);
            setErrorMessage(error instanceof Error ? error.message : "Booking failed");
        }
    };


    return (
        <section id="consultation" className="consultation-section">
            <div className="container">
                <h2 className="text-center">Book a Consultation</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-4">
                            <form noValidate onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="therapist" className="form-label">Choose a Therapist</label>
                                    <select
                                        id="therapist"
                                        className={`form-select ${errors.therapist ? "is-invalid" : ""}`}
                                        value={formData.therapist}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select therapist</option>
                                        <option value="Dr. Smith">Dr. Smith</option>
                                        <option value="Dr. Johnson">Dr. Johnson</option>
                                    </select>
                                    <div className="invalid-feedback">Please select a therapist.</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        min={getTodayDate()}
                                    />
                                    <div className="invalid-feedback">Please choose a valid future date.</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="timeSlot" className="form-label">Time Slot</label>
                                    <select
                                        id="timeSlot"
                                        className={`form-select ${errors.timeSlot ? "is-invalid" : ""}`}
                                        value={formData.timeSlot}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a time slot</option>
                                        {timeSlots.map((slot) => (
                                            <option key={slot.value} value={slot.value} disabled={bookedSlots[slot.value] >= 10}>
                                                {slot.label} {bookedSlots[slot.value] >= 10 ? "(Fully Booked)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">Please select a time slot.</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="concerns" className="form-label">Brief Description</label>
                                    <textarea
                                        id="concerns"
                                        className={`form-control ${errors.concerns ? "is-invalid" : ""}`}
                                        rows={3}
                                        placeholder="Describe your concerns"
                                        value={formData.concerns}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                    <div className="invalid-feedback">Please describe your concerns.</div>
                                </div>

                                <button type="submit" className="btn book-btn w-100" disabled={loading}>
                                    {loading ? "Booking..." : "Book Consultation"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Consultation;
