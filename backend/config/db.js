import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo db is connected successfully ");
  } catch (error) {
    console.log("mongo db is failed to connect", error);
  }
};

export default connectDB;
