const express = require('express');
const router = express.Router({ mergeParams: true });
const { create, getMenu, update, remove } = require('./menu.controller');
const { protect } = require('../../middleware/auth.middleware');
const { restrictTo } = require('../../middleware/role.middleware');

router.get('/', getMenu);
router.post('/', protect, restrictTo('restaurant', 'admin'), create);
router.put('/:id', protect, restrictTo('restaurant', 'admin'), update);
router.delete('/:id', protect, restrictTo('restaurant', 'admin'), remove);

module.exports = router