import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", authController.register);
router.get("/verify", authController.verify);
router.post("/login", authController.login);

export default router;

