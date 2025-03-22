import userModel from "../models/userModel.js";

// add item to user card

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    }
    else {
      cartData[req.body.itemId]++;
    }
    const cart = await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });
    res.json({
      success: true,
      message: "Item added to cart"
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

//remove item from user card
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      // If quantity reaches 0, remove item from cart
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }

      // Update the database correctly
      await userModel.findByIdAndUpdate(req.body.userId, { cartData }, { new: true });

      return res.json({
        success: true,
        message: "Removed from Cart successfully",
      });
    } else {
      return res.status(400).json({ success: false, message: "Item not found in cart" });
    }
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



//fetches item from user card
const getCart = async (req, res) => {

  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      data: cartData,
      message: "Cart fetched successfully"
    })


  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server error"
    })
  }

}

export {
  addToCart,
  removeFromCart,
  getCart,
}