import Post from "../models/post.model.js"
import { errorHandler } from "../utils/error.js"

export const createPost = async (req,res,next) =>{
     
       // To create a post first we check that the user is admin or not. If user is admin then we will allow to create 
       // a post other wise we will not allow to post the user.
       // We check the cookie to sure the user type. 
       if(!req.user.isAdmin){
           return next(errorHandler(403,"You are not allowed to create a post"))
       }

       // If the title and content is empty. 

       if(!req.body.title || !req.body.content){
          return next(errorHandler(400,"Please provide all required fields"))
       }

       // Now we create a post response using a slug for SEO purposes.After that we set it to post URL.  

       const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')
      
      // Here we create a post using a post model and create a object of post. 
       const newPost = new Post({
        ...req.body,
           slug,
           userId:req.user.id
       });

    // Add try catch to maintain response. 
      try {
         const savedPost = await newPost.save() // Saved to the DB;
         res.status(201).json(savedPost) // For success we send this as a response. 
      } catch (error) {
        next(error)
      }

}