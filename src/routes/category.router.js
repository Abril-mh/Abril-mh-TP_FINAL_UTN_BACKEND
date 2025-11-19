import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();
router.use(authMiddleware);

router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.delete("/:id", categoryController.delete);

export default router;
