import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { placeOrder } from "../controller/orderController.js";

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);

export default router;