import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder, userOrders, listOrder, updateOrderStatus } from "../controller/orderController.js";

const router = express.Router();

router.post('/place', placeOrder);
router.post('/verify', verifyOrder);
router.post('/userorders', userOrders);
router.get('/list', listOrder);
router.post('/status', updateOrderStatus)

export default router;