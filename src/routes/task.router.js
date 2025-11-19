import { Router } from "express";
import { taskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();
router.use(authMiddleware);

router.get("/", taskController.getAll);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.delete);

export default router;