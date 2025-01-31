// const rbac = (roles) => {
//     return (req, res, next) => {
//       // Ensure the user is authenticated
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: "Not authenticated!",
//         });
//       }
  
//       // Check if the user's role is allowed
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({
//           success: false,
//           message: "Access denied. You do not have permission.",
//         });
//       }
  
//       next(); // User has permission, proceed to the next middleware or controller
//     };
//   };
  
//   module.exports = rbac;
  
const rbac = (roles) => {
  return (req, res, next) => {
    // Check if user object exists in the request
    if (!req.user) {
      console.error("RBAC Error: No user attached to request");
      return res.status(401).json({
        success: false,
        message: "Authentication required: No user data found.",
      });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      console.error(`RBAC Error: User role ${req.user.role} does not have access`);
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have the required permission.",
      });
    }

    console.log(`RBAC: Access granted for user role ${req.user.role}`);
    next(); // User has the necessary role, proceed to the next middleware or controller
  };
};

module.exports = rbac;
