const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');  // Your DB connection

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ error: 'All fields are required' });
    
    try {
        console.log('Checking if user exists...');
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        // Log the result of the query
        console.log('Existing user check result:', existingUser);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Inserting user into the database...');
        await pool.query('INSERT INTO users (email, password, isActive) VALUES (?, ?, ?)', [
            email, hashedPassword, true,
        ]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);  // Log the actual error
        res.status(500).json({ error: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ error: 'All fields are required' });
    
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success message and token
        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = { registerUser, loginUser };