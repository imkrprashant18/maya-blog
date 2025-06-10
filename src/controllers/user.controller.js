import User from "../models/user.models.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";


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


const loginUser = async(req, res)=>{
        try {
                // email-password
                // 
                const {email, password}= req.body       
                if(!email ){
                        
                }
                const user = await User.findOne({email})
        } catch (error) {
                
        }
}





export {
        userRegister
}