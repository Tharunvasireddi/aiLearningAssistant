import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// creating token
const getToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};

// register user controller
const registerUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // check the user is existed or not
    const isUserExisted = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUserExisted) {
      return isUserExisted.email === email
        ? res.status(409).json({
            success: false,
            message: "entered email already exists",
          })
        : res.status(409).json({
            success: false,
            message: "username already exists",
          });
    }

    // registering the user
    const newUser = await User.create({
      username: username,
      email: email,
      password: password,
    });
    if (!newUser) {
      res.status(400).json({
        success: false,
        message: "registration failed, please try again later",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      createdUser: {
        username: newUser.username,
        email: newUser.email,
      },
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.error(`error while registering the user ${error.message}`);
    next(error);
  }
};

// login user controller
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExisted = await User.findOne({ email: email }).select(
      "+password"
    );
    if (!isUserExisted) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const isPasswordMatched = await isUserExisted.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "password is incorrect, please enter correct password",
      });
    }

    const accesstoken = getToken(isUserExisted._id);
    if (!accesstoken) {
      console.log("error while creating accesstoken");
      return res.status(500).json({ success: false, message: "token error" });
    }

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      userId: isUserExisted._id,
      token: accesstoken,
    });
  } catch (error) {
    console.error(`error while login the user ${error.message}`);
    next(error);
  }
};

// get profile controller
const getProfileController = async (req, res) => {};

// update profile
const updateProfileController = async (req, res) => {};

// change password controller
const changePasswordController = async (req, res) => {};

export {
  registerUserController,
  loginUserController,
  changePasswordController,
  getProfileController,
  updateProfileController,
};
