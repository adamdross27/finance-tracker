import React, { useState, useEffect } from 'react';
import { getPaymentMethods, addPaymentMethod, togglePaymentMethod } from '../../api/paymentMethods';
import './AccountSettings.css';

const AccountSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: '',
    description: '',
    defaultMethod: false,
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // Fetch payment methods on component mount
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const response = await getPaymentMethods(token);

      if (response.error) {
        setError(response.error);
      } else {
        setPaymentMethods(response); // Assume response is the array of payment methods
      }
    };

    fetchPaymentMethods();
  }, [token]);

  // Handle adding a new payment method
  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();

    const response = await addPaymentMethod(newPaymentMethod, token);

    if (response.error) {
      setError(response.error);
    } else {
      setPaymentMethods([...paymentMethods, response]); // Add the new method to the list
      setShowForm(false);
      setNewPaymentMethod({ type: '', description: '', defaultMethod: false });
    }
  };

  // Toggle the active status of a payment method
  const toggleActiveStatus = async (id, isActive) => {
    setLoading(true);
    const updatedStatus = !isActive;
    const response = await togglePaymentMethod(id, updatedStatus, token);

    if (response.error) {
      setError(response.error);
    } else {
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === id ? { ...method, isActive: updatedStatus } : method
        )
      );
    }
    setLoading(false);
  };

  return (
    <div className="account-settings">
      <h1>Account Settings</h1>
      <h2>Payment Method Settings</h2>

      {error && <p className="error-message">{error}</p>}

      {paymentMethods.length === 0 ? (
        <p>No payment methods have been set up.</p>
      ) : (
        <div>
          {paymentMethods.map((method) => (
            <div key={method.id} className="payment-method">
              <p>{method.type}</p>
              <p>{method.description || 'No description provided'}</p>
              <p>
                Active: {method.isActive ? 'Yes' : 'No'}
                <button
                  onClick={() => toggleActiveStatus(method.id, method.isActive)}
                  disabled={loading}
                >
                  {method.isActive ? 'Deactivate' : 'Activate'}
                </button>

              </p>
              {method.defaultMethod && <span>(Default)</span>}
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowForm(true)}>Add Payment Method</button>

      {showForm && (
        <form onSubmit={handleAddPaymentMethod}>
          <div>
            <label>
              Payment Type:
              <input
                type="text"
                value={newPaymentMethod.type}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, type: e.target.value })}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={newPaymentMethod.description}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, description: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label>
              Default:
              <input
                type="checkbox"
                checked={newPaymentMethod.defaultMethod}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, defaultMethod: e.target.checked })}
              />
            </label>
          </div>
          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AccountSettings;
