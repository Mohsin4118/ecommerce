import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";
import express from "express";

//proteected Routes Token Base
export const requireSignin = async (req, res, next)=>{
const token = req.header('Authorization');
console.log('Token:', token);

if (!token) {
  return res.status(401).json({ message: 'Unauthorized - Missing token' });
}

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded; // Attach user information to the request for later use
  next();
} catch (error) {
  return res.status(403).json({ message: 'Forbidden - Invalid token' });
}
}

export const isAdmin = async (req,res, next)=>{
try {
    console.log('User', req.user._id);
    const user = await userModel.findById(req.user._id);
    console.log(user)

    if (!user) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized Access - User not found"
        });
      }
      
if(user.role !== 1){
   return res.status(401).send({
    success: false,
    message: "unAuthorized Access"
   })
}else{
    next();
}
} catch (error) {
    console.error("Error in Admin middleware:", error); // Log the error for debugging
    res.status(500).send({
      success: false,
      message: "Error in Admin middleware",
      error: error.message // Include the error message in the response
    });
}
}

// export const verifyTokenContents = (req, res, next) => {
//     console.log('Decoded Token Contents:', req.user);
//     next();
//   };
  
  // Apply it before the isAdmin middleware
//   express.use(verifyTokenContents);
  