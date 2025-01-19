const db = require('../utils/db');

// Update an existing expense
exports.editExpense = async (req, res) => {
  const expenseId = req.params.expenseId;
  const userId = req.user.id; // Authenticated user's ID
  const { title, amount, description, category_id, date, payment_method } = req.body;

  try {
    // Check if the expense exists and belongs to the user
    const [expenseRows] = await db.execute(
      'SELECT * FROM expense WHERE expense_id = ? AND user_id = ?',
      [expenseId, userId]
    );

    if (expenseRows.length === 0) {
      return res.status(404).json({ error: 'Expense not found or unauthorized.' });
    }

    // Validate inputs
    if (!title || !amount || !date || !category_id || !payment_method) {
      return res.status(400).json({ error: 'Title, amount, date, category, and payment method are required.' });
    }

    // Check if the category exists
    const [categoryRows] = await db.execute('SELECT category_id FROM category WHERE category_id = ?', [category_id]);
    if (categoryRows.length === 0) {
      return res.status(400).json({ error: 'Invalid category.' });
    }

    // Check if the payment method exists
    const [paymentMethodRows] = await db.execute('SELECT id FROM payment_method WHERE id = ?', [payment_method]);
    if (paymentMethodRows.length === 0) {
      return res.status(400).json({ error: 'Invalid payment method.' });
    }

    // Update the expense
    const updateQuery = `
      UPDATE expense
      SET title = ?, amount = ?, description = ?, category_id = ?, date = ?, payment_method = ?
      WHERE expense_id = ? AND user_id = ?
    `;
    await db.execute(updateQuery, [title, amount, description || null, category_id, date, payment_method, expenseId, userId]);

    return res.status(200).json({ message: 'Expense updated successfully.' });
  } catch (error) {
    console.error('Error updating expense:', error);
    return res.status(500).json({ error: 'Failed to update expense.' });
  }
};

// Fetch expense details by ID
exports.getExpenseById = async (req, res) => {
  const expenseId = req.params.expenseId;
  const userId = req.user.id;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM expense WHERE expense_id = ? AND user_id = ?',
      [expenseId, userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found or unauthorized.' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching expense details:', error);
    return res.status(500).json({ error: 'Failed to fetch expense details.' });
  }
};
