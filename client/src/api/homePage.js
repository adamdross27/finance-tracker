const API_URL = process.env.REACT_APP_API_URL;

// Fetch weekly spending summary
export const getWeeklySummary = async (token) => {
  try {
    console.log('Fetching weekly summary with token:', token); // Log the token (be cautious not to log sensitive tokens in production)

    const response = await fetch(`${API_URL}/expenses/weekly-summary`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Weekly summary response status:', response.status); // Log the response status

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch weekly summary, error:', errorData.error); // Log detailed error
      throw new Error(errorData.error || 'Failed to fetch weekly summary.');
    }

    const data = await response.json();
    console.log('Weekly summary data received:', data); // Log the response data
    return data;

  } catch (error) {
    console.error('Error fetching weekly summary:', error); // Log error during API call
    return { error: error.message || 'An unexpected error occurred.' };
  }
};

// Fetch spending by category
export const getSpendingByCategory = async (token) => {
  try {
    console.log('Fetching spending by category with token:', token); // Log the token (be cautious in production)

    const response = await fetch(`${API_URL}/expenses/spending-by-category`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Spending by category response status:', response.status); // Log the response status

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch spending by category, error:', errorData.error); // Log detailed error
      throw new Error(errorData.error || 'Failed to fetch spending by category.');
    }

    const result = await response.json();
    console.log('Spending by category data received:', result); // Log the response data
    return Array.isArray(result) ? result : [];

  } catch (error) {
    console.error('Error fetching spending by category:', error); // Log error during API call
    return [];
  }
};

// Fetch recent transactions
export const getRecentTransactions = async (token) => {
  try {
    console.log('Fetching recent transactions with token:', token); // Log the token (be cautious in production)

    const response = await fetch(`${API_URL}/expenses/recent-transactions`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Recent transactions response status:', response.status); // Log the response status

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to fetch recent transactions, error:', errorData.error); // Log detailed error
      throw new Error(errorData.error || 'Failed to fetch recent transactions.');
    }

    const data = await response.json();
    console.log('Recent transactions data received:', data); // Log the response data
    return data;

  } catch (error) {
    console.error('Error fetching recent transactions:', error); // Log error during API call
    return [];
  }
};
