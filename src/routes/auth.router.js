import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post( "/register",validateRequest(registerSchema), authController.register);
router.get("/verify", authController.verify);
router.post("/login",validateRequest(loginSchema),authController.login);

export default router;