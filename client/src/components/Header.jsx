import { Navbar, TextInput,Button, Dropdown, Avatar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { FaMoon,FaSun } from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux' // We have imported user data from 
                                            //state.user from userSlice by useSelector.
                                   //And invoke the reducer function by useDispatch.
import {toggleTheme} from '../redux/theme/themeSlice'
                            //This is theme reducer function.
import { signOutSuccess } from '../redux/user/userSlice'

function Header() {
    const path=useLocation().pathname
    const location = useLocation();
    const dispatch=useDispatch()  // We call the reducer [toggleTheme func] here
    const {currentUser}=useSelector(state=>state.user)
    const {theme}=useSelector(state=>state.theme)
    const [searchTerm,setSearchTerm] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search); // We take the search term from url. 
      const searchTermFromUrl = urlParams.get('searchTerm')
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl)
      }
        
    },[location.search]) // We search the item based on the uri or searched bar item. Get items based on 
                         // search item from uri or search bar. 

    const handleSignOut=async ()=>{
      try {
        const res =await fetch(`/api/user/signout`,{
          method:'POST'
        })
        const data = await res.json()
        if(!res.ok){
          console.log(data.message)
        }else{
          dispatch(signOutSuccess())
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm) // We set value of the query searchterm
        const searchQuery = urlParams.toString() // Convert it to string to set a navigation link below.
        navigate(`/search?${searchQuery}`)
    }
  return (
    <Navbar className='border-b-2 shadow-md'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white font-extrabold'>
        <span className='px-3 py-2 bg-black rounded-lg text-orange-500 dark:text-white mr-1'>
        Public
        </span> 
         Blog
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput
             type='text'
             placeholder='Search...'
             rightIcon={AiOutlineSearch}
             className='hidden lg:inline'
             value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 text-center sm:inline md:ml-3' 
            color='gray' 
            pill
            onClick={()=>dispatch(toggleTheme())}
            >
              {theme==='light' ? <FaMoon /> : <FaSun /> }
            </Button>
            { currentUser ? 
            (
              <Dropdown 
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt='user'
                  img={currentUser.profilePicture}
                  rounded
                />
              }
              >
                <Dropdown.Header>
                  <span className='block text-sm'>@{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to='/dashboard?tab=profile'>
                 <Dropdown.Item>Profile</Dropdown.Item>
                 <Dropdown.Divider/>
                 <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                </Link>

              </Dropdown>
            ) :
            (
            <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
            </Button>
            </Link>
            )
           }
            <Navbar.Toggle/>
            
        </div>
        <Navbar.Collapse>
              <Navbar.Link active={path==='/'} as={'div'}>
                <Link to='/'>Home</Link>
              </Navbar.Link>
              <Navbar.Link active={path==='/about'} as={'div'}>
                <Link to='/about'>About</Link>
              </Navbar.Link>
              <Navbar.Link active={path==='/projects'} as={'div'}>
                <Link to='/projects'>Projects</Link>
              </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
      
    
  )
}

export default Header





















