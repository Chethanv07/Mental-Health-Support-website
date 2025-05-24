require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Atlas Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// ✅ Daily Activities Schema & Model
const dailyActivitySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: Date, required: true },
        activities: [{ type: String, required: true }],
    },
    { timestamps: true, collection: "dailyActivity" }
);
const DailyActivity = mongoose.model("DailyActivity", dailyActivitySchema);

// ✅ Consultation Schema & Model
const consultationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        therapist: { type: String, required: true },
        date: { type: String, required: true },
        timeSlot: { type: String, required: true },
        concerns: { type: String, required: true },
    },
    { collection: "consultations" }
);
const Consultation = mongoose.model("Consultation", consultationSchema);

// ✅ Register API
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, dob } = req.body;
        if (!name || !email || !password || !dob)
            return res.status(400).json({ success: false, message: "All fields are required." });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "Email already in use." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, dob });
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ Login API
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ success: true, token, user });
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ Daily Activities API
app.post("/api/daily-activities", async (req, res) => {
    try {
        const { userId, activities } = req.body;
        if (!activities || activities.length === 0)
            return res.status(400).json({ success: false, message: "Activities are required." });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingEntry = await DailyActivity.findOne({ userId, date: { $gte: today, $lt: new Date(today.getTime() + 86400000) } });
        if (existingEntry)
            return res.status(400).json({ success: false, message: "Today's activities already submitted." });

        const newEntry = new DailyActivity({ userId, date: new Date(), activities });
        await newEntry.save();
        res.status(201).json({ success: true, message: "Daily activities recorded!", data: newEntry });
    } catch (error) {
        console.error("❌ Daily Activities Error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
});

// ✅ Get Booked Slots Count API
app.get("/api/booked-slots", async (req, res) => {
    try {
        const { date } = req.query;
        const bookedSlots = await Consultation.aggregate([
            { $match: { date } },
            { $group: { _id: "$timeSlot", count: { $sum: 1 } } }
        ]);
        res.json({ success: true, bookedSlots });
    } catch (error) {
        console.error("❌ Get Booked Slots Error:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
});

// ✅ Consultation Booking API (FIXED)
app.post("/api/book-consultation", async (req, res) => {
    try {
        console.log("Incoming Consultation Request:", req.body); // Log request data

        const { userId, therapist, date, timeSlot, concerns } = req.body;

        if (!userId || !therapist || !date || !timeSlot || !concerns) {
            console.log("❌ Missing fields:", { userId, therapist, date, timeSlot, concerns }); // Debugging log
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newConsultation = new Consultation({ userId, therapist, date, timeSlot, concerns });
        await newConsultation.save();

        res.status(201).json({ success: true, message: "Consultation booked successfully!" });
    } catch (error) {

        res.status(500).json({ success: false, message: "Server error." });
    }
});

// ✅ Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
