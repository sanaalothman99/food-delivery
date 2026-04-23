import { useEffect, useState } from 'react';
import { getMealCategories } from '../../services/restaurant.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getMealCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filtered = categories.filter(c =>
    c.strCategory.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Hungry? We got you 🍔</h1>
        <p className="text-lg mb-6">Order from the best restaurants near you</p>
        <div className="max-w-md mx-auto bg-white rounded-full flex items-center px-4 py-2">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-gray-700 text-sm"
          />
          <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
            Search
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cat) => (
            <Link to={`/category/${cat.strCategory}`} key={cat.idCategory}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img
                    src={cat.strCategoryThumb}
                    alt={cat.strCategory}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{cat.strCategory}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.strCategoryDescription}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-orange-500 font-medium">View Menu →</span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Open</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;