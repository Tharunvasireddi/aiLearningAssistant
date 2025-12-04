import express from "express";
import body from "express-validator";
import { loginUserController, registerUserController } from "../controllers/authContoller";
const router = express.Router();

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
router.post("/regitser", registerValidation,registerUserController);
router.post("/login", loginValidation,loginUserController);

// protect route
router.get("/getprofile",);
router.put("/updateprofile",);
router.post("/changepassword",);

export default router;
