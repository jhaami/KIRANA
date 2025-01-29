const zxcvbn = require("zxcvbn");

const validatePassword = (password) => {
    const strength = zxcvbn(password);
    return strength.score >= 3; // Ensure strong passwords
};

module.exports = validatePassword;
