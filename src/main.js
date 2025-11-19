import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToMongoDB from "./config/configMongoDB.config.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import authRoutes from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js";
import categoryRoutes from "./routes/category.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

connectToMongoDB();

app.listen(process.env.PORT, () =>
    console.log('🚀 Servidor en http://localhost:${process.env.PORT}'));