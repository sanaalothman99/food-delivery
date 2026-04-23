import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
        {/* Image */}
        <div className="h-48 bg-orange-100 flex items-center justify-center">
          {restaurant.logo ? (
            <img src={restaurant.logo} alt={restaurant.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-6xl">🍽️</span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{restaurant.category}</p>
          <p className="text-sm text-gray-400 mt-1">{restaurant.address}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-semibold">{restaurant.rating || '0.0'}</span>
              <span className="text-gray-400 text-xs">({restaurant.totalReviews})</span>
            </div>

            <span className={`text-xs px-2 py-1 rounded-full font-medium ${restaurant.isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;