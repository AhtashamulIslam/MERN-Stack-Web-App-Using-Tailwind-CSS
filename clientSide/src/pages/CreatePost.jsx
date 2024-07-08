import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create a Post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
         <TextInput type='text' placeholder='Title' required id='title'
         className='flex-1' />
         <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>ReactJs</option>
            <option value='nextjs'>NextJs</option>
         </Select>
        </div>
        <div 
        className='flex gap-4 items-center justify-center border-4 border-teal-500 border-dotted p-3'>
         <FileInput type='file' accept='image/*' />
         <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
            Upload image
         </Button>
        </div>
        <ReactQuill
         theme='snow'
          placeholder='Write something...'
           className='h-72 mb-12'
           required
           />
        <Button type='submit' gradientDuoTone='purpleToPink' className='mb-8'>Publish</Button>
      </form>
    </div>
  )
}

export default CreatePost
