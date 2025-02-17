import { User } from "../Model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function UserSignUp(req, res) {
  try {
    const { userName, email, password } = req.body;

    // Check if User already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash Password Before Saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    })

    await newUser.save();

    res.status(201).json({
      message: "User registered Successfully",
      userName: newUser.userName,
      email: newUser.email,
      password: newUser.password
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Signup Failed",
      error: error.message
    })
  }
}

export async function UserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if User Exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Please Create an Account to Login" });
    }

    // Compare Hashed Password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id },
      "secretKey",
      { expiresIn: "7d" }
    )

    res.status(200).json({
      message: "Login successful",
      user: {  
        userName: user.userName,
        email: user.email,
      },
      token
    });
  }
  catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
}