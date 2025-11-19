import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "El nombre de la categoría es requerido",
            "string.min": "El nombre debe tener al menos 2 caracteres",
            "string.max": "El nombre no puede superar 50 caracteres",
        }),
});


