const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config(); // At the top of your index.js

app.use(cors({
    origin: 'http://localhost:3000',  // Allow only the frontend on localhost:3000
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route for the root
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Import the routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/userRoutes'); 
const expenseRoutes = require('./src/routes/editExpenseRoute');  // Correctly importing the file with search route
const categoryRoutes = require('./src/routes/categoryRoutes');  
const paymentMethodRoutes = require('./src/routes/paymentMethodRoutes');
const viewExpensesRoutes = require('./src/routes/viewExpensesRoute');

// Use the routes for API
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); 
app.use('/api/expenses', expenseRoutes);  // Correctly using the expense routes for '/api/expenses'
app.use('/api/categories', categoryRoutes);  
app.use('/api', paymentMethodRoutes);
app.use('/api', viewExpensesRoutes);  // This is for view-related routes, like getting all expenses



// Start the server
app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});


