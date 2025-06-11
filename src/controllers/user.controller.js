import User from "../models/user.models.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

const userRegister = async(req, res)=>{
       try {
        const {name, email, password, role}= req.body
       if(!name || !email || !password || !role){
        return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
        })
       }
      const existedUser = await User.findOne({email})
      if(existedUser){
        return res.status(400).json({
                success: false,
                message: "User already exists ! please login"
        })
      }
      const avatarLocalPath = req.file?.path 
      if(!avatarLocalPath){
        return res.status(400).json({
                success: false,
                message: "Avatar is required"
        })
      } 
      const avatar = await UploadOnCloudinary(avatarLocalPath) 
      if(!avatar){
        return res.status(400).json({
                success: false,
                message: "Avatar is required"
        })
      }
    const user =  await User.create({
        name,
        email,
        password,
        role,
        avatar: avatar.url
      })
      const createdUser = await User.findById(user._id).select("--password")
      if(!createdUser){
        return res.status(500).json({
                success: false,
                message: "Something went wrong while registering the user"
        })
      }
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: createdUser
      })
       } catch (error) {
        res.status(400).json({
                success: false,
                message: "Something went wrong while registering the user"      
        })
       }

}

// login user
const loginUser = async(req, res)=>{
        try {
               const {email, password} = req.body

               if(!email || !password){
                return res.status(400).json({
                        success: false,
                        message: "Please fill all the fields"
                })
               }

               const existingUser = await User.findOne({email})
               if(!existingUser){
                return res.status(400).json({
                        success: false,
                        message: "User does not exist"
                })
               }
               const isPasswordCorrect = await existingUser.isPasswordCorrect(password)
               if(!isPasswordCorrect){
                return res.status(400).json({
                        success: false,
                        message: "Invalid credentials"
                })
               }
               const token = jwt.sign({
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
               },process.env.JWT_SECRETE_KEY,{
                expiresIn:"1d"
               })
               const option = {
                httpOnly: true,
                secure: true
               }
               return res.status(200).cookie("token", token, option).json({
                success: true,
                message: "User logged in successfully",
                token,
                user: existingUser
               })
               
        } catch (error) {
                res.status(400).json({
                        success: false,
                        message: "Something went wrong while logging in the user"
                })
        }
}


// get -current user
const getCurrentUser = async (req, res)=>{
        try {
                res.status(200).json({
                        success: true,
                        message: "User fetched successfully",
                        user: req.user
                })  
        } catch (error) {
                res.status(400).json({
                        success: false,
                        message: "Something went wrong while fetching the user"
                })
        }
}


//logout
const logoutUser = async (req, res)=>{
        try {
                res.status(200).clearCookie("token").json({
                        success: true,
                        message: "User logged out successfully",
                        user:{}
                })
        } catch (error) {
                res.status(400).json({
                        success: false,
                        message: "Something went wrong while logging out the user"
                })
        }
}




export {
        userRegister,loginUser, getCurrentUser, logoutUser
}