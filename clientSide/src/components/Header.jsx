import { Navbar, TextInput,Button, Dropdown, Avatar } from 'flowbite-react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { FaMoon,FaSun } from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux' // We have imported user data from 
                                            //state.user from userSlice by useSelector.
                                   //And invoke the reducer function by useDispatch.
import {toggleTheme} from '../redux/theme/themeSlice'
                            //This is theme reducer function.
function Header() {
    const path=useLocation().pathname
    const dispatch=useDispatch()  // We call the reducer [toggleTheme func] here
    const {currentUser}=useSelector(state=>state.user)
    const {theme}=useSelector(state=>state.theme)
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white font-semibold'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Ahtasham's</span> 
         Blog
        </Link>
        <form>
          <TextInput
             type='text'
             placeholder='Search...'
             rightIcon={AiOutlineSearch}
             className='hidden lg:inline'
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline md:ml-3' 
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
                 <Dropdown.Item>Sign Out</Dropdown.Item>
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





















