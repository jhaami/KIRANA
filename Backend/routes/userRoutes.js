
const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { authGuard, authRateLimiter } = require("../middleware/authGuard"); // Import authGuard middleware
const rbac = require("../middleware/rbac"); // Import RBAC middleware

// User Registration with Email Confirmation
router.post("/create", userController.createUser);

// Email Confirmation Route
router.get("/confirm-email", userController.confirmEmail);

// User Login (Rate Limited)
router.post("/login", authRateLimiter, userController.loginUser);

// Update User (Protected: Admin, Buyer, Seller)
router.put("/update", authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.updateUserDetails);

// Delete User (Protected: Admin Only)
router.delete("/delete", authGuard, rbac(["Admin"]), userController.userDelete);

// Get User Details (Protected: Admin, Buyer, Seller)
router.get("/details", authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.getUserDetails);

// User Orders (Protected: Buyers Only)
router.post("/orders", authGuard, rbac(["Buyer"]), userController.orders);

// Forgot Password (Open to everyone)
router.post("/forgot_password", userController.forgotPassword);

// Verify OTP and Set New Password
router.post("/verify_otp", userController.verifyOtpAndSetPassword);

// Get Logged-in User Details (Protected: All Authenticated Users)
router.get("/getMe", authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.getMe);

module.exports = router;
