import { Plus } from 'lucide-react';

const MenuItemCard = ({ item, onAdd }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        <p className="text-orange-500 font-bold mt-2">${item.price}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        {item.image && (
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
        )}
        <button
          onClick={onAdd}
          className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;