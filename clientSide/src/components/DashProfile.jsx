import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'

function DashProfile() {
    const {currentUser}=useSelector(state=>state.user)
  return (
    <div className='max-w-lg w-full mx-auto p-3'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img src={currentUser.profilePicture} alt='user' 
        className='rounded-full w-full h-full border-8 object-cover border-[lightgray]'/>
        </div>
        <TextInput type='text' id='username' defaultValue={currentUser.username} placeholder='username' />
        <TextInput type='email' id='email' defaultValue={currentUser.email} placeholder='email' />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className='mt-5 flex justify-between text-red-500 font-semibold'>
        <span className='cursor-pointer border-b-2 hover:border-red-500'>Delete Account</span>
        <span className='cursor-pointer border-b-2 hover:border-red-500'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
