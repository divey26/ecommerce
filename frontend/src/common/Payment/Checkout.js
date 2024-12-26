import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../cart/CartContext'; // To get the cart total

const stripePromise = loadStripe('pk_test_51QaAO003ldnatOZanoghUvQrw76T9rnCg0YxqQaPffhxmc2LCX5rA2iKSu1p74ApieFr76sZBeDg7dyH8rMBzIOu00XLfTyJPL'); // Replace with your publishable key

const CheckoutForm = () => {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Calculate the total amount (in cents)
    const totalAmount = cart.reduce((total, item) => total + item.price * 100, 0); // Convert to cents

    // Request payment intent from your backend
    fetch('http://localhost:5000/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [cart]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not loaded or clientSecret is missing
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: 'Customer Name' }, // You can dynamically set the name if needed
      },
    });

    if (error) {
      console.log(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
      // Handle post-payment actions (e.g., order confirmation)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="card-element">
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || !clientSecret}>
        Pay Now
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
