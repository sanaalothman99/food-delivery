const express = require('express');
const router = express.Router();
const {
  create,
  getOne,
  myOrders,
  restaurantOrders,
  driverOrders,
  updateStatus,
  assign
} = require('./order.controller');
const { protect } = require('../../middleware/auth.middleware');
const { restrictTo } = require('../../middleware/role.middleware');

router.post('/', protect, restrictTo('customer'), create);
router.get('/my', protect, myOrders);
router.get('/driver', protect, restrictTo('driver'), driverOrders);
router.get('/restaurant/:restaurantId', protect, restrictTo('restaurant', 'admin'), restaurantOrders);
router.get('/:id', protect, getOne);
router.put('/:id/status', protect, updateStatus);
router.put('/:id/assign', protect, restrictTo('driver'), assign);
router.get('/available', protect, restrictTo('driver'), async (req, res) => {
  try {
    const Order = require('./order.model');
    const orders = await Order.find({ status: 'preparing', driverId: null })
      .populate('restaurantId', 'name address')
      .populate('customerId', 'name phone');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;