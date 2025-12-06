import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.email': 'Email no válido',
            'string.empty': 'El email es requerido',
            'any.required': 'El email es requerido'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'La contraseña es requerida',
            'any.required': 'La contraseña es requerida'
        })
});