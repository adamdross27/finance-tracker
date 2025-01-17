const API_URL = process.env.REACT_APP_API_URL;

// Fetch statistics for the user's finance tracker
export const fetchStats = async (token) => {
  try {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error.message || error);
    return { error: error.message || 'An unexpected error occurred.' };
  }
};
