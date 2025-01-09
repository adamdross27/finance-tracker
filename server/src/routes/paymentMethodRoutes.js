const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const paymentMethodController = require('../controllers/paymentMethodController');

router.get('/paymentMethods', authenticateToken, paymentMethodController.getPaymentMethods);
router.post('/paymentMethods', authenticateToken, paymentMethodController.addPaymentMethod);
router.patch('/paymentMethods/:id', authenticateToken, paymentMethodController.updatePaymentMethod);
router.patch('/paymentMethods/:id/toggle', paymentMethodController.togglePaymentMethod);


module.exports = router;
