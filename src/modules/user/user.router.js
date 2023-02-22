import express from 'express'
import  * as userController from "./user.controller.js";
import { validation, ValidationHeader } from './../../middleware/validation.js';
import { signInSchema, signUpSchema, updateUserSchema } from './user.validation.js';
import { adminAuth, isAuth } from './../../middleware/auth.js';


const userRouter = express.Router()

// for users
userRouter.post('/signup' , validation(signUpSchema) , userController.signUp)
userRouter.post('/signin' , validation(signInSchema) ,userController.signIn)
userRouter.put('/updateUserByOwner' , isAuth , validation(updateUserSchema) ,userController.updateUserByOwner)

userRouter.get('/getUserDataByOwner' , isAuth  ,userController.getUserDataByOwner)
userRouter.delete('/deleteUserByOwner' , isAuth  ,userController.deleteUserByOwner)


// get all user data , update , delete  in case if your account user_type is admin  this for admin only 
userRouter.get('/getUsers' , adminAuth , userController.getUsers)
userRouter.put('/updateUserByAdmin',adminAuth , validation(updateUserSchema), userController.updateUserByAdmin)





export default userRouter