import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/order.service';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, totalPrice, restaurantId, updateQuantity, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!address) return toast.error('Please enter delivery address');
    if (cartItems.length === 0) return toast.error('Your cart is empty');

    setLoading(true);
    try {
      const orderData = {
        restaurantId,
        items: cartItems.map((i) => ({
          itemId: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        })),
        totalPrice,
        deliveryAddress: address
      };
      const res = await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/orders/${res.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-20">Your cart is empty</p>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow p-4 space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-orange-500 text-sm">${item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center font-bold">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center font-bold">+</button>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow p-4 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="bg-white rounded-2xl shadow p-4 mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-orange-500 font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? 'Placing Order...' : 'Place Order 🍔'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;