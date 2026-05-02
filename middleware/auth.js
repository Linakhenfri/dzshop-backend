const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    // 🔐 استخراج التوكن (Bearer token)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 🔍 التحقق من التوكن
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    );

    // 👤 نضيف user للـ request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
