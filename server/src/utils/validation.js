// src/utils/validation.js
const validateExpenseData = (data) => {
    const { title, amount, category_id, date } = data;
    if (!title || !amount || !category_id || !date) {
      return { valid: false, message: 'Title, amount, category, and date are required.' };
    }
    return { valid: true };
  };
  
  module.exports = { validateExpenseData };
  