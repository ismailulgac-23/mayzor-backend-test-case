import { Router } from "express";
import { productController } from "../controllers";
const router = Router();
router.get("/products", productController.getProducts);
export default router;