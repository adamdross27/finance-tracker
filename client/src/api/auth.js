const API_URL = process.env.REACT_APP_API_URL;

export const register = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Something went wrong during registration.');
        }

        return await response.json(); // Successful response
    } catch (error) {
        console.error('Registration error:', error);
        return { error: error.message };
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Something went wrong during login.');
        }

        return await response.json(); // Successful response
    } catch (error) {
        console.error('Login error:', error);
        return { error: error.message };
    }
};
