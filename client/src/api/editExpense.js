const API_URL = process.env.REACT_APP_API_URL;

// Function to update an existing expense
export const editExpense = async (expenseId, updatedExpenseData, token) => {
  try {
    // Log the token, API_URL, and expenseId for debugging
    console.log("Token in frontend:", token);
    console.log("API URL in frontend:", API_URL);
    console.log("Expense ID:", expenseId);

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
    // Log the token, API_URL, and expenseId for debugging
    console.log("Token in frontend:", token);
    console.log("API URL in frontend:", API_URL);
    console.log("Expense ID:", expenseId);

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
