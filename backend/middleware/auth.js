const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
  
  try {
    // 1. Get token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized. Please login.' });
    }

    // 2. Verify token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user from token's id
    // .select('-password') → don't load password into memory
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    // 4. Attach user to request — available in all controllers
    req.user = user;

    // 5. Move to next function (the actual controller)
    next();

  } catch (err) {
    // jwt.verify throws if token is expired or tampered
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Session expired. Please login again.' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token. Please login.' });
    }
    return res.status(500).json({ message: 'Server error.', error: err.message });
  }
};

module.exports = protect;