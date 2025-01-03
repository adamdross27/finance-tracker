const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Ensure this matches your frontend URL
}));

app.use(express.json());  // Middleware to parse incoming JSON requests

const authRoutes = require('./routes/auth');  // Import routes
app.use('/api/auth', authRoutes);  // Use /api/auth for authentication routes

app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});
