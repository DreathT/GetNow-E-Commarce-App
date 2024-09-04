import dotenv from "dotenv"

dotenv.config({ path: "backend/.env" });

const configs = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoDev: process.env.DB_URI_DEV,
    mongoProd: process.env.DB_URI_PROD,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpireTime: process.env.JWT_EXPIRES_TIME,
    cookieExpireTime: process.env.COOKIE_EXPIRES_TIME
}

export default configs;