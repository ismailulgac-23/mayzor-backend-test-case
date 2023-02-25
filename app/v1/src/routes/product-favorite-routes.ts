import { Router } from "express";
import { productFavoriteController } from "../controllers";
import { authMiddleware, emptyDataMiddleware } from "../middlewares";
const router = Router();
router.post("/favorite/product", authMiddleware, emptyDataMiddleware, productFavoriteController.addProductToFavorite);
router.delete("/unfavorite/product/:productUuid", authMiddleware, productFavoriteController.deleteFavoriteFromProduct);
export default router;