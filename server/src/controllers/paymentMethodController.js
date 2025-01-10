const db = require('../utils/db');

exports.getPaymentMethods = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM PaymentMethod WHERE user_id = ?', [req.user.id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment methods.' });
  }
};

exports.addPaymentMethod = async (req, res) => {
    const { type, description, defaultMethod, isActive } = req.body;
    const userId = req.user.id; // Assuming `req.user.id` contains the authenticated user's ID
  
    try {
      console.log("Received data:", { type, description, defaultMethod, userId });
  
      // If `defaultMethod` is true, reset other payment methods for the user
      if (defaultMethod) {
        const resetQuery = "UPDATE PaymentMethod SET defaultMethod = 0 WHERE user_id = ?";
        await db.execute(resetQuery, [userId]);
        console.log("Reset defaultMethod for user:", userId);
      }
  
      // If isActive is not provided, default to true
      const isPaymentActive = isActive !== undefined ? isActive : true;
      
      // Insert the new payment method
      const insertQuery = `
        INSERT INTO PaymentMethod (user_id, type, description, defaultMethod, isActive)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute(insertQuery, [userId, type, description, defaultMethod, isPaymentActive]);
  
      console.log("Inserted payment method:", result);
  
      // Respond with the new payment method's details
      res.status(201).json({
        id: result.insertId,
        type,
        description,
        defaultMethod: defaultMethod || false,
        isActive: isPaymentActive,
      });
    } catch (error) {
      console.error("Error adding payment method:", error);
      res.status(500).json({ error: "Failed to add payment method" });
    }
  };
  

exports.updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await db.execute('UPDATE PaymentMethod SET ? WHERE id = ?', [updates, id]);
    res.status(200).json({ message: 'Payment method updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment method.' });
  }
};

exports.togglePaymentMethod = async (req, res) => {
    const { id } = req.params;  // Get the payment method ID from the route parameters
    const { isActive } = req.body;  // Get the isActive value from the request body

    console.log("Received ID:", id, "isActive:", isActive);  // Debugging log

    try {
        // Check if the payment method exists
        const [existing] = await db.execute("SELECT 1 FROM PaymentMethod WHERE id = ?", [id]);
        if (!existing.length) {
            return res.status(404).json({ error: "Payment method not found." });
        }

        // Update the isActive status
        const updateQuery = "UPDATE PaymentMethod SET isActive = ? WHERE id = ?";
        const [result] = await db.execute(updateQuery, [isActive ? 1 : 0, id]);

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "Failed to update payment method status." });
        }

        res.status(200).json({ message: `Payment method ${isActive ? 'activated' : 'deactivated'} successfully.` });
    } catch (error) {
        console.error("Error toggling payment method:", error);
        res.status(500).json({ error: "Failed to update payment method status." });
    }
};

// src/controllers/paymentMethodController.js

exports.getActivePaymentMethods = async (req, res) => {
  const user_id = req.user.id; // Assuming user ID is retrieved from the auth middleware

  try {
    const [rows] = await db.execute(
      'SELECT id, type FROM payment_method WHERE user_id = ? AND isActive = 1',
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No active payment methods found.' });
    }

    res.status(200).json(rows); // Return the active payment methods
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ error: 'Failed to fetch payment methods.' });
  }
};


  
