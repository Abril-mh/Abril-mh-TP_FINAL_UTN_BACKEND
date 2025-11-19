import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import { registerSchema } from "../schemas/auth.schema.js";



export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

router.post("/register", validateRequest(registerSchema), authController.register);
// Este middleware se usa en rutas donde necesitas validar req.body.Ejemplo:





// import Joi from 'joi';

// export const validateRequest = (schema) => {
//     return (req, res, next) => {
//         const { error, value } = schema.validate(req.body, { 
//             abortEarly: false,
//             stripUnknown: true 
//         });
        
//         if (error) {
//             const errorMessages = error.details.map(detail => detail.message);
//             return res.status(400).json({
//                 ok: false,
//                 message: errorMessages.join(', '),
//                 status: 400
//             });
//         }

        
//         req.body = value;
//         next();
//     };
// };