import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../services/order.service';
import useSocket from '../../hooks/useSocket';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ActiveDelivery = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket(id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDeliver = async () => {
    try {
      await updateOrderStatus(id, 'delivered');
      toast.success('Order delivered! 🎉');
      navigate('/driver/dashboard');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Active Delivery 🚗</h1>

        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Order #{order?._id?.slice(-6)}</h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-gray-400">Delivery Address</p>
                <p className="font-semibold">{order?.deliveryAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-2xl">👤</span>
              <div>
                <p className="text-sm text-gray-400">Customer</p>
                <p className="font-semibold">{order?.customerId?.name}</p>
                <p className="text-sm">{order?.customerId?.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-2xl">🍔</span>
              <div>
                <p className="text-sm text-gray-400">Items</p>
                {order?.items?.map((item, i) => (
                  <p key={i} className="font-semibold">{item.name} x{item.quantity}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-sm text-gray-400">Total</p>
                <p className="font-bold text-orange-500 text-lg">${order?.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDeliver}
          className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition"
        >
          Mark as Delivered ✅
        </button>
      </div>
    </div>
  );
};

export default ActiveDelivery;