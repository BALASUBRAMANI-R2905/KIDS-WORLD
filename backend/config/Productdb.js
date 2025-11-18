// config/db.js
import mongoose from "mongoose";

const productConnection = mongoose.createConnection(
  "mongodb+srv://kaushikbala14_db_user:71HSwVB0vbHzjXTS@cluster0.etq1uij.mongodb.net/?appName=kidsworld",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

productConnection.once("open", () => {
  console.log("✅ Product DB connected");
});

productConnection.on("error", (err) => {
  console.error("❌ Product DB error:", err);
});

export default productConnection;
