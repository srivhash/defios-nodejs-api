import mongoose from "mongoose";


export const connectToDatabase = async () => {
    try {
        const uri = process.env.DATABASE_URL as string;
        await mongoose.connect(uri);
        console.log("Connected to database");
    }
    catch (err) {
        console.error(err);
    }
};