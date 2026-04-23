const {
  createMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem
} = require('./menu.service');

const create = async (req, res) => {
  try {
    const item = await createMenuItem(req.body, req.params.restaurantId);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const items = await getMenuByRestaurant(req.params.restaurantId);
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const item = await updateMenuItem(req.params.id, req.body);
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await deleteMenuItem(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, getMenu, update, remove };