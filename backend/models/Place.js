const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, default: '/image/default-place.jpg' },
  category: { type: String, enum: ['beach', 'mountain', 'city', 'culture', 'food', 'spiritual'], default: 'city' },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  viewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Place', PlaceSchema);