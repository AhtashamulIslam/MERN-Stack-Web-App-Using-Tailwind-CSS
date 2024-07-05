import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const {currentUser}=useSelector(state=>state.user)
    const [imageFile,setImageFile]=useState(null)
    const [imageFileUrl,setImageFileUrl]=useState(null)
    const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null)
    const [imageFileUploadError,setImageFileUploadError]=useState(null)
    const filePickerRef = useRef() //To make a ref of upload image button and attatch it on
                                    // image div.
    //This is for permenantly change our profile image and save it to DB.
    useEffect(()=>{

        if(imageFile){
            uploadImage()
        }
    },[imageFile])
       // This func will save the new image to DB.
       const uploadImage = async()=>{
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read ;
        //         allow write : if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
            setImageFileUploadError(null)
            const storage = getStorage(app)
        //Make our file url unique.
            const fileName = new Date().getTime() + imageFile.name
        //create a ref of storage and image file.
            const storageRef = ref(storage,fileName) 
        //Upload the image under the previously created ref.
            const uploadTask = uploadBytesResumable(storageRef,imageFile)
        //Add the event to handle state_change and errors
        uploadTask.on(
            'state_changed',
            (snapshot)=>{  // snapshot is a piece of information while uploading
               //Progress to demonstrate progress bar.
                const progress=
                 (snapshot.bytesTransferred/snapshot.totalBytes)*100
                setImageFileUploadProgress(progress.toFixed(0))//Discard decimels.
            },
            (error)=>{
                setImageFileUploadError('Could not upload image(File must be less than 2 MB)')
                setImageFileUploadProgress(null) //Hide the progress bar when an error occurs.
                setImageFile(null)
                setImageFileUrl(null)
            },
            ()=>{ //Image will be stored in firebase storage having an url.
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                })
            }
        )
       }
    
        const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file)) // It will create a useable temp image
                                                   //url to upload image.
    }

    }
    
  return (
    <div className='max-w-lg w-full mx-auto p-3'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input 
        type='file' 
        accept='image/*' 
        onChange={handleImageChange} 
        ref={filePickerRef} 
        hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
        {/*image file uploading prgress bar */}
        {imageFileUploadProgress && (
            <CircularProgressbar 
            value={imageFileUploadProgress || 0} 
            text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={{
                root:{
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    top:0,
                    left:0
                },
                path:{
                    stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`
                }
            }
                
            }/>
        )} 
        <img src={imageFileUrl || currentUser.profilePicture} 
        alt='user' 
        className={`rounded-full w-full h-full border-8 object-cover border-[lightgray]
         ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}
        `
        }
        />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
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
