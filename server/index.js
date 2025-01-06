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

// Import routes (auth routes, user routes, expense routes)
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/userRoutes'); // User routes for fetching user details
const expenseRoutes = require('./src/routes/addExpenseRoute'); // Import expense routes
const categoryRoutes = require('./src/routes/categoryRoutes');  // Import category routes


// Use routes for API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Ensure the route is '/user/details'
app.use('/api/expenses', expenseRoutes);  // Add this line to use expense routes
app.use('/api/categories', categoryRoutes);  // Use the category route


// Start the server
app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});
