const API_URL = process.env.REACT_APP_API_URL;

export const fetchExpenses = async (token, startDate, endDate) => {
  try {
    const response = await fetch(`${API_URL}/expenses?start_date=${startDate}&end_date=${endDate}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch expenses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};
