import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/order.service';
import useSocket from '../../hooks/useSocket';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const steps = ['pending', 'accepted', 'preparing', 'on_the_way', 'delivered'];

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket(id);

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

  useEffect(() => {
    if (!socket.current) return;
    socket.current.on('order_status_update', (data) => {
      setOrder((prev) => ({ ...prev, status: data.status }));
    });
  }, [socket]);

  if (loading) return <LoadingSpinner />;

  const currentStep = steps.indexOf(order?.status);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Tracking</h1>
        <p className="text-gray-500 mb-8">Order #{order?._id?.slice(-6)}</p>
{/* Status Steps */}
<div className="bg-white rounded-2xl shadow p-6 mb-6">
  {/* Mobile - vertical */}
  <div className="flex flex-col gap-3 md:hidden">
    {steps.map((step, index) => (
      <div key={step} className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0
          ${index <= currentStep ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'}`}>
          {index < currentStep ? '✓' : index + 1}
        </div>
        <p className={`text-sm capitalize ${index <= currentStep ? 'text-orange-500 font-semibold' : 'text-gray-400'}`}>
          {step.replace('_', ' ')}
        </p>
      </div>
    ))}
  </div>

  {/* Desktop - horizontal */}
  <div className="hidden md:flex justify-between items-center relative">
    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0">
      <div
        className="h-full bg-orange-500 transition-all duration-500"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}% `}}
      />
    </div>
    {steps.map((step, index) => (
      <div key={step} className="flex flex-col items-center z-10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
          ${index <= currentStep ? 'bg-orange-500' : 'bg-gray-200 text-gray-400'}`}>
          {index < currentStep ? '✓' : index + 1}
        </div>
        <p className="text-xs text-gray-500 mt-2 capitalize">{step.replace('_', ' ')}</p>
      </div>
    ))}
  </div>
</div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Order Items</h2>
          {order?.items?.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b last:border-0">
              <span className="text-gray-700">{item.name} x{item.quantity}</span>
              <span className="text-orange-500">${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold">
            <span>Total</span>
            <span className="text-orange-500">${order?.totalPrice}</span>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-gray-800 mb-2">Delivery Address</h2>
          <p className="text-gray-500">📍 {order?.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;