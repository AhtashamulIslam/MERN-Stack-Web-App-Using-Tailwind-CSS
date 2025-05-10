import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'

function CreatePost() {
  const [file,setFile] = useState(null); // This is for upload image. 
  const [imageUploadProgress, setImageUploadProgress] = useState(null); // To set the progress in uploading image.
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({}) // To save the photo url we take this. 

  // We define the handleUploadImage here.
  const handleUploadImage = async ()=>{
         try{
          if(!file){
            setImageUploadError('Please select an image');
            return;
          }
          setImageUploadError(null);
          // We use firebase storage to store our image file.
          const storage = getStorage(app);
          const fileName = new Date().getTime() + '-' + file.name; // To make the name unique. 
          const storageRef = ref(storage,fileName); // Create a reference in firebase and set the filename.
          const uploadTask = uploadBytesResumable(storageRef, file);

          // As it is an image, we have to define it as a streamable file.
          uploadTask.on(
              'state_changed',
              (snapshot)=>{
                const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Do it to show progress. 
                 setImageUploadProgress(progress.toFixed(0)) // We convert it from fractional to decimal.

              },
              (error)=>{
                setImageUploadError('Image upload failed');
                setImageUploadProgress(null);
              },
              // Now we create a download URL with the help of firebase.
              ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                  setImageUploadProgress(null);
                  setImageUploadError(null);
                  setFormData({...formData,image:downloadURL}) // Store all the data including image url. 
                });
                // we save this url inside a form data. 
              }
          );

         }catch (error){
            setImageUploadError('Image upload failed')
            setImageUploadProgress(null)
            console.log(error)
          }
  }
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
        className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
         <FileInput 
         type='file'
          accept='image/*' 
          onChange={(e)=>setFile(e.target.files[0])} // Here we take the image from input field 
          />
         <Button 
          type='button' 
          gradientDuoTone='purpleToBlue' 
          size='sm' 
          outline
          onClick={handleUploadImage}
          disabled={imageUploadProgress}
          >
           {/* Progress Bar */}
           { imageUploadProgress ? (
            <div className='w-16 h-16'>
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress || 0}%`}
                />
            </div>
           ) : (
              'Upload Image'
           )}
         </Button>
        </div>
        { imageUploadError && 
          <Alert color='failure' >{imageUploadError}</Alert>
        }
        { formData.image && (
          <img 
               src={formData.image}
               alt='upload'
               className='w-full h-72 object-cover'
               />
        )}
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
