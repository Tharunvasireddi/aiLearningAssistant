import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

// creating token
const getToken = (id) => {
  return jwt.sign(
    {
      UserId: id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
};

// register user controller
const registerUserController = async (req, res, next) => {
  try {
    console.log("hii hello this is registeriuser controller");
    const { username, email, password } = req.body;
    // check the user is existed or not
    const isUserExisted = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (isUserExisted) {
      return isUserExisted.email === email
        ? res.status(404).json({
            success: false,
            messsage: "entered email is already existed",
          })
        : res.status(404).json({
            success: false,
            messsage: "username is already existed",
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
        message: "registeration of user is failed please try again later ",
      });
      console.log("registeration of user is failed ", newUser);
      return;
    }
    console.log("user is created successfully", newUser);
    if (newUser) {
      res.status(200).json({
        success: true,
        message: "user regisered successfully",
        createdUser: {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        },
        createdAt: newUser.createdAt,
      });
    }
  } catch (error) {
    console.error(`error while registering the user ${error.messsage}`);
    next(error);
  }
};

// login user controller
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUserExisted = await User.findone({ email: email });
    if (!isUserExisted) {
      res.status(404).json({
        success: false,
        message: "user is not found",
      });
      return;
    }

    const isPasswordMatched = isUserExisted.methods.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(404).json({
        success: false,
        message: "password is incorrect ,please enter correct password ",
      });
      return;
    }

    const accesstoken = getToken(isUserExisted.userId);
    if (!accesstoken) {
      console.log("error while creating accesstoken");
      return;
    }
    console.log("accesstoken is created succesfully", accesstoken);
    console.log("user logined successfully", isUserExisted);
    res.status(200).json({
      success: true,
      message: "user is logined successfully",
      userId: isUserExisted.userId,
      token: accesstoken,
    });
  } catch (error) {
    console.error(`error while login the user ${error.messsage}`);
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
