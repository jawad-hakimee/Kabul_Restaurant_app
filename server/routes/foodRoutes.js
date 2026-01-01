const express = require('express');
const router = express.Router();
const {
    getFoodItems,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
} = require('../controllers/foodController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/').get(getFoodItems).post(protect, admin, createFoodItem);
router
    .route('/:id')
    .get(getFoodItemById)
    .put(protect, admin, updateFoodItem)
    .delete(protect, admin, deleteFoodItem);

module.exports = router;
