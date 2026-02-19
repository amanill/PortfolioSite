const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(items) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: 'http://localhost:5173/success',
    cancel_url: 'http://localhost:5173/cancel',
  });

  return session;
}

module.exports = {
  createCheckoutSession,
};
