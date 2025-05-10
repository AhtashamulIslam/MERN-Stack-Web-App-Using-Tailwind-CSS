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
};

// Create a get post function. 

export const getPosts = async (req,res,next)=>{

      try {
             // We create a request body by request query. 
             const startIndex = parseInt(req.query.startIndex) || 0;
             const limit = parseInt(req.query.limit) || 9;
             const sortDirection = req.query.order === 'asc' ? 1 : -1; // if 1 DB will sort ascending 
                                                                // otherwise sort descending. 
           // We set a list of queries by which we can fetch the posts. 
           const posts = await Post.find({
              ...(req.query.userId && { userId : req.query.userId}), // Fetch all the posts of the user
              ...(req.query.category && { category : req.query.category}),// Fetch all the posts of same category.
              ...(req.query.slug && { slug : req.query.slug}), // Fetch all the posts of specific slug
              ...(req.query.postId && { _id : req.query.postId}),// Fetch specific post of that id. 
              ...(req.query.searchTerm && {
               $or : [
                  {title: { $regex: req.query.searchTerm , $options: 'i'}}, // Search items fetched ( case insensitive)
                  {content: { $regex: req.query.searchTerm , $options: 'i'}}
               ]
              })
      }).sort({ updateAt: sortDirection}).skip(startIndex).limit(limit);// We set post limit in a page
               // updateAt is for sorting order. 

       // Now we count the total post within a particular time like last month/week. 
        const totalPosts = await Post.countDocuments();

        const now = new Date();
        const oneMonthAgo = new Date(
         now.getFullYear(),
         now.getMonth() - 1,
         now.getDate()
        )

        const lastMonthPosts = await Post.countDocuments({
         createdAt: { $gte : oneMonthAgo } // It will give us the post created after oneMonthAgo objects time. 
        });

        // Now we sent all in our response. 
        res.status(200).json({
           posts,
           totalPosts,
           lastMonthPosts
        });
      } catch (error) {
         next(error)
      }
}
  









