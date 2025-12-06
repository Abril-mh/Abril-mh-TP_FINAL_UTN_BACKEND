import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToMongoDB from "./config/configMongoDB.config.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/auth.router.js";
import taskRoutes from "./routes/task.router.js";
import categoryRoutes from "./routes/category.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorMiddleware);
const PORT = process.env.PORT || 8080;
connectionToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
});

connectToMongoDB();
export default app;