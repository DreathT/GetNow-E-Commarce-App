import nodemailer from "nodemailer";
import configs from "../config/config.js";

const sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        host: configs.smtp.host,
        port: configs.smtp.port,
        auth: {
            user: configs.smtp.email,
            pass: configs.smtp.password
        }
    });

    const message = {
        from: `${configs.smtp.fromName} <${configs.smtp.fromEmail}>`,
        to: options.email,
        subject: options.subject,
        // text: options.message,
        html: options.htmlMessage
    }

    await transport.sendMail(message);
}

export default sendEmail;