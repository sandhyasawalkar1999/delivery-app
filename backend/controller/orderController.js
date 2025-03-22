import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const session_urltripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend

const placeOrder = async (req, res) => {

  const frontend_url = "http://localhost:5173"

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    })

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quentity: item.quentity
    }))

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge"
        },
        unit_amount: 2 * 100 * 80
      },
      quentity: 1
    })

    const session = await Stripe.Checkout.session.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    res.json({
      success: true,
      session_url: session.url
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }

}

export { placeOrder };