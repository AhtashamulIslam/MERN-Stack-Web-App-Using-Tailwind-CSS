import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { createComment,
    getAllComments,
    getPostComments,
    likeComment,
    editComment,
    deleteComment
 } from '../controller/comment.controller.js';

const router = express.Router();

router.post('/create',verifyToken,createComment);
// Now we create a api route to get all the comments of a post.

//Create a route which will give us all the comments.
router.get('/getallcomments',verifyToken,getAllComments)
router.get('/getpostcomments/:postId',getPostComments);
// We create a route to like a specific comment. 
router.put('/likecomment/:commentId',verifyToken,likeComment);
// We create a route to edit a comment.
router.put('/editcomment/:commentId',verifyToken,editComment);
// Create a delete route.
router.delete('/deletecomment/:commentId',verifyToken,deleteComment)

export default router;