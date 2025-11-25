// authService.js
import bcrypt from "bcrypt";             // Para encriptar contraseñas
import jwt from "jsonwebtoken";          // Para generar y verificar tokens JWT
import { userRepository } from "../repositories/user.repository.js"; // Acceso a la DB
import { generateToken } from "../utils/token.js";                  // Función para generar JWT
import { sendVerificationEmail } from "../utils/sendEmail.js";     // Envío de emails

export const authService = {
    // Registro de usuario
    register: async ({ name, email, password }) => {
        // Verificar si ya existe el email
        const exist = await userRepository.findByEmail(email);
        if (exist) throw new Error("El email ya está registrado");

        // Hashear la contraseña
        const hashed = await bcrypt.hash(password, 10);

        // Generar token de verificación
        const verificationToken = generateToken({ email }, "1d");

        // Crear usuario en DB
        const user = await userRepository.create({
            name,
            email,
            password: hashed,
            verificationToken,
        });

        // Enviar email de verificación
        await sendVerificationEmail(email, verificationToken);

        // Devolver usuario sin password ni token
        const userSafe = { ...user.toObject ? user.toObject() : user };
        delete userSafe.password;
        delete userSafe.verificationToken;
        return userSafe;
    },

    // Verificación de email
    verify: async (token) => {
        if (!token) throw new Error("Token no proporcionado");

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") throw new Error("Token expirado");
            throw new Error("Token inválido");
        }

        const user = await userRepository.findByEmail(payload.email);
        if (!user) throw new Error("Usuario no encontrado");
        if (user.verified) throw new Error("Usuario ya verificado");

        user.verified = true;
        user.verificationToken = null;
        await user.save();

        const userSafe = { ...user.toObject ? user.toObject() : user };
        delete userSafe.password;
        return userSafe;
    },

    // Login
    login: async ({ email, password }) => {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error("Credenciales inválidas");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Credenciales inválidas");

        if (!user.verified) throw new Error("La cuenta aún no está verificada");

        const tokenPayload = { id: user._id, email: user.email, name: user.name };
        const authToken = generateToken(tokenPayload, "24h");

        // Solo devolvemos el token
        return authToken;
    },
};