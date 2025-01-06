const db = require('../utils/db');  // Importing the db connection pool
const { validateExpenseData } = require('../utils/validation'); // Optional: for validation if you need
// Add a new expense
exports.addExpense = async (req, res) => {
    const { title, amount, description, category_id, date, payment_method, is_recurring } = req.body;
    const user_id = req.user.id; // This should come from the authentication middleware
  
    console.log('Add Expense Route hit');
    console.log('Request Body: ', req.body);
  
    // Ensure user_id is valid
    if (!user_id) {
      return res.status(400).json({ error: 'User is not authenticated.' });
    }
  
    // Validate input data (this can be moved to a separate validation function)
    if (!title || !amount || !date || !category_id) {
      return res.status(400).json({ error: 'Title, amount, date, and category are required.' });
    }
  
    // Validate date format (check if it's a valid date)
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format.' });
    }
  
    // Set default values for optional fields
    const finalPaymentMethod = payment_method || 'Not Provided'; // Set default if undefined
    const finalIsRecurring = is_recurring !== undefined ? is_recurring : false; // Set default if undefined
  
    try {
      // Check if the category exists
      const [categoryRows] = await db.execute('SELECT category_id FROM category WHERE category_id = ?', [category_id]);
      if (categoryRows.length === 0) {
        return res.status(400).json({ error: 'Invalid category.' });
      }
  
      // Prepare the data for insertion
      const expenseData = [
        user_id,
        title,
        amount,
        description || null, // Set description to null if it's not provided
        category_id,
        date,
        finalPaymentMethod,
        finalIsRecurring
      ];
  
      console.log('Prepared Expense Data: ', expenseData);
  
      // Insert the expense into the database
      const [result] = await db.execute(
        'INSERT INTO expense (user_id, title, amount, description, category_id, date, payment_method, is_recurring) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        expenseData
      );
  
      return res.status(201).json({ message: 'Expense added successfully!', expenseId: result.insertId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add expense.' });
    }
  };
  