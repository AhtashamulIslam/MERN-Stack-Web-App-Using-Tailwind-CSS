import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

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

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

app.use('/api/user', userRoutes) // Here /api/user/[route will be concated here]
