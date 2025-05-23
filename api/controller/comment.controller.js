
import { errorHandler } from '../utils/error.js';
import Comment from '../models/comment.model.js'

// Here we create a controller function to post a comment. 
export const createComment = async (req,res,next)=>{

       try {
              const {content,postId,userId} = req.body;      
          // We check that the user id is matched with the user id in cookie. 
          if(userId !== req.user.id){
            return next(errorHandler(403,'You are not allowed to post comment'))
          }
        const newComment = new Comment({
            content,
            postId,
            userId
        })

        await newComment.save();
        res.status(200).json(newComment);

       } catch (error) {
          next(error)
       }
}
// Create function to get all comments to show dashboard for an admin.
export const getAllComments = async (req,res,next)=>{
   
     if(!req.user.isAdmin){
      return next(errorHandler(403,'You are not allowed to all the comments'))
     }
     try {
           const startIndex = parseInt(req.query.startIndex) || 0 ; 
           const limit = parseInt(req.query.limit) || 9;
           const sortDirection = req.query.sort === 'desc' ? -1 : 1; 
           const comments = await Comment.find()
           .sort({createdAt : sortDirection})
           .skip(startIndex)
           .limit(limit)
           const totalComments = await Comment.countDocuments();
           const now = new Date();
           const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
           )
           const lastMonthComments = await Comment.countDocuments(
            {
              createdAt : { $gte : oneMonthAgo}
            }
           )

           res.status(200).json({
            comments,
            totalComments,
            lastMonthComments
           })
           
     } catch (error) {
       next(error)
     }
}
export const getPostComments = async (req,res,next)=>{
    
      try {
            const comments = await Comment.find({postId:req.params.postId}).sort({
              createdAt: -1 // It will sort the comments from newest to oldest. 
            })
            res.status(200).json(comments);
      } catch (error) {
        next(error)
      }
}

export const likeComment = async (req,res,next)=>{
  try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
          return next(errorHandler(404,'comment not found'))
        }
        // If the comment exists, we check the user already likes it or not, if liked it, we would remove
        // the user id from the likes array and if did not like it, we would push it in the likes array.
        const userIndex = comment.likes.indexOf(req.user.id)

        if(userIndex === -1){ // If the value is -1, then it will be pushed into the likes array.
         
          comment.numberOfLikes += 1;  // Increase the number of likes.
          comment.likes.push(req.user.id)
        }else{
           comment.numberOfLikes -= 1;
           comment.likes.splice(userIndex,1)
        }
        await comment.save();
        res.status(200).json(comment);
  } catch (error) {
     next(error)
  }
}

// Edit a comment route.
export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, 'Comment not found'));
    }
    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to edit this comment'));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(editedComment)
  } catch (error) {
    next(error);
  }
}

// Delete comment route.

export const deleteComment = async (req,res,next)=>{
 
  try {
        const comment = await Comment.findById(req.params.commentId)
        if(!comment){
          return next(errorHandler(404,'Comment not found'))
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
          return next(errorHandler(403,'You are not allowed to delete this comment'))
        }

        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json("Comment has been deleted")
  } catch (error) {
     next(error)
  }
}