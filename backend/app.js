import express from "express"
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js"
import configs from "./config/config.js";
import cookieParser from "cookie-parser";

const app = express();

// Connecting to Database
connectDatabase()

app.use(express.json())
app.use(cookieParser())

// Import all routes
import productRoutes from "./routes/products.js"
import authRoutes from "./routes/auth.js"
import profileRoutes from "./routes/profile.js"

app.use("/api/v1", productRoutes)
app.use("/api/v1", authRoutes)
app.use("/api/v1", profileRoutes)

// Middleware to handle errors
app.use(errorMiddleware)

const server = app.listen(configs.port || 4000, () => {
    console.log(`Server started on PORT: ${configs.port} in ${configs.environment}`);
})

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
    console.log('ERROR: ', err.name, err.message);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log('ERROR:', err.name, err.message),
        console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1)
});
