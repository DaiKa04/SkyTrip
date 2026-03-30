const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');
const { auth, admin } = require('../middleware/auth');

// Public routes
router.get('/', placeController.getPlaces);
router.get('/:id', placeController.getPlaceById);

// Admin routes (cần xác thực và quyền admin)
router.post('/', auth, admin, placeController.createPlace);
router.put('/:id', auth, admin, placeController.updatePlace);
router.delete('/:id', auth, admin, placeController.deletePlace);

module.exports = router;