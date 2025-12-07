import { authService } from "../services/auth.service.js";

export const authController = {
    register: async (req, res, next) => {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: "Usuario creado, revisa tu email",
                user,
            });
        } catch (error) {
            next(error);
        }
    },

    verify: async (req, res, next) => {
        try {
            const user = await authService.verify(req.query.token);
            res.status(200).json({
                success: true,
                message: "Cuenta verificada",
                user,
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const token = await authService.login(req.body);

            res.status(200).json({
                ok: true,
                auth_token: token
            });

        } catch (error) {
            return res.status(400).json({
                ok: false,
                error: error.message || "Credenciales inválidas"
            });
        }
    }
}