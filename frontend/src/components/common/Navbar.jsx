import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          🍔 FoodDash
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600 text-sm">Hi, {user.name}</span>
              {user.role === 'customer' && (
                <>
                  <Link to="/orders" className="text-gray-600 hover:text-orange-500">My Orders</Link>
                  <Link to="/cart" className="relative">
                    <ShoppingCart className="text-gray-600 hover:text-orange-500" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </>
              )}
              {user.role === 'restaurant' && (
                <Link to="/restaurant/dashboard" className="text-gray-600 hover:text-orange-500">Dashboard</Link>
              )}
              {user.role === 'driver' && (
                <Link to="/driver/dashboard" className="text-gray-600 hover:text-orange-500">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:text-red-600">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-orange-500">Login</Link>
              <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          {user ? (
            <>
              <p className="text-gray-600 text-sm font-medium">Hi, {user.name}</p>
              {user.role === 'customer' && (
                <>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500">My Orders</Link>
                  <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500">
                    Cart {totalItems > 0 && <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">{totalItems}</span>}
                  </Link>
                </>
              )}
              {user.role === 'restaurant' && (
                <Link to="/restaurant/dashboard" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500">Dashboard</Link>
              )}
              {user.role === 'driver' && (
                <Link to="/driver/dashboard" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="block text-red-500 hover:text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block text-gray-600 hover:text-orange-500">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block bg-orange-500 text-white px-4 py-2 rounded-full text-center hover:bg-orange-600">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;