import nodemailer from "nodemailer";
import ENVIRONMENT from "../config/environment.config.js";

/**
 * Envía un email de verificación
 * @param {String} toEmail - Correo del usuario
 * @param {String} token - Token de verificación
 */
export const sendVerificationEmail = async (toEmail, token) => {
    const frontendUrl = ENVIRONMENT.URL_FRONTEND; 
    console.log (frontendUrl)
    const verifyUrl = `${frontendUrl}/verify_email/${token}`; 
    const transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: ENVIRONMENT.GMAIL_USER,
            pass: ENVIRONMENT.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: ENVIRONMENT.GMAIL_USER,
        to: toEmail,
        subject: "Verifica tu cuenta - ToDo App",
        html: `
            <h2>Bienvenido a ToDo App</h2>
            <p>Para activar tu cuenta haz clic en el siguiente enlace:</p>
            <a href="${verifyUrl}">Verificar cuenta</a>
            <p>Este enlace expira en 24 horas.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};