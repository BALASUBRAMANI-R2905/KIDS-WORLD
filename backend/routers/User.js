// routers/User.js
import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userscontroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

export default router;
