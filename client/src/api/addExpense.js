const API_URL = process.env.REACT_APP_API_URL;

export const addExpense = async (expenseData, token) => {
  try {
    // Log the token and API_URL to ensure they are correct
    console.log("Token in frontend:", token);
    console.log("API URL in frontend:", API_URL); // Log the API URL to check if it's correct

    const response = await fetch(`${API_URL}/expenses/addExpense`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });
      

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add expense');
    }

    return await response.json(); // Return the response data from the backend

  } catch (error) {
    console.error('Error adding expense:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};
