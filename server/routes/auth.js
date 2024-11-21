const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

// Configure multer for profile image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/upload/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Register route
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;

        // Check if a profile image was uploaded
        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }
        const profileImagePath = profileImage.path;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
        });
        await newUser.save();

        // Generate JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send response with JWT and user details
        res.status(201).json({
            message: "User registered successfully!",
            token,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                profileImagePath: newUser.profileImagePath,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed!", error: err.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Remove password before sending user details
        user.password = undefined;

        // Send response with JWT and user details
        res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Login failed!", error: err.message });
    }
});

module.exports = router;
