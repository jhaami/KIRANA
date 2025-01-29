const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");

// Brute-force prevention: Rate Limiter
const authRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 3, // Limit each IP to 3 requests per window
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// SMTP Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail)
  auth: {
    user: process.env.SMTP_EMAIL, // Your email address
    pass: process.env.SMTP_PASSWORD, // Your app password
  },
});

// Generate OTP and Send Email
const sendOtpEmail = async (userEmail, otp) => {
  const mailOptions = {
    from: `"MyApp Support" <${process.env.SMTP_EMAIL}>`,
    to: userEmail,
    subject: "Email Confirmation - OTP Verification",
    text: `Your OTP code is ${otp}. Please enter this code to verify your email.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Unable to send OTP email. Please try again later.");
  }
};

// Authentication Guard Middleware
const authGuard = (req, res, next) => {
  console.log("Incoming Headers:", req.headers);

  // Get the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Auth Header not found!",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token not found!",
    });
  }

  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedUserData.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email to log in.",
      });
    }

    req.user = decodedUserData;

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({
      success: false,
      message: "Not Authenticated!",
    });
  }
};

module.exports = {
  authGuard,
  authRateLimiter,
  sendOtpEmail,
};
