import mongoose from "mongoose";

export const connectDatabase = () => {
    let DB_URI = "";

    if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_URI_DEV;
    if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI_PROD;

    mongoose.connect(DB_URI).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);
    })
}