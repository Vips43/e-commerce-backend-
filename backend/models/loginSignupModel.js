import express from "express";
import { User } from "../conn.js";

const loginSignupRoute = express.Router();

loginSignupRoute.post("/signup", async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    if (name && email && pass) {
      if (pass.length < 4) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 5 characters long",
        });
      }
    } else return res.send({ message: "all fields are required" });

    const newUser = new User({ name, email, pass });
    await newUser.save();

    res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ success: false, message: "Signup failed", error: err });
  }
});

loginSignupRoute.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does nor exits",
      });
    }

    if (user.pass !== pass) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default loginSignupRoute;
