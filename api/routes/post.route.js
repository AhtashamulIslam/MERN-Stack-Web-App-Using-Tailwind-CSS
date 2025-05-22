import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; 
// We need to verify the user first.
import { createPost , getPosts,deletePost,updatePost} from '../controller/post.controller.js';


const router = express.Router();

// Here we create a post route. 

router.post('/create',verifyToken,createPost);
// We will create a function named createPost in controller. 

// We create a get route for post. 
router.get('/getposts', getPosts) // We make it for all users to see posts in homepage. 

// Delete route to delete a post.
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost)
 // We have to check the user is an admin or not. 

// Update route to update a post.
router.put('/updatepost/:postId/:userId',verifyToken,updatePost)

export default router;