const MenuItem = require('./menu.model');

const createMenuItem = async (data, restaurantId) => {
  const item = await MenuItem.create({ ...data, restaurantId });
  return item;
};

const getMenuByRestaurant = async (restaurantId) => {
  const items = await MenuItem.find({ restaurantId, isAvailable: true });
  return items;
};

const updateMenuItem = async (id, data) => {
  const item = await MenuItem.findByIdAndUpdate(id, data, { new: true });
  if (!item) throw new Error('Menu item not found');
  return item;
};

const deleteMenuItem = async (id) => {
  const item = await MenuItem.findByIdAndDelete(id);
  if (!item) throw new Error('Menu item not found');
  return { message: 'Menu item deleted successfully' };
};

module.exports = {
  createMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem
};