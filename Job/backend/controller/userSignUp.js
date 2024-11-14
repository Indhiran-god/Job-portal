// Import necessary modules
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

// Controller for user signup
async function userSignUpController(req, res) {
    try {
        const { email, password, name, jobTitle, company, skills, profilePic } = req.body;

        // Check if the user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            throw new Error("User already exists.");
        }

        // Validation for required fields
        if (!email || !password || !name || !jobTitle || !company || !skills) {
            throw new Error("All fields are required.");
        }

        // Password hashing
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        // Define the payload with additional fields
        const payload = {
            email,
            password: hashPassword,
            name,
            jobTitle,
            company,
            skills,
            profilePic,
            role: "GENERAL" // default role
        };

        // Save the user
        const newUser = new userModel(payload);
        const savedUser = await newUser.save();

        // Success response
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        // Error response
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
