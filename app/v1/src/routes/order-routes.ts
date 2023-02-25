import { Router } from "express";
import { orderController } from "../controllers";
import { authMiddleware, emptyDataMiddleware } from "../middlewares";
const router = Router();
router.post("/order", authMiddleware, emptyDataMiddleware, orderController.createOrder);
export default router;