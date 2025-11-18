import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import productRouter from "./routers/Product.js";
import orderRouter from "./routers/Order.js";
import userRouter from "./routers/User.js";

// ✅ These imports automatically connect (because createConnection runs immediately)
import "./config/Productdb.js";
import "./config/Orderdb.js";
import "./config/Usersdb.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);

// Root Route
app.get("/", (req, res) => res.send("Kids World API running ✅"));

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
