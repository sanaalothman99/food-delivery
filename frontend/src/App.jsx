import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Customer
import Home from './pages/customer/Home';
import RestaurantDetails from './pages/customer/RestaurantDetails';
import Checkout from './pages/customer/Checkout';
import OrderTracking from './pages/customer/OrderTracking';
import MyOrders from './pages/customer/MyOrders';

// Restaurant
import RestaurantDashboard from './pages/restaurant/Dashboard';
import RestaurantOrders from './pages/restaurant/Orders';
import RestaurantMenu from './pages/restaurant/Menu';

// Driver
import DriverDashboard from './pages/driver/Dashboard';
import ActiveDelivery from './pages/driver/ActiveDelivery';
import CategoryPage from './pages/customer/CategoryPage';
import CreateRestaurant from './pages/restaurant/CreateRestaurant';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />

                {/* Customer */}
                <Route path="/cart" element={<ProtectedRoute roles={['customer']}><Checkout /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute roles={['customer']}><MyOrders /></ProtectedRoute>} />
                <Route path="/orders/:id" element={<ProtectedRoute roles={['customer']}><OrderTracking /></ProtectedRoute>} />

                {/* Restaurant */}
                <Route path="/restaurant/dashboard" element={<ProtectedRoute roles={['restaurant']}><RestaurantDashboard /></ProtectedRoute>} />
                <Route path="/restaurant/create" element={<ProtectedRoute roles={['restaurant']}><CreateRestaurant /></ProtectedRoute>} />
                <Route path="/restaurant/orders" element={<ProtectedRoute roles={['restaurant']}><RestaurantOrders /></ProtectedRoute>} />
                <Route path="/restaurant/menu" element={<ProtectedRoute roles={['restaurant']}><RestaurantMenu /></ProtectedRoute>} />
                <Route path="/category/:category" element={<CategoryPage />} />
                {/* Driver */}
                <Route path="/driver/dashboard" element={<ProtectedRoute roles={['driver']}><DriverDashboard /></ProtectedRoute>} />
                <Route path="/driver/delivery/:id" element={<ProtectedRoute roles={['driver']}><ActiveDelivery /></ProtectedRoute>} />

                <Route path="*" element={<NotFound />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;