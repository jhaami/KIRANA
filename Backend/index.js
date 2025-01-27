// Importing necessary packages
const express = require("express"); // Web framework for Node.js
const dotenv = require("dotenv"); // For managing environment variables
const cors = require("cors"); // For enabling Cross-Origin Resource Sharing
const accpetFormData = require("express-fileupload"); // For handling file uploads
const databaseConnection = require("./database/database"); // Custom module for database connection
const path = require("path"); // For handling file and directory paths
const rateLimit = require("express-rate-limit"); // For implementing brute-force prevention

// Configuring environment variables from .env file (make sure this is done before accessing env variables)
dotenv.config();

// Creating an Express application instance
const app = express();

// Configuring CORS (Cross-Origin Resource Sharing) policy
const corsOptions = {
  origin: true, // Allow all origins
  credentials: true, // Allow credentials (like cookies) to be sent
  optionSuccessStatus: 200, // Success status code for preflight requests
};

app.use(cors(corsOptions)); // Applying CORS middleware

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to handle file uploads
app.use(accpetFormData());

// Serving static files for product images
app.use("/products", express.static(path.join(__dirname, "public/products")));

// Connecting to the database
databaseConnection();

// Brute-force prevention: Rate Limiter
const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true, // Include rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the global rate limiter to all API routes
app.use("/api", globalRateLimiter);

// Defining the port for the server (default to 5000 if not set in .env)
const PORT = process.env.PORT || 5000;

// Setting up API routes for different functionalities
app.use("/api/user", require("./routes/userRoutes")); // User-related routes
app.use("/api/product", require("./routes/productRoutes")); // Product-related routes
app.use("/api/cart", require("./routes/cartRoutes")); // Cart-related routes

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!!`); // Log message when server starts
});

module.exports = app;
