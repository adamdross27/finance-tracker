const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config(); // Load environment variables
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend on localhost:3000
app.use(express.json()); // Parse incoming JSON requests

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/userRoutes');
const expenseRoutes = require('./src/routes/editExpenseRoute');
const categoryRoutes = require('./src/routes/categoryRoutes');
const paymentMethodRoutes = require('./src/routes/paymentMethodRoutes');
const viewExpensesRoutes = require('./src/routes/viewExpensesRoute');
const statsRoutes = require('./src/routes/statsRoutes'); // Add stats route

// Use the routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', viewExpensesRoutes);
app.use('/api', statsRoutes); // Add stats routes

// Start server
app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
