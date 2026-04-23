const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('./payment.controller');
const { protect } = require('../../middleware/auth.middleware');
const { restrictTo } = require('../../middleware/role.middleware');

router.post('/create-intent', protect, restrictTo('customer'), createPaymentIntent);
router.post('/confirm', protect, restrictTo('customer'), confirmPayment);

module.exports = router;