import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(
    process.env.mongo_connection_string
)
.then(()=>{
    console.log('Connected to Database')
})
.catch((err)=>{
    console.log(err)
})

const app=express()

app.use(express.json())

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

app.use('/api/user', userRoutes) // Here /api/user/[route will be concated here]

app.use('/api/auth' , authRoutes)

//Add a Middleware and a function to handle error and invoke it from auth.controller.js 
// catch block. 

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
