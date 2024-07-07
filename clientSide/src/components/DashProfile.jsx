// import { Alert, Button, TextInput } from 'flowbite-react';
// import { useEffect, useRef, useState } from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import {
//   updateStart,
//   updateSuccess,
//   updateFailure,
// } from '../redux/user/userSlice';

// export default function DashProfile() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);
//   const [imageFileUploading, setImageFileUploading] = useState(false);
//   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
//   const [updateUserError, setUpdateUserError] = useState(null);
//   const [formData, setFormData] = useState({});
//   const filePickerRef = useRef();
//   const dispatch = useDispatch();
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
//   };
//   useEffect(() => {
//     if (imageFile) {
//       uploadImage();
//     }
//   }, [imageFile]);
//   const uploadImage = async () => {
//     // service firebase.storage {
//     //   match /b/{bucket}/o {
//     //     match /{allPaths=**} {
//     //       allow read;
//     //       allow write: if
//     //       request.resource.size < 2 * 1024 * 1024 &&
//     //       request.resource.contentType.matches('image/.*')
//     //     }
//     //   }
//     // }
//     setImageFileUploading(true);
//     setImageFileUploadError(null);
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + imageFile.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, imageFile);
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setImageFileUploadProgress(progress.toFixed(0));
//       },
//       (error) => {
//         setImageFileUploadError(
//           'Could not upload image (File must be less than 2MB)'
//         );
//         setImageFileUploadProgress(null);
//         setImageFile(null);
//         setImageFileUrl(null);
//         setImageFileUploading(false);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setImageFileUrl(downloadURL);
//           setFormData({ ...formData, profilePicture: downloadURL });
//           setImageFileUploading(false);
//         });
//       }
//     );
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdateUserError(null);
//     setUpdateUserSuccess(null);
//     if (Object.keys(formData).length === 0) {
//       setUpdateUserError('No changes made');
//       return;
//     }
//     if (imageFileUploading) {
//       setUpdateUserError('Please wait for image to upload');
//       return;
//     }
//     try {
//       dispatch(updateStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         dispatch(updateFailure(data.message));
//         setUpdateUserError(data.message);
//       } else {
//         dispatch(updateSuccess(data));
//         setUpdateUserSuccess("User's profile updated successfully");
//       }
//     } catch (error) {
//       dispatch(updateFailure(error.message));
//       setUpdateUserError(error.message);
//     }
//   };
//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='file'
//           accept='image/*'
//           onChange={handleImageChange}
//           ref={filePickerRef}
//           hidden
//         />
//         <div
//           className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
//           onClick={() => filePickerRef.current.click()}
//         >
//           {imageFileUploadProgress && (
//             <CircularProgressbar
//               value={imageFileUploadProgress || 0}
//               text={`${imageFileUploadProgress}%`}
//               strokeWidth={5}
//               styles={{
//                 root: {
//                   width: '100%',
//                   height: '100%',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                 },
//                 path: {
//                   stroke: `rgba(62, 152, 199, ${
//                     imageFileUploadProgress / 100
//                   })`,
//                 },
//               }}
//             />
//           )}
//           <img
//             src={imageFileUrl || currentUser.profilePicture}
//             alt='user'
//             className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
//               imageFileUploadProgress &&
//               imageFileUploadProgress < 100 &&
//               'opacity-60'
//             }`}
//           />
//         </div>
//         {imageFileUploadError && (
//           <Alert color='failure'>{imageFileUploadError}</Alert>
//         )}
//         <TextInput
//           type='text'
//           id='username'
//           placeholder='username'
//           defaultValue={currentUser.username}
//           onChange={handleChange}
//         />
//         <TextInput
//           type='email'
//           id='email'
//           placeholder='email'
//           defaultValue={currentUser.email}
//           onChange={handleChange}
//         />
//         <TextInput
//           type='password'
//           id='password'
//           placeholder='password'
//           onChange={handleChange}
//         />
//         <Button type='submit' gradientDuoTone='purpleToBlue' outline>
//           Update
//         </Button>
//       </form>
//       <div className='text-red-500 flex justify-between mt-5'>
//         <span className='cursor-pointer'>Delete Account</span>
//         <span className='cursor-pointer'>Sign Out</span>
//       </div>
//       {updateUserSuccess && (
//         <Alert color='success' className='mt-5'>
//           {updateUserSuccess}
//         </Alert>
//       )}
//       {updateUserError && (
//         <Alert color='failure' className='mt-5'>
//           {updateUserError}
//         </Alert>
//       )}
//     </div>
//   );
// }
  



