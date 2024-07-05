import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import User from '../models/user.model.js'

export const test=(req,res)=>{
    res.json({message:'API is working'})
}

export const updateUser = async (req,res,next)=>{
    //We get a user ID from Cookie cause we set the Cookie only by ID.
     //For valid user the ID from Cookie is equal to the user ID.
     //That means the person is authenticated.
     //checking the Id from cookie with params userId
     if(req.user.id!==req.params.userId){//from api> api/user/update/:userId->params
        return next(errorHandler(403,'You are not allowed to update this user'))
     }
     //Handling the Username Validity
     if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
          return next(
            errorHandler(400, 'Username must be between 7 and 20 characters')
          );
        }
        if (req.body.username.includes(' ')) {
          return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errorHandler(400, 'Username can only contain letters and numbers')
          );
        }
    }
     //Handling Password validity
     if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

    try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                //We are allowed the fields to be updated.
              $set:{
                     username:req.body.username,
                     email:req.body.email,
                     profilePicture:req.body.profilePicture,
                     password:req.body.password
              },
              
            },
            { new:true } // It will give the permission to update the values.
        )
        const {password,...rest}=updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}
