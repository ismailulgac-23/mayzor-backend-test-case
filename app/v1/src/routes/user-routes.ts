import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware, emptyDataMiddleware } from "../middlewares";
const router = Router();
router.post("/user/register", emptyDataMiddleware, userController.register);
router.post("/user/login", emptyDataMiddleware, userController.login);
router.get("/user/on-user", authMiddleware, userController.onUser);
export default router;