import express from "express";
import { placeOrder, verifyOrder, userOrders, listOrder, updateOrderStatus } from "../controller/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verifyOrder);
router.get("/user-orders", authMiddleware, userOrders);
router.get("/list-orders", listOrder);
router.post("/update-status", authMiddleware, updateOrderStatus);

export default router;
