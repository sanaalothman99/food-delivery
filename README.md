# 🍔 FoodDash - Food Delivery App

A full-stack food delivery platform with real-time order tracking, multi-role system, and payment integration.

🔗 *Live Demo:* https://food-delivery-six-lyart.vercel.app/

---

## 🚀 Features

- 🔐 JWT Authentication with role-based access (Customer / Restaurant / Driver)
- 🍽️ Browse restaurants and menus powered by TheMealDB API
- 🛒 Add to cart and place orders
- 📦 Real-time order tracking with Socket.io
- 💳 Payment integration with Stripe
- 📊 Restaurant Dashboard (manage orders & menu)
- 🚗 Driver Dashboard (accept & deliver orders)
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Socket.io Client
- Stripe.js

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io
- Stripe API

---

## 📸 Screenshots

### Home Page


![Home](screenshots/home.png)



### Restaurant Menu


![Menu](screenshots/menu.png)



### Order Tracking


![Tracking](screenshots/tracking.png)



### Restaurant Dashboard


![Dashboard](screenshots/dashboard.png)



---

## ⚙️ Installation

### Backend
```bash
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev
Environment Variables
Backend .env:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=your_stripe_key
Frontend .env:
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
👩‍💻 Developer
Sana Alothman
GitHub: @sanaalothman99
Email: sanaalothmann@gmail.com