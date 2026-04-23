const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('./restaurant.service');

const create = async (req, res) => {
  try {
    const restaurant = await createRestaurant(req.body, req.user._id);
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const restaurant = await updateRestaurant(req.params.id, req.body, req.user._id);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await deleteRestaurant(req.params.id, req.user._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { create, getAll, getOne, update, remove };