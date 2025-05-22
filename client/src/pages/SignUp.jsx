import { Label, TextInput , Button, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

function SignUp() {
   const [formData,setFormData]=useState({})
   const [errorMessage,setErrorMessage]=useState(null)
   const [loading,setLoading]=useState(false)
   const navigate=useNavigate()
   
   const handleChange = (e)=>{
      setFormData({...formData,[e.target.id]:e.target.value.trim()})
      //Here each time the field data will be destructed which will be stored in fromData as a single valued object. And every time the field data be filled via id and add to the destructured properties.
   }
   console.log(formData)
   const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password)
       return setErrorMessage('Please fill out all fields')
    try{
        setLoading(true)
        setErrorMessage(null)// Set them to update the previous states
        const res = await fetch(`/api/auth/signup`,{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify(formData)
        })
        const data = await res.json()
        //Contains the response status like success and message
        if(data.success===false)
          return setErrorMessage(data.message)
        setLoading(false)
        if(res.ok)
          navigate('/signin')
    }catch(error){
      //Handling from client side.
      setErrorMessage(error.message)
      setLoading(false)
    }
   }
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex flex-col px-8 sm:px-12  max-w-3xl mx-auto md:flex-row md:p-3 md:items-center gap-5 '>
        <div className='flex-1'>
        <Link to='/' className='text-4xl dark:text-white font-bold'>
         <span className='px-3 py-2 bg-black rounded-lg text-orange-500 dark:text-white mr-1'>
        Public
        </span> 
         Blog
        </Link>
        <p className='text-sm mt-5'>This is a personal project. You can sign up with your email and password or with Google</p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
           <div className='space-y-1'>
          <Label value='Your username'/>
          <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
           </div>
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
              ) : 'Sign Up'
            }
           </Button>
           <OAuth />
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>Have an account ?</span>
            <Link to='/signin' className='text-blue-600'>
            Sign In
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

export default SignUp
