const Restaurant = require('./restaurant.model');

const createRestaurant = async (data, ownerId) => {
  const restaurant = await Restaurant.create({ ...data, ownerId });
  return restaurant;
};

const getAllRestaurants = async () => {
  const restaurants = await Restaurant.find({ isOpen: true });
  return restaurants;
};

const getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) throw new Error('Restaurant not found');
  return restaurant;
};

const updateRestaurant = async (id, data, userId) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) throw new Error('Restaurant not found');
  if (restaurant.ownerId.toString() !== userId.toString()) {
    throw new Error('Not authorized');
  }
  const updated = await Restaurant.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

const deleteRestaurant = async (id, userId) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) throw new Error('Restaurant not found');
  if (restaurant.ownerId.toString() !== userId.toString()) {
    throw new Error('Not authorized');
  }
  await Restaurant.findByIdAndDelete(id);
  return { message: 'Restaurant deleted successfully' };
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
};