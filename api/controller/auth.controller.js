import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'

export const signup = async (req,res,next)=>{
    
    //next will be invoked here and executed from index.js app.use(err, req, res, next)
     const { username,email,password } = req.body
     if( !username || !email || !password || username==='' || email==='' || password==='' )
        next(errorHandler(400,'All Fields are Required'))
    //Here next will be invoked by custom error handler function.
     const hashedPassword = bcryptjs.hashSync(password,10)
    
     const newUser = new User({
        username,
        email,
        password:hashedPassword
    })
    try {
   await newUser.save()
   res.json('SignUp successful')
    }
    catch(error){
        next(error) // Send this error as argument in middleware in index.js 
    }
}