// server/src/middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log('Authenticating token...');
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Invalid token' });
      }
      console.log('Token verified:', user);
      req.user = user;
      next();
    });
  };
  

module.exports = { authenticateToken };
