
// Importing necessary packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const databaseConnection = require("./database/database");
const path = require("path");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Create Express application instance
const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Ensure frontend URL is set
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware for JSON parsing and file uploads
app.use(express.json());
app.use(fileUpload());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


// Serving static files for product images
app.use("/products", express.static(path.join(__dirname, "public/products")));

// Connect to MongoDB
databaseConnection();

// Global Rate Limiter (Prevents abuse)
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: { success: false, message: "Too many requests. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", globalRateLimiter);

// Setting up API routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!!!`);
});

module.exports = app;
