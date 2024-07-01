import { Label, TextInput , Button, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInFailure,signInSuccess,signInStart } from '../redux/user/userSlice'
//In order to use these functions we have to dispatch them using useDispatch.
//
function SignIn() {
   const [formData,setFormData]=useState({})
   const {loading,error:errorMessage}=useSelector(state=>state.user)
   //This props will be from userSlice InitialState props.
   const navigate=useNavigate()
   const dispatch=useDispatch()

   const handleChange = (e)=>{
      setFormData({...formData,[e.target.id]:e.target.value.trim()})
      //Here each time the field data will be destructed which will be stored in fromData as a single valued object. And every time the field data be filled via id and add to the destructured properties.
   }
   
   const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!formData.email || !formData.password)
       dispatch(signInFailure('Please fill out all fields'))
    try{
         dispatch(signInStart())// dispatch Set them to update the previous state's value
        const res = await fetch(`/api/auth/signin`,{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify(formData)
        })
        const data = await res.json()
        //data Contains the response status like success and message
        if(data.success===false)
          dispatch(signInFailure(data.message))
        if(res.ok){
          dispatch(signInSuccess(data))
          navigate('/')
          }
    }catch(error){
      //Handling from client side.
      dispatch(signInFailure(error.message))
    }
   }
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex flex-col px-8 sm:px-12  max-w-3xl mx-auto md:flex-row md:p-3 md:items-center gap-5 '>
        <div className='flex-1'>
        <Link to='/' className='text-4xl dark:text-white font-bold'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Ahtasham's</span> 
         Blog
        </Link>
        <p className='text-sm mt-5'>This is a personal project. You can sign in with your email and password or with Google</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           
           <div className='space-y-1'>
          <Label value='Your email'/>
          <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
           </div>
           <div className='space-y-1'>
          <Label value='Your password'/>
          <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
           </div>
           <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
              loading ? (
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'
            }
           </Button>
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Don't Have an account ?</span>
            <Link to='/signup' className='text-blue-600'>
            Sign Up
            </Link>
          </div>
            { errorMessage && (
             <Alert className='mt-5' color='failure'>
              {errorMessage}
             </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn
