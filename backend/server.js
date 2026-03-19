const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // chỉ một lần
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'https://skytrip-frontend.onrender.com', credentials: true }));
app.use(express.json());

console.log('MONGODB_URI from env:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'SkyTrip API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});