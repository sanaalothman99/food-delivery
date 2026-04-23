const statusColors = {
  pending: 'bg-yellow-100 text-yellow-600',
  accepted: 'bg-blue-100 text-blue-600',
  preparing: 'bg-purple-100 text-purple-600',
  on_the_way: 'bg-indigo-100 text-indigo-600',
  delivered: 'bg-green-100 text-green-600',
  cancelled: 'bg-red-100 text-red-500'
};

const nextStatus = {
  pending: 'accepted',
  accepted: 'preparing',
  preparing: 'on_the_way',
  on_the_way: 'delivered'
};

const OrderCard = ({ order, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-gray-800">Order #{order._id?.slice(-6)}</p>
          <p className="text-sm text-gray-500">{order.customerId?.name} • {order.customerId?.phone}</p>
          <p className="text-sm text-gray-400 mt-1">📍 {order.deliveryAddress}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
          {order.status.replace('_', ' ')}
        </span>
      </div>

      <div className="border-t pt-3">
        {order.items?.map((item, i) => (
          <p key={i} className="text-sm text-gray-600">{item.name} x{item.quantity}</p>
        ))}
        <p className="text-orange-500 font-bold mt-2">${order.totalPrice}</p>
      </div>

      {nextStatus[order.status] && (
        <button
          onClick={() => onUpdateStatus(order._id, nextStatus[order.status])}
          className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition"
        >
          Mark as {nextStatus[order.status].replace('_', ' ')}
        </button>
      )}
    </div>
  );
};

export default OrderCard;