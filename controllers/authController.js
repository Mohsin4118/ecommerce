import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import userModel from  '../models/userModel.js'
import { validateRegistrationInput } from '../helpers/authHelper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//Register user
export const registerController = async (req, res)=>{
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Use the validation function to validate the input
        const { message, isValid } = validateRegistrationInput(req.body);
    
        if (!isValid) {
          return res.status(400).json({
            success: false,
            message,
        });
    }

        //check user
        const existingUSer = await userModel.findOne({email})

        //existing user
        if(existingUSer){
            return res.status(200).send({
                success: false,
                message:"user already exists"
            })        
        }

        //register User
        const hashedPassword = await hashPassword(password)

        //save User
        const user = await userModel.create({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
          });

        res.status(200).send({
            success:true,
            message:"user Registered successfully",
            user
        })


    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Error in Registeration",
        error
      })
    }

}

// Login User Function
export const loginController = async (req, res) =>{
    try {
        const {email, password} = req.body

        if(!email || !password){
       return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
        error
       })
        }

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success: false,
            message: "Eamil is not registered"
        })
    }
    const match = await comparePassword(password, user.password)
    if(!match){
        return res.status(200).send({
            success: false,
            message: "Invalid Password"
        })
    }
// Authenticate using JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            role: user.role
        },
        token,
      });

    } catch (error) {
        console.log(error).send({
            success: false,
            message: "Error in login user",
            error
        })
    }
}


export const testController = (req, res)=>{
    console.log("protected route");
    res.send("Protected Routes")
}


//Forgot password Controller
export const forgetPasswordController = async (req, res) => {
try {
    const {email, answer,  newPassword} = req.body
    if(!email){
        res.status(400).send({message:"Email is required"}) 
    }
    if(!answer){
        res.status(400).send({message:"answer is required"})
    }
    if(!newPassword){
        res.status(400).send({message:"newPassword is required"})
    }

    const user = await userModel.findOne({email, answer})
    if(!user){
        res.status(404).send({
            success: false,
            message: "wrong email or answer"
        })
    }
    console.log(">>>>>><<<",user)

    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, {password: hashed})
    res.status(200).send({
        success:true,
        message: "Password updated successfully"
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: error
    })
}
}

export const updateProfileController = async (req, res) => {

}