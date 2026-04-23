import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRestaurantOrders } from '../../services/order.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RestaurantDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { getAllRestaurants } = await import('../../services/restaurant.service');
        const res = await getAllRestaurants();
    const myRestaurant = res.data.find(r => r.ownerId === user.id);
        if (myRestaurant) {
          setRestaurantId(myRestaurant._id);
          const ordersRes = await getRestaurantOrders(myRestaurant._id);
          setOrders(ordersRes.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

if (loading) return <LoadingSpinner />;

if (!restaurantId) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl mb-4">🍽️</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Restaurant Yet</h2>
        <p className="text-gray-500 mb-6">Create your restaurant to start receiving orders</p>
        <Link to="/restaurant/create"
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
          Create Restaurant
        </Link>
      </div>
    </div>
  );
}
const stats = {
  total: orders.length,
  pending: orders.filter(o => o.status === 'pending').length,
  preparing: orders.filter(o => o.status === 'preparing').length,
  delivered: orders.filter(o => o.status === 'delivered').length,
};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Restaurant Dashboard 🍽️</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: stats.total, color: 'bg-blue-100 text-blue-600' },
            { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-600' },
            { label: 'Preparing', value: stats.preparing, color: 'bg-purple-100 text-purple-600' },
            { label: 'Delivered', value: stats.delivered, color: 'bg-green-100 text-green-600' },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} rounded-2xl p-4 text-center`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/restaurant/orders" className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
            <h2 className="text-lg font-bold text-gray-800">📦 Manage Orders</h2>
            <p className="text-gray-500 text-sm mt-1">View and update order statuses</p>
          </Link>
          <Link to="/restaurant/menu" className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
            <h2 className="text-lg font-bold text-gray-800">🍔 Manage Menu</h2>
            <p className="text-gray-500 text-sm mt-1">Add, edit, or remove menu items</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;