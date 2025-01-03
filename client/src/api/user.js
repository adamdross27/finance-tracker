const API_URL = process.env.REACT_APP_API_URL;

export const getUserDetails = async (token) => {
    try {
      // Log the token and API_URL to ensure they are correct
      console.log("Token in frontend:", token);
      console.log("API URL in frontend:", API_URL); // Log the API URL to check if it's correct
  
      const response = await fetch(`${API_URL}/user/details`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { error: error.message || 'An unexpected error occurred.' };
    }
};
