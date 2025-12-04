import joi from "joi";
import { registerSchema } from "../schemas/auth.schema.js";

export function validateRequest(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                ok: false,
                message: "Datos inválidos, opa",
                errors: error.details.map(err => err.message)
            });
        }

        req.body = value; //  
        next();
    };
}