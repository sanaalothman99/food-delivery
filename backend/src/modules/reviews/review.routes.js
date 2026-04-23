const express = require('express');
const router = express.Router();
const { create, getAll } = require('./review.controller');
const { protect } = require('../../middleware/auth.middleware');
const { restrictTo } = require('../../middleware/role.middleware');

router.post('/', protect, restrictTo('customer'), create);
router.get('/:targetId', getAll);

module.exports = router;