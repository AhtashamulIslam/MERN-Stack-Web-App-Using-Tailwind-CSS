import { Alert, Button, TextInput, Textarea,Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Comment from './Comment';

 function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/signin');
        return;
      }
      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: 'PUT',               // First we have the specific comment.
      }); 
      if (res.ok) {
        const data = await res.json();  // Now we filter the comments and update the properties 
        setComments(                     // likes and numberOfLikes with the present one and update it. 
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => { // We send the ref to the Comment component. 
    setComments(                // After that form Comment we get the value comment and editedComment. 
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )          // Here we search the specific comment from comments and then update the content. 
    );           // This comment will be passed to Comment component. 
  };

  const handleDelete = async (commentId)=>{

       setShowModal(false)
       try {
        if(!currentUser){
            navigate('/signin');
            return;
        }
        const res = await fetch(`/api/comment/deletecomment/${commentId}`,{
          method:'DELETE'
        })
        if(res.ok){
            // Here we filtered out the comments from deleted one. 
            const data = await res.json();
           
              setComments( // Here we filter out that comment which we will delete. 
                  comments.filter((comment)=>comment._id !== commentId)
              )
        }

       } catch (error) {
         console.log(error.message)
       }
  }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to={'/signin'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} 
            comment={comment} 
            onLike={handleLike} 
            onEdit={handleEdit}
            onDelete={(commentId)=>{ // Here we define the function as prop which will be invoked with 
               setShowModal(true)   // comment_id from Comment component by clicking Edit. Then the comment id
               setCommentToDelete(commentId) // will be set here and modal appear. When the Delete pressed on
            }}                        // modal the handleDelete function will be invoked with that comment id. 
            />
          ))}
        </>
      )}
       <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size='md'
            >
              <Modal.Header />
              <Modal.Body>
                <div className='text-center'>
                  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete this comment?
                  </h3>
                  <div className='flex justify-center gap-4'>
                    <Button color='failure' onClick={()=>handleDelete(commentToDelete)}>
                      Yes, I'm sure
                    </Button>
                    <Button color='gray' onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
    </div>
  );
}
export default CommentSection