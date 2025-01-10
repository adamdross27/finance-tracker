const API_URL = process.env.REACT_APP_API_URL;

export const getPaymentMethods = async (token) => {
  try {
    const response = await fetch(`${API_URL}/paymentMethods`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment methods.');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const addPaymentMethod = async (paymentMethod, token) => {
  try {
    const response = await fetch(`${API_URL}/paymentMethods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentMethod),
    });

    if (!response.ok) {
      throw new Error('Failed to add payment method.');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const updatePaymentMethod = async (id, updates, token) => {
  try {
    const response = await fetch(`${API_URL}/paymentMethods/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update payment method.');
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const togglePaymentMethod = async (id, isActive, token) => {
    try {
      const response = await fetch(`${API_URL}/paymentMethods/${id}/toggle`, {  // Ensure this URL is correct
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive }),  // Pass the isActive status as part of the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle payment method.');
      }
  
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  };
  
