const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

// Brute-force prevention: Rate Limiter
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
  standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Authentication Guard Middleware
const authGuard = (req, res, next) => {
  console.log("Incoming Headers:", req.headers);

  // Get the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Auth Header not found!",
    });
  }

  // Extract the token (Format: Bearer <token>)
  const token = authHeader.split(" ")[1];

  // Check if the token exists
  if (!token || token === "") {
    return res.status(400).json({
      success: false,
      message: "Token not found!",
    });
  }

  // Verify the token
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data to the request object
    req.user = decodedUserData;

    // Proceed to the next middleware or route handler
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
};
