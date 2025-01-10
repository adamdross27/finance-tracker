const jwt = require('jsonwebtoken');
const pool = require('../utils/db'); // Your database connection

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from 'Bearer <token>'
  
  // Log the token received to check if it's being passed correctly from the frontend
 // console.log("Token in backend (before verify):", token);

  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    req.userId = decoded.id; // Attach user ID to the request object
    next();
  });
};

const getUserDetails = async (req, res) => {
    try {
      const { userId } = req;
   //   console.log("Fetching details for userId:", userId);
  
      const [user] = await pool.query('SELECT firstName, lastName FROM users WHERE id = ?', [userId]);
    //  console.log("User details found:", user);
  
      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user[0]);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = { verifyToken, getUserDetails };
