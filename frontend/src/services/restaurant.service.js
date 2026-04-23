import api from './api';

export const getAllRestaurants = async () => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const getRestaurantById = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};

export const getRestaurantMenu = async (restaurantId) => {
  const response = await api.get(`/restaurants/${restaurantId}/menu`);
  return response.data;
};

export const createRestaurant = async (data) => {
  const response = await api.post('/restaurants', data);
  return response.data;
};

export const updateRestaurant = async (id, data) => {
  const response = await api.put(`/restaurants/${id}, data`);
  return response.data;
};
export const getMealCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
  const data = await response.json();
  return data.categories;
};

export const getMealsByCategory = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};

export const getMealById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};