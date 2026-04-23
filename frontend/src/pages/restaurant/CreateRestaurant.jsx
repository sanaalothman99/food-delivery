import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRestaurant } from '../../services/restaurant.service';
import toast from 'react-hot-toast';

const CreateRestaurant = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRestaurant(form);
      toast.success('Restaurant created!');
      navigate('/restaurant/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">🍽️ Create Restaurant</h1>
          <p className="text-gray-500 mt-2">Fill in your restaurant details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="My Restaurant" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400" required>
              <option value="">Select category</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Pizza">Pizza</option>
              <option value="Sushi">Sushi</option>
              <option value="Burgers">Burgers</option>
              <option value="Chicken">Chicken</option>
              <option value="Seafood">Seafood</option>
              <option value="Desserts">Desserts</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="123 Main Street" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="0501234567" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Tell us about your restaurant..." rows={3} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Restaurant 🍽️'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;