import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,
       HiArrowSmRight,
       HiDocumentText, 
       HiOutlineUserGroup,
       HiAnnotation,
       HiChartPie} from 'react-icons/hi'
import {useLocation,Link} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { useSelector } from 'react-redux'


function DashSidebar() {
    const location=useLocation() // to determine in which tab user visits.
                               // dashboard?tab=profile.
  const [tab,setTab]=useState('')
  const dispatch=useDispatch()
  const {currentUser} = useSelector(state=>state.user);
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search) // get the url params here.
    const tabFromUrl=urlParams.get('tab') // Take the tab value from urlParams.
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
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
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
              {
                currentUser && currentUser.isAdmin && (
                   <Link to='/dashboard?tab=dash'>
                <Sidebar.Item 
                 active={tab === 'dash' || !tab}
                 icon={HiChartPie} 
                 as='div'>
                    Dashboard
                </Sidebar.Item>
                </Link>
                )
              }
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item 
                 active={tab==='profile'} 
                 icon={HiUser} 
                 label={ currentUser.isAdmin ? 'Admin':'User'} 
                 labelColor='dark' 
                 as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                { currentUser.isAdmin && (
                  <>
                  <Link to='/dashboard?tab=posts'>
                <Sidebar.Item
                  active={tab === 'posts'}
                  icon={HiDocumentText}
                   as='div'
                   >
                    Posts
                  </Sidebar.Item>
                </Link>
                
                
               <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                   as='div'
                   >
                    Users
                  </Sidebar.Item>
                </Link>
                 <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                   as='div'
                   >
                    Comments
                  </Sidebar.Item>
                </Link>
                </>
                )}
                
                <Sidebar.Item 
                  icon={HiArrowSmRight} 
                  className='cursor-pointer' 
                  onClick={handleSignOut} 
                  
                  >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    
  )
}

export default DashSidebar
