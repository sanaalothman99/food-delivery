const { createReview, getReviews } = require('./review.service');

const create = async (req, res) => {
  try {
    const review = await createReview(req.body, req.user._id);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const reviews = await getReviews(req.params.targetId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, getAll };