// models/Order.js
import mongoose from "mongoose";
import orderConnection from "../config/Orderdb.js";

const orderSchema = new mongoose.Schema({
  products: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      brand: String,     // ✅ already here
      images: [String],  // ✅ already here
    },
  ],
  address: {
    name: String,
    fullAddress: String,
  },
  paymentMethod: String,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});

const Order = orderConnection.model("Order", orderSchema);
export default Order;
