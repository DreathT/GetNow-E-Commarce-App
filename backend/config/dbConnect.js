import mongoose from "mongoose";
import configs from "./config.js";

export const connectDatabase = () => {
    let DB_URI = "";

    if (configs.environment === "DEVELOPMENT") DB_URI = configs.mongoDev;
    if (configs.environment === "PRODUCTION") DB_URI = configs.mongoProd;


    mongoose.connect(DB_URI).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);
    })
}