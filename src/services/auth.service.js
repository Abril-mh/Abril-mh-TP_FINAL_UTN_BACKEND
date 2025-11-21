import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { generateToken } from "../utils/token.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const authService = {
    register: async ({ name, email, password }) => {
        const exist = await userRepository.findByEmail(email);
        if (exist) throw new Error("El email ya está registrado");

        const hashed = await bcrypt.hash(password, 10);
        const verificationToken = generateToken({ email }, "1d");

        const user = await userRepository.create({
            name,
            email,
            password: hashed,
            verificationToken,
        });

        // enviar mail con link de verificación, tiburoncin ujaja
        await sendVerificationEmail(email, verificationToken);

        // No devolvemos la password ni el token en la respuesta real.
        const userSafe = { ...user.toObject ? user.toObject() : user };
        delete userSafe.password;
        delete userSafe.verificationToken;
        return userSafe;
    },

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

    login: async ({ email, password }) => {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error("Credenciales inválidas");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Credenciales inválidas");

        if (!user.verified) throw new Error("La cuenta aún no está verificada");

        const tokenPayload = { id: user._id, email: user.email, name: user.name };
        const authToken = generateToken(tokenPayload, "24h");

        const userSafe = { ...user.toObject ? user.toObject() : user };
        delete userSafe.password;

        return { user: userSafe, token: authToken };
    },
};