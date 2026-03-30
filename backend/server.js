const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://skytrip.onrender.com'],
  credentials: true
}));

app.use(express.json());

console.log('MONGODB_URI from env:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Missing');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const placeRoutes = require('./routes/placesRoutes'); // dùng file placesRoutes.js

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/places', placeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SkyTrip API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});