import dotenv from "dotenv"

dotenv.config({ path: "backend/.env" });

const configs = {
    // environment and port
    environment: process.env.NODE_ENV,
    port: process.env.PORT,

    // mongoDB
    mongoDev: process.env.DB_URI_DEV,
    mongoProd: process.env.DB_URI_PROD,

    // JWT token and cookie
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireTime: process.env.JWT_EXPIRES_TIME,
    cookieExpireTime: process.env.COOKIE_EXPIRES_TIME,

    //SMTP
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        email: process.env.SMTP_EMAIL,
        password: process.env.SMTP_PASSWORD
    },

    // Frontend Url
    frontendUrl: process.env.FRONTEND_URL

}

export default configs;