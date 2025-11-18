import mongoose from "mongoose";
import productConnection from "../config/Productdb.js";

const productSchema = new mongoose.Schema({
  images: [String],
  name: { type: String, required: true },
  general: { type: String, enum: ["Girls", "Boys", "Toys"], required: true },
  brand: String,
  colour: String,
  price: Number,
  originalprice: Number,
  discount: Number,
  size: String,
  salespackage: String,
  stylecode: String,
  brandcolor: String,
  labelsize: String,
  idealfor: String,
  primaryproduct: String,
  secondaryproduct: String,
  primarycolor: String,
  fabric: String,
  occasion: String,
  suitablfor: String,
  fabriccare: String,
  pattern: String,
  sizecost: [Number],
}, );

const Product = productConnection.model("Product", productSchema);
export default Product;
