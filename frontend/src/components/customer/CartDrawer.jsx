import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, Trash2 } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Your Cart 🛒</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-orange-500 text-sm">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">-</button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold">+</button>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-orange-500">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { navigate('/cart'); onClose(); }}
                className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;