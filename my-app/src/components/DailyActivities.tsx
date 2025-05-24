import React, { useState, useEffect } from "react";
import "../App.css";

const DailyActivities: React.FC = () => {
    const userId = localStorage.getItem("userId");
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const [canClaimReward, setCanClaimReward] = useState<boolean>(false);

    const activitiesList = ["Meditation", "Journal Writing", "Exercise", "Reading"];

    const handleCheckboxChange = (activity: string) => {
        setSelectedActivities((prev) =>
            prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
        );
    };

    const submitDailyActivities = async () => {
        if (!userId) {
            setMessage("⚠️ User ID is required.");
            return;
        }

        if (selectedActivities.length === 0) {
            setMessage("⚠️ Please select at least one activity.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/daily-activities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, activities: selectedActivities }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || "✅ Activities submitted successfully!");
                checkStreak();
            } else {
                setMessage(data.message || "⚠️ Failed to submit activities.");
            }
        } catch (error) {
            setMessage("⚠️ An unexpected error occurred. Please try again.");
        }
    };

    const checkStreak = async () => {
        if (!userId) return;

        try {
            const response = await fetch(`http://localhost:5000/api/daily-activities/streak?userId=${userId}`);
            const data = await response.json();

            if (response.ok) {
                setCanClaimReward(data.streak >= 7);
                if (data.streak >= 7) {
                    setMessage("🎉 You have a 7-day streak! Claim your reward.");
                }
            } else {
                console.error("Error checking streak:", data.message);
            }
        } catch (err) {
            console.error("Streak fetch error:", err);
        }
    };

    const claimReward = async () => {
        setMessage("🏆 Reward claimed! Congratulations!");
        setCanClaimReward(false);
    };

    useEffect(() => {
        checkStreak();
    }, []);

    return (
        <section id="daily-activities" className="daily-activities-section">
            <div className="container">
                <h2 className="daily-title">Daily Activities</h2>
                <p className="daily-description">Complete your daily tasks to earn rewards every 7 days!</p>
                {message && <p className="daily-message">{message}</p>}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <ul className="daily-list">
                            {activitiesList.map((activity) => (
                                <li key={activity} className="daily-item">
                                    <input
                                        type="checkbox"
                                        checked={selectedActivities.includes(activity)}
                                        onChange={() => handleCheckboxChange(activity)}
                                    />
                                    {activity}
                                </li>
                            ))}
                        </ul>
                        <div className="text-center mt-3">
                            <button className="btn daily-btn" onClick={submitDailyActivities}>
                                Submit Activities
                            </button>
                            <button
                                className="btn claim-btn"
                                onClick={claimReward}
                                disabled={!canClaimReward}
                                style={{ marginLeft: "10px" }}
                            >
                                Claim Reward
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DailyActivities;
