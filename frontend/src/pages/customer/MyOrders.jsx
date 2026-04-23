import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../services/order.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-600',
  accepted: 'bg-blue-100 text-blue-600',
  preparing: 'bg-purple-100 text-purple-600',
  on_the_way: 'bg-indigo-100 text-indigo-600',
  delivered: 'bg-green-100 text-green-600',
  cancelled: 'bg-red-100 text-red-500'
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No orders yet 🍽️</p>
            <Link to="/" className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
              Order Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link to={`/orders/${order._id}`} key={order._id}>
                <div className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{order.restaurantId?.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.items?.length} items • ${order.totalPrice}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;