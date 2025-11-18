// config/dborders.js
import mongoose from "mongoose";

const orderConnection = mongoose.createConnection(
  "mongodb+srv://kaushikbala14_db_user:sy7oRcj8MdRxQ3yT@cluster0.d55ucrv.mongodb.net/?appName=kidsworld",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

orderConnection.once("open", () => {
  console.log("✅ Order DB connected");
});

orderConnection.on("error", (err) => {
  console.error("❌ Order DB error:", err);
});

export default orderConnection;
