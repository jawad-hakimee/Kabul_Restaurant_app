const FoodItem = require('../models/FoodItem.js');

const getFoodItems = async (req, res) => {
    const foodItems = await FoodItem.find({});
    res.json(foodItems);
};

const getFoodItemById = async (req, res) => {
    const foodItem = await FoodItem.findById(req.params.id);

    if (foodItem) {
        res.json(foodItem);
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
};

const createFoodItem = async (req, res) => {
    const { name, description, price, category, image } = req.body;

    const foodItem = new FoodItem({
        name,
        description,
        price,
        category,
        image,
    });

    const createdFoodItem = await foodItem.save();
    res.status(201).json(createdFoodItem);
};

const updateFoodItem = async (req, res) => {
    const { name, description, price, category, image, isAvailable } = req.body;

    const foodItem = await FoodItem.findById(req.params.id);

    if (foodItem) {
        foodItem.name = name || foodItem.name;
        foodItem.description = description || foodItem.description;
        foodItem.price = price || foodItem.price;
        foodItem.category = category || foodItem.category;
        foodItem.image = image || foodItem.image;
        foodItem.isAvailable = isAvailable !== undefined ? isAvailable : foodItem.isAvailable;

        const updatedFoodItem = await foodItem.save();
        res.json(updatedFoodItem);
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
};

const deleteFoodItem = async (req, res) => {
    const foodItem = await FoodItem.findById(req.params.id);

    if (foodItem) {
        await foodItem.deleteOne();
        res.json({ message: 'Food item removed' });
    } else {
        res.status(404).json({ message: 'Food item not found' });
    }
};

module.exports = {
    getFoodItems,
    getFoodItemById,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
};
