import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeDemo: React.FC = () => {
  const handleClick = async () => {
    try {
      // 1. Call your backend to create the Checkout Session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ price: 'price_1T2gFsRmgmLzrlenQA6giYeZ', quantity: 1 }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const session = await response.json();

      // 2. Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('Failed to get session URL:', session);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle errors, e.g., display a message to the user
    }
  };

  return (
    <div className="container">
      <h1>Baseball Card Shop</h1>
      <div className="row">
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src="https://via.placeholder.com/300" alt="Baseball Card" />
              <span className="card-title">1952 Topps Mickey Mantle</span>
            </div>
            <div className="card-content">
              <p>The Holy Grail of baseball cards.</p>
              <p>$5,200,000</p>
            </div>
            <div className="card-action">
              <button className="btn waves-effect waves-light" onClick={handleClick}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeDemo;
