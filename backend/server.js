const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Cấu hình CORS – cho phép frontend (thay đổi origin nếu cần)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://skytrip.onrender.com',
  credentials: true
}));

app.use(express.json());

// Log URI để kiểm tra (chỉ hiển thị một phần nếu muốn an toàn)
console.log('MONGODB_URI from env:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Missing');

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); // nếu có file admin.js riêng
// Các route khác (places, reviews, favorites, weather) sẽ được thêm sau
const placeRoutes = require('./routes/places');
// Gắn routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/places', placeRoutes)
// Route kiểm tra đơn giản
app.get('/', (req, res) => {
  res.json({ message: 'SkyTrip API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});