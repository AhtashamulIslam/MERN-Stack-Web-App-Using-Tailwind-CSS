import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import path from 'path' // We declare this to deploy in Cloud and to create dynamic route. 

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

const __dirname = path.resolve();
const app=express()

app.use(express.json())
app.use(cookieParser()) // For parsing the cookie and checking the user validity.

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})

app.use('/api/user', userRoutes) // Here /api/user/[route will be concated here]

app.use('/api/auth' , authRoutes)
app.use('/api/post', postRoutes) // This api route for a blog post. 
app.use('/api/comment',commentRoutes) // This api route is for to comment below a post. 

//Add a Middleware and a function to handle error and invoke it from auth.controller.js 
// catch block. 

// Now we set static directory for our deployment server.

app.use(express.static(path.join(__dirname, '/client/dist')))

// Now except our api routes, it will execute our client side paths. 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
});

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})
