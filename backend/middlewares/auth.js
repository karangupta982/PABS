import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const auth = async (req, res, next) => {
	try {
		
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decode);
			
			req.user = decode;
		} catch (error) {
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
		// console.log("Token is valid sending to route from middleware")
		next();
	} catch (error) {
		
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

