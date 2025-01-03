const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');  // Your DB connection

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Basic validation to ensure all required fields are provided
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check password strength (example: at least 6 characters)
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        // Create the users table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                isActive BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(createTableQuery);

        console.log('Checking if user exists...');
        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        // If user already exists, send an error response
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Inserting user into the database...');
        const [result] = await pool.query(
            `INSERT INTO users (firstName, lastName, email, password) 
             VALUES (?, ?, ?, ?)`, 
            [firstName, lastName, email, hashedPassword]
        );

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
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

        res.status(200).json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };
