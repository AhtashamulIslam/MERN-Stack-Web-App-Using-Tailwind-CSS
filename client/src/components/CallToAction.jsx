import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center
                        rounded-tl-3xl rounded-br-3xl text-center md:h-80 object-cover'>
        <div className='flex flex-col justify-center flex-1'>
            <h2 className='text-2xl text-white'> 
                Want to learn more about medical tips?
            </h2>
             <p className='text-gray-500 my-2'>
                Sign up to explore our medical blogs now. 
             </p>
             <Button gradientDuoTone='purpleToPink' className=' self-center rounded-tl-xl rounded-bl-none'>
                 <Link to='/signup' rel='noopener noreferer'>
                        Sign Up
                 </Link>
             </Button>
        </div>
        <div className='p-7 flex-1 object-cover'>
        <img src="https://static.vecteezy.com/system/resources/previews/012/604/205/large_2x/doctor-icon-virtual-screen-health-care-and-medical-on-background-copy-space-free-photo.jpg"
         alt="Medical Blogs"
         className='object-contain md:h-[300px] md:w-[700px]'
         />
        </div>
    </div>
  )
}

export default CallToAction