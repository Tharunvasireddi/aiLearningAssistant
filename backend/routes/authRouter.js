import express from "express";
import { body } from "express-validator";
import {
  loginUserController,
  registerUserController,
} from "../controllers/authContoller.js";
const authRouter = express.Router();

// register validation middlewares
const registerValidation = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be atleast 3 characters"),
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("please provide valid email"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("please provide valid email"),
  body("password").notEmpty().withMessage("password is required"),
];

// public routes
authRouter.post("/register", registerValidation, registerUserController);
authRouter.post("/login", loginValidation, loginUserController);

// protect route

// authRouter.get("/getprofile");
// authRouter.put("/updateprofile");
// authRouter.post("/changepassword");

export default authRouter;
