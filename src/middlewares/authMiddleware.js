// middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No autorizado" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        req.user = user; // guardamos el usuario en req para usarlo en controllers
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

