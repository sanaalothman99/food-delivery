const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const Restaurant = require('../modules/restaurants/restaurant.model');
const User = require('../modules/auth/user.model');

dotenv.config();

const seedRestaurants = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected ✅');

    // جلب الـ categories من Meal DB
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    const categories = data.categories;

    // جيب أول restaurant owner
    const owner = await User.findById('69ef4ce7caf9901e48bd11a9');
    if (!owner) {
      console.log('No restaurant owner found!');
      process.exit(1);
    }

    // احذف المطاعم القديمة
    await Restaurant.deleteMany({});
    console.log('Old restaurants deleted ✅');

    // أنشئ مطعم لكل category
    for (const cat of categories) {
      await Restaurant.create({
        ownerId: owner._id,
        name: `${cat.strCategory} Restaurant`,
        description: cat.strCategoryDescription,
        logo: cat.strCategoryThumb,
        category: cat.strCategory,
        address: '123 Food Street',
        phone: '0501234567',
        isOpen: true,
        rating: (Math.random() * 2 + 3).toFixed(1),
        totalReviews: Math.floor(Math.random() * 100)
      });
      console.log(`Created: ${cat.strCategory} Restaurant ✅`);
    }

    console.log('All restaurants seeded! 🎉');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedRestaurants();