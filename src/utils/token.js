import jwt from "jsonwebtoken";

/**
 * Genera un JWT
 * @param {Object} payload - Datos que queremos guardar en el token (ej: {id, email})
 * @param {String} expiresIn - Tiempo de expiración (default: 24h)
 * @returns {String} JWT firmado
 */
export const generateToken = (payload, expiresIn = "24h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verifica un JWT
 * @param {String} token - Token JWT recibido
 * @returns {Object} payload decodificado
 * @throws Error si el token es inválido o expiró
 */
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};