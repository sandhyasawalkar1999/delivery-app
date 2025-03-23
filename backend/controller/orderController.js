import dotenv from "dotenv";
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// Place Order (Updated to use req.userId)
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173/";

  try {
    const newOrder = new orderModel({
      userId: req.userId,  // ✅ Extracted from token
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100  // Ensure correct price format
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge"
        },
        unit_amount: 200  // Fixed delivery charge
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    if (!session.url) throw new Error("Failed to create Stripe session");

    res.json({
      success: true,
      session_url: session.url
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};


//verify order

const verifyOrder = async (req, res) => {

  const { orderId, success } = req.body;
  try {

    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({
        success: true,
        message: "Order paid successfully"
      });
    }
    else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success: false,
        message: "Order not paid"
      });
    }


  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//user orders for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({
      success: true,
      data: orders
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//Listing orders for admin panel
const listOrder = async (req, res) => {

  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      data: orders
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//api for updating order status

const updateOrderStatus = async (req, res) => {
  try {

    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({
      success: true,
      message: "Order status updated successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


export { placeOrder, verifyOrder, userOrders, listOrder, updateOrderStatus };
