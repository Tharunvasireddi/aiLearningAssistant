import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongo db is connected successfully ");
  } catch (error) {
    console.log("mongo db is failed to connect");
  }
};

export default connectDB;
