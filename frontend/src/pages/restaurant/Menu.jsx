import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAllRestaurants, getRestaurantMenu } from '../../services/restaurant.service';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const RestaurantMenu = () => {
  const { user } = useAuth();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantId, setRestaurantId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllRestaurants();
       const myRestaurant = res.data.find(r => r.ownerId === user.id || r.ownerId === user._id);
        if (myRestaurant) {
          setRestaurantId(myRestaurant._id);
          const menuRes = await getRestaurantMenu(myRestaurant._id);
          setMenu(menuRes.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await api.post(`/restaurants/${restaurantId}/menu`, form);
      setMenu(prev => [...prev, res.data.data]);
      setForm({ name: '', description: '', price: '', category: '' });
      toast.success('Item added!');
    } catch (error) {
      toast.error('Failed to add item');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/restaurants/${restaurantId}/menu/${id}`);
      setMenu(prev => prev.filter(item => item._id !== id));
      toast.success('Item deleted!');
    } catch (error) {
      toast.error('Failed to delete item');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Menu Manager 🍔</h1>

        {/* Add Item Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-4">Add New Item</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Item name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input type="text" placeholder="Category" value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input type="number" placeholder="Price" value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            <input type="text" placeholder="Description" value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            <button type="submit" disabled={adding}
              className="md:col-span-2 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-50">
              {adding ? 'Adding...' : 'Add Item'}
            </button>
          </form>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menu.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-orange-500 font-bold">${item.price}</p>
              </div>
              <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-600">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;