import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi'
import {useLocation,Link} from 'react-router-dom'
import { useState,useEffect } from 'react'

function DashSidebar() {
    const location=useLocation() // to determine in which tab user visits.
                               // dashboard?tab=profile.
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search) // get the url params here.
    const tabFromUrl=urlParams.get('tab') // Take the tab value from urlParams.
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark' as={'div'}>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
    
  )
}

export default DashSidebar
