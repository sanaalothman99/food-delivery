const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./modules/auth/auth.routes');
const restaurantRoutes = require('./modules/restaurants/restaurant.routes');
const menuRoutes = require('./modules/menu/menu.routes');
const orderRoutes = require('./modules/orders/order.routes');
const reviewRoutes = require('./modules/reviews/review.routes');
const paymentRoutes = require('./modules/payment/payment.routes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors({
  origin: ['https://food-delivery-six-lyart.vercel.app', 'http://localhost:5173']
}));
app.use(express.json());

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (orderId) => {
    socket.join(orderId);
    console.log(`User joined room: ${orderId}`);
  });

  socket.on('driver_location', (data) => {
    io.to(data.orderId).emit('location_update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/restaurants/:restaurantId/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Food Delivery API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});

module.exports = app;