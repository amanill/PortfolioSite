const router = require('express').Router();
const { createCheckoutSession } = require('../stripe');

router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const session = await createCheckoutSession(items);

  res.json(session);
});

module.exports = router;
