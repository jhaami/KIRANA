const router = require("express").Router();
const userController = require("../controllers/userControllers");
const { authGuard } = require("../middleware/authGuard"); // Import authGuard middleware
const rbac = require("../middleware/rbac"); // Import RBAC middleware

// Creating user registration route (open to everyone)
router.post("/create", userController.createUser);

// Creating user login route (open to everyone)
router.post("/login", userController.loginUser);

// Creating user update route (protected, accessible by Admin and the user themselves)
router.put("/update", authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.updateUserDetails);

// Creating user delete route (protected, accessible only by Admin)
router.delete("/delete", authGuard, rbac(["Admin"]), userController.userDelete);

// Creating user details route (protected, accessible by Admin and the user themselves)
router.get("/details", authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.getUserDetails);

// Creating user orders route (protected, accessible by Buyers only)
router.post("/orders", authGuard, rbac(["Buyer"]), userController.orders);

// Forgot password route (open to everyone)
router.post("/forgot_password", userController.forgotPassword);

// Verify OTP and set password route (open to everyone)
router.post("/verify_otp", userController.verifyOtpAndSetPassword);

// Getting current logged-in user details (protected, accessible by all authenticated users)
router.get("/getMe", authGuard, rbac(["Admin", "Buyer", "Seller"]), userController.getMe);

module.exports = router;