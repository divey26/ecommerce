import React, { useState, useEffect } from 'react';
import { Layout, Result } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../cart/CartContext';
import LayoutNew from '../../Layout';

const stripePromise = loadStripe('pk_test_51QaAO003ldnatOZanoghUvQrw76T9rnCg0YxqQaPffhxmc2LCX5rA2iKSu1p74ApieFr76sZBeDg7dyH8rMBzIOu00XLfTyJPL');

const CheckoutForm = () => {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(''); // State to track payment status
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const totalAmount = cart.reduce((total, item) => total + item.price * 100, 0);

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
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);

    setPaymentStatus('Processing...'); // Set status to processing

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: { name: 'Customer Name' },
      },
    });

    if (error) {
      setPaymentStatus(`Error: ${error.message}`); // Display error message
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('success'); // Set to success for Ant Design Result component
    } else {
      setPaymentStatus('Payment failed. Please try again.'); // Fallback for other statuses
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  if (paymentStatus === 'success') {
    return (
      <Result
        status="success"
        title="Payment Successful!"
        subTitle="Your payment has been processed successfully."
        extra={[
          <button
            style={{ ...payButtonStyles, backgroundColor: '#28a745' }}
            onClick={() => window.location.reload()}
          >
            Make Another Payment
          </button>,
        ]}
      />
    );
  }

  return (
    <LayoutNew>
      <Layout>
        <form onSubmit={handleSubmit} style={formStyles}>
          <div style={{ width: '400px', height: '500px' }}>
            <div style={formGroupStyles}>
              <label htmlFor="card-element" style={labelStyles}>Card Number</label>
              <CardNumberElement id="card-element" options={cardStyle} style={cardElementStyles} />
            </div>
            <div style={formGroupStyles}>
              <label htmlFor="card-expiry" style={labelStyles}>Expiration Date</label>
              <CardExpiryElement id="card-expiry" options={cardStyle} style={cardElementStyles} />
            </div>
            <div style={formGroupStyles}>
              <label htmlFor="card-cvc" style={labelStyles}>CVC</label>
              <CardCvcElement id="card-cvc" options={cardStyle} style={cardElementStyles} />
            </div>
            <button type="submit" style={payButtonStyles} disabled={!stripe || !clientSecret}>
              Pay Now
            </button>
          </div>
          {/* Display payment status */}
          {paymentStatus && paymentStatus !== 'Processing...' && (
            <p style={statusStyles}>{paymentStatus}</p>
          )}
        </form>
      </Layout>
    </LayoutNew>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

// Inline Styles
const formStyles = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '40px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  fontSize: '35px',
};

const formGroupStyles = {
  marginBottom: '20px',
};

const labelStyles = {
  display: 'block',
  marginBottom: '12px',
  fontWeight: 'bold',
};

const cardElementStyles = {
  width: '100%',
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '18px',
};

const payButtonStyles = {
  backgroundColor: '#5469d4',
  color: 'white',
  padding: '16px',
  width: '100%',
  border: 'none',
  borderRadius: '4px',
  fontSize: '18px',
  cursor: 'pointer',
};

const statusStyles = {
  marginTop: '20px',
  textAlign: 'center',
  fontSize: '16px',
  color: '#333',
};

export default Checkout;
