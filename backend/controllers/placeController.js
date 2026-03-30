const Place = require('../models/Place');

// Lấy danh sách địa điểm (có tìm kiếm, phân trang)
exports.getPlaces = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || '';
    const category = req.query.category || '';

    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const total = await Place.countDocuments(query);
    const places = await Place.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      places,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
 } catch (error) {
    console.error('Error in getPlaces:', error);
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết một địa điểm
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Không tìm thấy địa điểm' });
    }
    // Tăng lượt xem
    place.viewCount += 1;
    await place.save();
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo địa điểm mới (admin)
exports.createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật địa điểm (admin)
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!place) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(place);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa địa điểm (admin)
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};