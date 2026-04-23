import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (orderId) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_URL);

    if (orderId) {
      socket.current.emit('join_room', orderId);
    }

    return () => {
      socket.current.disconnect();
    };
  }, [orderId]);

  return socket;
};

export default useSocket;