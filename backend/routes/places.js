const express = require('express');
const router = express.Router();

// GET /api/places – trả về danh sách địa điểm (tạm thời)
router.get('/', (req, res) => {
  // Dữ liệu mẫu để frontend hiển thị
  const samplePlaces = [
    {
      _id: '1',
      name: 'Vịnh Hạ Long',
      province: 'Quảng Ninh',
      images: ['/placeholder.jpg'],
      avgRating: 4.8,
      totalReviews: 1250,
      price: 2500000,
      coordinates: { lat: 20.9101, lng: 107.1839 }
    },
    {
      _id: '2',
      name: 'Phố cổ Hội An',
      province: 'Quảng Nam',
      images: ['/placeholder.jpg'],
      avgRating: 4.7,
      totalReviews: 980,
      price: 500000,
      coordinates: { lat: 15.8801, lng: 108.3380 }
    }
  ];
  res.json(samplePlaces);
});

module.exports = router;