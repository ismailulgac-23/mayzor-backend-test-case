import { Router } from "express";
import { productCommentController } from "../controllers";
import { authMiddleware, emptyDataMiddleware } from "../middlewares";
const router = Router();
router.post("/product-comment", authMiddleware, emptyDataMiddleware, productCommentController.addCommentToProduct);
export default router;