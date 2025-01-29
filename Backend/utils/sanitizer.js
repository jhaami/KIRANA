const sanitize = (input) => {
    return typeof input === "string" ? input.replace(/[^a-zA-Z0-9@.]/g, "").trim() : input;
  };
  module.exports = { sanitize };
  