import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart,updateSuccess,updateFailure} from '../redux/user/userSlice'

function DashProfile() {
    const {currentUser}=useSelector((state)=>state.user)
    const [imageFile,setImageFile]=useState(null)
    const [imageFileUrl,setImageFileUrl]=useState(null)
    const [imageFileUploading,setImageFileUploading ]=useState(false)
    // To know the image is uploaded fully or not.
    const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null)
    const [imageFileUploadError,setImageFileUploadError]=useState(null)
    const [updateUserSuccess,setUpdateUserSuccess]=useState(null)
    const [updateUserError,setUpdateUserError]=useState(null)
    const [formData,setFormData]=useState({})
    const dispatch=useDispatch()
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
            setImageFileUploading(true)
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
                setImageFileUploading(false)
            },
            ()=>{ //Image will be stored in firebase storage having an url.
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL)=>{
                    setImageFileUrl(downloadURL)
                    setFormData( { ...formData,profilePicture : downloadURL })
                    setImageFileUploading(false)
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

     const handleChange=(e)=>{
            setFormData({...formData,[e.target.id]:e.target.value})
            //Track the data from TextInput fields.
       }
     const handleSubmit= async (e)=>{
          e.preventDefault()
          setUpdateUserError(null)
          setUpdateUserSuccess(null)
          if(Object.keys(formData).length===0){
            setUpdateUserError('No changes made')
            return; //For empty Object it will not be submitted.
          }
          if(imageFileUploading){
            setUpdateUserError('Please wait for image to upload')
            return; // Terminate when image will be uploading.
          }
          try{
            // We get the data via userSlice.js file's reducer.
            dispatch(updateStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            //Here we send the data to Server for validation.
             const data= await res.json()
             //If the res from server is not ok
             if(!res.ok){
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
             }else{
                //Here the res is ok sent from server
                dispatch(updateSuccess(data))
                setUpdateUserSuccess("User's profile updated successfully")
             }
          }catch(error){
             dispatch(updateFailure(error.message))
             setUpdateUserError(error.message)
          }
     }
  return (
    <div className='max-w-lg w-full mx-auto p-3'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        {/*Add onSubmit event to submit the data to DB via api/user/update api*/}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
        <TextInput 
        type='text' 
        id='username' 
        defaultValue={currentUser.username} 
        placeholder='username' 
        onChange={handleChange}/>
        <TextInput 
        type='email' 
        id='email' 
        defaultValue={currentUser.email} 
        placeholder='email' 
        onChange={handleChange}/>
        <TextInput 
        type='password' 
        id='password' 
        placeholder='password' 
        onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
      </form>
      <div className='mt-5 flex justify-between text-red-500 font-semibold'>
        <span className='cursor-pointer border-b-2 hover:border-red-500'>Delete Account</span>
        <span className='cursor-pointer border-b-2 hover:border-red-500'>Sign Out</span>
      </div>
      { updateUserSuccess && (
      <Alert color='success' className='mt-5'>
       {updateUserSuccess}
      </Alert>
      )
      }
      { updateUserError && (
      <Alert color='failure' className='mt-5'>
        {updateUserError}
      </Alert>
      )
      }
    </div>
  )
}

export default DashProfile