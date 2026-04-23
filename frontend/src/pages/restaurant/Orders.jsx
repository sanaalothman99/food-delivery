import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getRestaurantOrders, updateOrderStatus } from '../../services/order.service';
import { getAllRestaurants } from '../../services/restaurant.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-600',
  accepted: 'bg-blue-100 text-blue-600',
  preparing: 'bg-purple-100 text-purple-600',
  on_the_way: 'bg-indigo-100 text-indigo-600',
  delivered: 'bg-green-100 text-green-600',
  cancelled: 'bg-red-100 text-red-500'
};

const nextStatus = {
  pending: 'accepted',
  accepted: 'preparing',
  preparing: 'on_the_way',
  on_the_way: 'delivered'
};

const RestaurantOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
const fetchData = async () => {
  try {
    const res = await getAllRestaurants();
    const myRestaurants = res.data.filter(r => r.ownerId === user.id);
    if (myRestaurants.length > 0) {
      setRestaurantId(myRestaurants[0]._id);
      let allOrders = [];
      for (const rest of myRestaurants) {
        const ordersRes = await getRestaurantOrders(rest._id);
        if (ordersRes.data) {
          allOrders = [...allOrders, ...ordersRes.data];
        }
      }
      setOrders(allOrders);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
    fetchData();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      toast.success('Order status updated!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders 📦</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-800">Order #{order._id?.slice(-6)}</p>
                    <p className="text-sm text-gray-500">{order.customerId?.name} • {order.customerId?.phone}</p>
                    <p className="text-sm text-gray-400 mt-1">📍 {order.deliveryAddress}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="border-t pt-3">
                  {order.items?.map((item, i) => (
                    <p key={i} className="text-sm text-gray-600">{item.name} x{item.quantity}</p>
                  ))}
                  <p className="text-orange-500 font-bold mt-2">${order.totalPrice}</p>
                </div>

                {nextStatus[order.status] && (
                  <button
                    onClick={() => handleUpdateStatus(order._id, nextStatus[order.status])}
                    className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition"
                  >
                    Mark as {nextStatus[order.status].replace('_', ' ')}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantOrders;