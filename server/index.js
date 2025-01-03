const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Allow only the frontend on localhost:3000
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route for the root
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Import routes (auth routes)
const authRoutes = require('./src/routes/auth');  // Ensure path is correct

// Use routes for API
app.use('/api/auth', authRoutes);

// Start the server
app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});
