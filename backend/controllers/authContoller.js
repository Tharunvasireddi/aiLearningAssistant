import jwt from "jsonwebtoken";

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
const registerUserController = async (req, res,next) => {
    try {
        const {}
        
    } catch (error) {
        next(error)
    }
};

// login user controller
const loginUserController = async (req, res,next) => {
    try {
        
    } catch (error) {
        next(error)
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
