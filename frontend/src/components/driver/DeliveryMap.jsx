import { useEffect, useRef } from 'react';

const DeliveryMap = ({ orderId, socket }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!socket?.current) return;

    socket.current.on('location_update', (data) => {
      console.log('Driver location:', data);
    });

    return () => {
      socket?.current?.off('location_update');
    };
  }, [socket]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="font-bold text-gray-800 mb-4">Live Tracking 📍</h2>
      <div
        ref={mapRef}
        className="w-full h-64 bg-orange-50 rounded-xl flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-4xl mb-2">🚗</p>
          <p className="text-gray-500 text-sm">Driver is on the way...</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;