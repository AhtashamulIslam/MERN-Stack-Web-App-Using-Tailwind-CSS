import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction.jsx'
import BackgroundImage from '../assets/andrew-neel-cckf4TsHAuw-unsplash.jpg'
import PostCard from '../components/PostCard.jsx'

function Home() {
  const [posts,setPosts] = useState([])

  useEffect(()=>{

    const fetchPosts = async ()=>{
        try {
          const res = await fetch('api/post/getposts');
           const data = await res.json();
           setPosts(data.posts);
        } catch (error) {
          console.log(error.message)
        }
           
    }
     fetchPosts();
  },[])
  
  return (
    <div className="setbackground">
       <div className='flex flex-col gap-6 mx-auto w-full p-28 px-10 text-white'>
        <h1 className='text-3xl max-w-6xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='max-w-6xl text-xs sm:text-sm'> Welcome to my blog! Here you'll find a wide range of articles,
          tutorials, and resources designed to help you grow as a developer.
          Whether you're interested in web development, software engineering,
          programming languages, or best practices in the tech industry, there's
          something here for everyone. Dive in and explore the content to expand
          your knowledge and skills.</p>
          <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
            View all posts
          </Link>
       </div>
       <div className='p-3 bg-gray-950'>
       <CallToAction />
       </div>
       <div className='max-w-7xl flex flex-col p-3 gap-8 mx-auto py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
             <h2 className='text-2xl font-semibold text-center text-white'>
              Recent Posts
             </h2>
             <div className='flex flex-wrap gap-4'>
               {posts.map((post)=>(
                  <PostCard key={post._id} post={post} />
               ))}
             </div>
             <Link to={'/search'} className='text-lg text-teal-500 text-center hover:underline'>
             View all posts
             </Link>
            </div>
        )}
       </div>
    </div>
  )
}

export default Home
