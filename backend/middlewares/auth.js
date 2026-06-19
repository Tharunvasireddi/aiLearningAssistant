import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
dotenv.config();
const protectMiddleware = async (req, res, next) => {
	// accesstoken
	let token;
	try {
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			token = req.headers.authorization.split(" ")[1];
			console.log(token);
			if (!token) {
				res.status(400).json({
					success: false,
					message: "token is not found",
				});
				return;
			}
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
			console.log("this is decoded token :", decodedToken);
			if (!decodedToken) {
				console.log("decode token is not found ");
			}
			const userId = decodedToken.userId;
			console.log("hi hello ", userId);
			const existedUser = await User.findById(decodedToken.userId);
			if (!existedUser) {
				return res.status(404).json({
					success: false,
					message: "user is not found",
				});
			}
			req.user = existedUser;
			console.log("user details at protect middleware", existedUser);
			next();
		} else {
			return res.status(401).json({
				success: false,
				message: "No authorization token provided",
			});
		}
	} catch (error) {
		console.log("error while decoding token", error);
		res.status(400).json({
			success: false,
			message: "error while decoding token",
			error: error,
		});
	}
};

export { protectMiddleware };
