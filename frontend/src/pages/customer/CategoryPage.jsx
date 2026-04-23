import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealsByCategory, getAllRestaurants } from '../../services/restaurant.service';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealsData, restaurantsRes] = await Promise.all([
          getMealsByCategory(category),
          getAllRestaurants()
        ]);
        setMeals(mealsData || []);
        const rest = restaurantsRes.data.find(r => r.category === category);
        setRestaurant(rest);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const handleAddToCart = (meal) => {
    if (!restaurant) return toast.error('Restaurant not found!');
    const price = Math.floor(Math.random() * 20) + 10;
    const item = {
      _id: meal.idMeal,
      name: meal.strMeal,
      price,
      image: meal.strMealThumb,
      description: category
    };
    addToCart(item, restaurant._id);
    toast.success(`${meal.strMeal} added to cart!`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/')} className="text-orange-100 hover:text-white mb-4 flex items-center gap-1">
            ← Back
          </button>
          <div className="flex items-center gap-4">
            {restaurant?.logo && (
              <img src={restaurant.logo} alt={category} className="w-16 h-16 rounded-full object-cover" />
            )}
            <div>
              <h1 className="text-3xl font-bold">{category} Restaurant</h1>
              <p className="text-orange-100 mt-1">⭐ {restaurant?.rating} • {restaurant?.totalReviews} reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-20 h-20 object-cover rounded-xl" />
                <div>
                  <h3 className="font-semibold text-gray-800">{meal.strMeal}</h3>
                  <p className="text-sm text-gray-500">{category}</p>
                  <p className="text-orange-500 font-bold mt-1">${Math.floor(Math.random() * 20) + 10}</p>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(meal)}
                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition flex-shrink-0"
              >
                <Plus size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;