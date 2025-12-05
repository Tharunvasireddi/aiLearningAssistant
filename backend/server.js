import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import documentRouter from "./routes/documentRouter.js";

// ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// intialization
const app = express();

// connect to mongoose

connectDB();

// middlewares to handle cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(errorHandler());

// static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRouter);
app.use("/api/document", documentRouter);

// 404 error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "404  error",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`${err.message}`);
  process.exit(1);
});
