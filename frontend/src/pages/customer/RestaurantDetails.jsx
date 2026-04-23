import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById, getRestaurantMenu } from '../../services/restaurant.service';
import { useCart } from '../../context/CartContext';
import MenuItemCard from '../../components/customer/MenuItemCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restRes, menuRes] = await Promise.all([
          getRestaurantById(id),
          getRestaurantMenu(id)
        ]);
        setRestaurant(restRes.data);
        setMenu(menuRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold">{restaurant?.name}</h1>
          <p className="mt-1 text-orange-100">{restaurant?.category} • {restaurant?.address}</p>
          <span className={`mt-2 inline-block text-xs px-3 py-1 rounded-full font-medium ${restaurant?.isOpen ? 'bg-green-400' : 'bg-red-400'}`}>
            {restaurant?.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>
        {menu.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No menu items available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.map((item) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onAdd={() => {
                  addToCart(item, id);
                  toast.success(`${item.name} added to cart!`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;