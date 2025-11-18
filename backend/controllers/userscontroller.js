// controllers/userController.js
import User from "../models/Users.js";

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// REGISTER (plain text password)
export const registerUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const existingUser = await User.findOne({ emailOrMobile });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      emailOrMobile,
      password       // <<< stored as plain text
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({
      message: "User Registration Failed",
      error: error.message
    });
  }
};

// LOGIN (plain text comparison)
export const loginUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    const user = await User.findOne({ emailOrMobile });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ❗ No bcrypt — direct compare
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error: error.message
    });
  }
};
