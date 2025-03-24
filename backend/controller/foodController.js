import foodModel from '../models/foodModel.js'
import fs from 'fs';

//add food item

const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    await food.save();
    res.json({
      success: true,
      message: 'Food item added successfully',
      food: food
    })
  } catch (err) {
    console.log(err);
    res.json({
      sucess: false,
      message: "Error saving"
    })
  }
}

//get all food items

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      sucess: true,
      data: foods
    })
  } catch (err) {
    console.log(err);
    res.json({
      sucess: false,
      message: "Error fetching food items"
    })
  }

}

//delete food item
const deleteFood = async (req, res) => {
  try {
    const foodId = req.params._id; // Extracting from params
    console.log("Food ID received:", foodId); // Debugging log

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found"
      });
    }

    // Delete the image file if it exists
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log("Error deleting image:", err);
      });
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(foodId);

    res.json({
      success: true,
      message: "Food item deleted successfully",
      data: food
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error deleting food item"
    });
  }
};



export { addFood, listFood, deleteFood }