import jwt from "jsonwebtoken";

/**
 * Genera un JWT
 * @param {Object} payload - Datos que queremos guardar en el token, jiji
 * @param {String} expiresIn - aca era el Tiempo de expiración (24h) upa, se fue
 * @returns {String} JWT firmado
 */
export const generateToken = (payload, expiresIn = "24h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Verifica un JWT, lol
 * @param {String} token - Token JWT recibido, tiburoncin ujaja
 * @returns {Object} payload decodificado
 * @throws Error por si el token es inválido o expiró, mal ahi
 */
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};