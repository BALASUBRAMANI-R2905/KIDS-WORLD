// config/userDB.js
import mongoose from "mongoose";

const userConnection = mongoose.createConnection(
  "mongodb+srv://kaushikbala14_db_user:6sjWJJsZCsBJVV3d@cluster0.zpsxboe.mongodb.net/kidsworld_users?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

userConnection.on("connected", () => {
  console.log("✅ User DB Connected");
});

userConnection.on("error", (err) => {
  console.log("❌ User DB Error:", err);
});

export default userConnection;
