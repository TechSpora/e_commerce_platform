const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

router.post('/create-payment-intent', auth.protect, paymentController.createPaymentIntent);
router.post('/confirm-payment', auth.protect, paymentController.confirmPayment);

// Admin could list all orders:
router.get('/', auth.protect, auth.admin, async (req, res) => {
  const Order = require('../models/Order');
  const orders = await Order.find().populate('user').limit(200);
  res.json(orders);
});

module.exports = router;
