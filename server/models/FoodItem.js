const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
