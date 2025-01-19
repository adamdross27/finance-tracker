const API_URL = process.env.REACT_APP_API_URL;

// Function to update an existing expense
export const editExpense = async (expenseId, updatedExpenseData, token) => {
  try {
    const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpenseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to edit expense');
    }

    return await response.json(); // Return the response data from the backend
  } catch (error) {
    console.error('Error editing expense:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};

// Function to fetch expense details by ID
export const getExpenseById = async (expenseId, token) => {
  try {
    const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch expense details');
    }

    return await response.json(); // Return the expense details
  } catch (error) {
    console.error('Error fetching expense details:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};

// Function to delete an expense
export const deleteExpense = async (expenseId, token) => {
  try {
    const response = await fetch(`${API_URL}/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete expense');
    }

    return await response.json(); // Return the response data (e.g., success message)
  } catch (error) {
    console.error('Error deleting expense:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};

// Function to search for expenses by title and date
export const searchExpenses = async (title, date, token) => {
  try {
    const response = await fetch(`${API_URL}/expenses/search?title=${title}&date=${date}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to search expenses');
    }

    return await response.json(); // Return the search results
  } catch (error) {
    console.error('Error searching expenses:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};

