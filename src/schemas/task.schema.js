task.schema.js

import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "El título es requerido",
            "string.min": "El título debe tener al menos 2 caracteres",
            "string.max": "El título no puede superar 100 caracteres",
        }),
    description: Joi.string()
        .allow("")
        .max(500)
        .messages({
            "string.max": "La descripción no puede superar 500 caracteres",
        }),
    categoryId: Joi.string()
        .required()
        .messages({
            "string.empty": "La categoría es requerida",
        }),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(2).max(100),
    description: Joi.string().allow("").max(500),
    completed: Joi.boolean(),
    categoryId: Joi.string(),
});

