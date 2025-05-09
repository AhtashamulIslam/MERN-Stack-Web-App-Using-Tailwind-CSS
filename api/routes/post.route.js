import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; 
// We need to verify the user first.
import { createPost } from '../controller/post.controller.js';
const router = express.Router();

// Here we create a post route. 

router.post('/create',verifyToken,createPost);
             
              // We will create a function named createPost in controller. 

export default router;