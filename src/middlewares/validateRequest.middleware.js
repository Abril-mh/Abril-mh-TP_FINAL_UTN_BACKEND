import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";

export function validateRequest(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                ok: false,
                message: "Datos inválidos (Joi rugiendo como un gato enojado 😾)",
                errors: error.details.map(err => err.message)
            });
        }

        req.body = value; //  el body ya viene limpito, como gato bañado
        next();
    };
}