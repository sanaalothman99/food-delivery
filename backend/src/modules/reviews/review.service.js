const Review = require('./review.model');
const Restaurant = require('../restaurants/restaurant.model');

const createReview = async (data, customerId) => {
  const review = await Review.create({ ...data, customerId });

  // Update restaurant rating
  if (data.targetType === 'restaurant') {
    const reviews = await Review.find({
      targetId: data.targetId,
      targetType: 'restaurant'
    });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await Restaurant.findByIdAndUpdate(data.targetId, {
      rating: avgRating.toFixed(1),
      totalReviews: reviews.length
    });
  }

  return review;
};

const getReviews = async (targetId) => {
  const reviews = await Review.find({ targetId })
    .populate('customerId', 'name avatar')
    .sort({ createdAt: -1 });
  return reviews;
};

module.exports = { createReview, getReviews };