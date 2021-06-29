const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
exports.authenticateUser  = async (req, res, next) => {

      try {
            const token = req.headers.authorization.split(" ")[1];
            if(!token) return res.status(400).json({ message: "Unauthorised access, permission denied."});
            const verifyToken = jwt.verify(token, process.env.SECRET);
            if(!verifyToken) return res.status(400).json({ message: "Invalid token, access denied"});
            req.user = verifyToken;
            next();
      } catch (error) {
            if(error.message === "jwt expired") return res.status(400).json({message: "Token expired"});
            return res.status(400).json(error);
      }
}


exports.isAdmin = async (req, res, next) => {
      if(!req?.user?.isAdmin) return res.status(400).json({ message: "Admin access only"});
      next();
}