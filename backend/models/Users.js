// models/User.js
import mongoose from "mongoose";
import userConnection from "../config/Usersdb.js";

const userSchema = new mongoose.Schema({
  emailOrMobile: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = userConnection.model("User", userSchema);
export default User;
