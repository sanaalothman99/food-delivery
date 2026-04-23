import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const MenuManager = ({ menu, setMenu, restaurantId }) => {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
  const [adding, setAdding] = useState(false);

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

  return (
    <div>
      {/* Add Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
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

      {/* Menu List */}
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
  );
};

export default MenuManager;