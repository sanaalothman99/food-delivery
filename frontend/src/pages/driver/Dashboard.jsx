import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders, assignDriver } from '../../services/order.service';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const DriverDashboard = () => {
  const [availableOrders, setAvailableOrders] = useState([]);
  const [myDeliveries, setMyDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [available, mine] = await Promise.all([
          api.get('/orders/available'),
          api.get('/orders/driver')
        ]);
        setAvailableOrders(available.data.data || []);
        setMyDeliveries(mine.data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (orderId) => {
    try {
      await assignDriver(orderId);
      setAvailableOrders(prev => prev.filter(o => o._id !== orderId));
      toast.success('Order assigned to you!');
    } catch (error) {
      toast.error('Failed to assign order');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Driver Dashboard 🚗</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-orange-100 text-orange-600 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold">{availableOrders.length}</p>
            <p className="text-sm mt-1">Available Orders</p>
          </div>
          <div className="bg-green-100 text-green-600 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold">{myDeliveries.filter(o => o.status === 'delivered').length}</p>
            <p className="text-sm mt-1">Completed</p>
          </div>
        </div>

        {/* Available Orders */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Available Orders</h2>
        {availableOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No available orders</p>
        ) : (
          <div className="space-y-4 mb-8">
            {availableOrders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow p-5">
                <p className="font-bold text-gray-800">Order #{order._id?.slice(-6)}</p>
                <p className="text-sm text-gray-500 mt-1">📍 {order.deliveryAddress}</p>
                <p className="text-orange-500 font-bold mt-1">${order.totalPrice}</p>
                <button
                  onClick={() => handleAssign(order._id)}
                  className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition"
                >
                  Accept Delivery
                </button>
              </div>
            ))}
          </div>
        )}

        {/* My Deliveries */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">My Deliveries</h2>
        {myDeliveries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No deliveries yet</p>
        ) : (
          <div className="space-y-4">
            {myDeliveries.map((order) => (
              <Link to={`/driver/delivery/${order._id}`} key={order._id}>
                <div className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition">
                  <p className="font-bold text-gray-800">Order #{order._id?.slice(-6)}</p>
                  <p className="text-sm text-gray-500 mt-1">📍 {order.deliveryAddress}</p>
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full mt-2 inline-block">
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;