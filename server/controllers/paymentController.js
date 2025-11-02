const stripe = require('../config/stripe');
const Order = require('../models/Order');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { items, currency = 'usd' } = req.body;

    // Calculate total server-side (example): sum price * qty
    const total = items.reduce((sum, it) => sum + (it.price * it.quantity), 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // cents
      currency,
      metadata: {
        integration_check: 'accept_a_payment'
      }
    });

    // Optionally create an order record with status pending
    const order = await Order.create({
      user: req.user ? req.user._id : null,
      items: items.map(i => ({
        product: i.productId || null,
        title: i.title,
        price: i.price,
        quantity: i.quantity
      })),
      total,
      stripePaymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.confirmPayment = async (req, res) => {
  // Webhook handler is preferable. This minimalist endpoint allows manual finalization.
  const { paymentIntentId } = req.body;
  try {
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.status === 'succeeded') {
      await Order.findOneAndUpdate({ stripePaymentIntentId: paymentIntentId }, { status: 'paid' });
      return res.json({ ok: true });
    }
    res.json({ status: pi.status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
