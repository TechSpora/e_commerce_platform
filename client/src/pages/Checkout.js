import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const handleCheckout = async () => {
    try {
      const { clientSecret: secret } = await api.post('/orders/create-payment-intent', { items: cart });
      setClientSecret(secret);

      const stripe = await stripePromise;
      // in a real app you would use the Stripe Elements checkout flow
      // this is a placeholder to show how to start.
      await stripe.confirmCardPayment(secret, { payment_method: { card: { token: 'tok_visa' } } });
      alert('Payment flow initiated (for real, integrate Stripe Elements)');
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div>
      <h1>Checkout</h1>
      {cart.map((i, idx) => (
        <div key={idx}>
          {i.title} x {i.quantity} - ${i.price}
        </div>
      ))}
      <div>Total: ${total.toFixed(2)}</div>
      <button onClick={handleCheckout}>Pay with Stripe</button>
      {clientSecret && <div>Got client secret (for Elements): {clientSecret.slice(0, 20)}...</div>}
    </div>
  );
}