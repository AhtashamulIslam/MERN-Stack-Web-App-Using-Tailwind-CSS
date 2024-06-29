import { Label, TextInput , Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex flex-col px-8 sm:px-12  max-w-3xl mx-auto md:flex-row md:p-3 md:items-center gap-5 '>
        <div className='flex-1'>
        <Link to='/' className='text-4xl dark:text-white font-bold'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Ahtasham's</span> 
         Blog
        </Link>
        <p className='text-sm mt-5'>This is a personal project. You can sign up with your email and password or with Google</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
           <div className='space-y-1'>
          <Label value='Your username'/>
          <TextInput type='text' placeholder='Username' id='username' />
           </div>
           <div className='space-y-1'>
          <Label value='Your email'/>
          <TextInput type='text' placeholder='name@company.com' id='email' />
           </div>
           <div className='space-y-1'>
          <Label value='Your password'/>
          <TextInput type='text' placeholder='Password' id='password' />
           </div>
           <Button gradientDuoTone='purpleToPink' type='submit'>
            Sign Up
           </Button>
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-600'>
            Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
