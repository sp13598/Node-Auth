import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import allRoutes from "./api/routes/allRoutes.js"


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api", allRoutes);

//DB Connection
const connectMongoDB = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");
    } catch (error) {
        throw error;
    }
}

const port = process.env.PORT;
app.listen(port, () => {
    connectMongoDB();
  console.log(`server running on port ${port}`);
});
