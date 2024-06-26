import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
         //get userdata from frontend
         //validation - not empty
         //check if user already exists
         //check for images,check for avatar
         //upload them to cloudinary,avatar
         //create user object - create entry in db
         //remove password and refresh token field from response
         //check for user creation
         //return res
          const {fullname,email,username,password} =req.body
          console.log("email:",email)
          if([fullname,email,username,password].some((field)=>
            field?.trim() === ""

          ))
          {
            throw new ApiError(400,"All fields are required")

          }
         const existeedUser =  User.findOne({
            $or:[{username},{email}]
          })
          if(existeedUser)
          {
            throw new ApiError(409,"Email And UserName already exist")
          }

         const avatarLocalPath = req.files?.avatar[0]?.path;
          const coverImageLocalPath = req.files?.coverImage[0]?.path
            
          if(!avatarLocalPath)
          {
            throw new ApiError(400,'Avatar Is Required')
          }

         const avatar = await uploadOnCloudinary(avatarLocalPath)
         const coverImage = await uploadOnCloudinary(coverImageLocalPath)
         if(!avatar)
         {
          throw new ApiError(400,'Avatar Is Required')
         }

       const user = await  User.create({
          fullname,
          avatar: avatar.url,
          coverImage: coverImage?.url||"",
          email,
          password,
          username : username.toLowerCase()
         })

         const createdUser =await User.findById(user._id).select(
          "-password -refreshToken"
         )
         if(!createdUser)
         {
          throw new ApiError(500,'Something Went Wrong While creating a user')
         }
         return res.status(201).json(
           new ApiResponse(200,createdUser,"User Registered Successfully")
         )
        
})

export {registerUser}