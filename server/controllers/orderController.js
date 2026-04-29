import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "../config/stripe.js";

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL;
  
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    // await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} }); // Moved to verifyOrder

    const line_items = req.body.items.map((item) => {
      const price = parseFloat(item.amount);
      if (isNaN(price)) {
        throw new Error(`Invalid price for item: ${item.dish_name}`);
      }
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.dish_name,
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // Ensure frontend_url doesn't end with a slash, then add one
    const clean_url = frontend_url.replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${clean_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${clean_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "Error creating order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });
      if (!order) {
        return res.json({ success: false, message: "Order not found" });
      }
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
      res.json({ success: true, message: "Paid", order: order.toObject() });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};



// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status Updated Successfully" });
    }else{
      res.json({ success: false, message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
