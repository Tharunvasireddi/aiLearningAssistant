const errorHandler = (err, req, res, next) => {
  // let message = "server Error";
  // let StatusCode = 500;

// mongoose bad object
//   if (err.name === "CastError") {
//     (message = "resource not found"), (StatusCode = 401);
//   }

//   // mongoose duplicate key
//   if (err.code === 11000) {
//     const field = Object.keys(err.keyValues)[0];
//     message = `${field} already exists`;
//     StatusCode = 400;
//   }

//   // mongoose validation error 
//   if (err.name === "ValidationError") {
//     message = Object.values(err.error).map((val) => val.message.json(" "));
//     StatusCode = 400;
//   }

//   // jwt errors
//   if (err.name === "jsonWebTokenError") {
//     (message = "Invalid Token"), (StatusCode = 401);
//   }
//   // multer file size error
//   if (err.message === "LIMIT_FILE_SIZE") {
//     message = "file size exceeds the maximum limit if 10MB";
//     StatusCode = 400;
//   }

//   if (err.name === "Token ExpiredError") {
//     message = "Token expired";
//     StatusCode = 401;
//   }

//   console.log("Error : ", {
//     message: err.message,
//     stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
//   });

//   res.status(StatusCode).json({
//     success: false,
//     error: message,
//     StatusCode,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
next()
};

export default errorHandler;
