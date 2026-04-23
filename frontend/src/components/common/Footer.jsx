import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-4">🍔 FoodDash</h2>
            <p className="text-gray-400 text-sm">
              Delivering happiness to your doorstep, fast and fresh.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-orange-500 transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-orange-500 transition">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500 transition">Blog</Link></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h3 className="font-semibold text-lg mb-4">For Partners</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/register" className="hover:text-orange-500 transition">Add Restaurant</Link></li>
              <li><Link to="/register" className="hover:text-orange-500 transition">Become a Driver</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 support@fooddash.com</li>
              <li>📞 +1 234 567 890</li>
              <li>📍 123 Food Street</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 FoodDash. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;