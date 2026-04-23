const express = require('express');
const router = express.Router();
const { create, getAll, getOne, update, remove } = require('./restaurant.controller');
const { protect } = require('../../middleware/auth.middleware');
const { restrictTo } = require('../../middleware/role.middleware');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', protect, restrictTo('restaurant', 'admin'), create);
router.put('/:id', protect, restrictTo('restaurant', 'admin'), update);
router.delete('/:id', protect, restrictTo('restaurant', 'admin'), remove);

module.exports = router;