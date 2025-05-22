import { Footer, FooterLink, FooterLinkGroup } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsTwitter,BsInstagram,BsGithub,BsDribbble } from 'react-icons/bs'

function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5 font-extrabold'>
            <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl dark:text-white'>
            <span className='px-3 py-2 bg-black rounded-lg text-orange-500 dark:text-white mr-1'>
        Public
        </span> 
         Blog
            </Link>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 text-sm'>
              <div>
               <Footer.Title title='About' />
               <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  >
                    100 JS Projects
                  </Footer.Link>
                  <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                  >
                    Ahtasham's blog
                  </Footer.Link>
               </Footer.LinkGroup>
               </div>
               <div>
               <Footer.Title title='Follow us' />
               <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/AhtashamulIslam'
                  target='_blank'
                  rel='noopener noreferrer'
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link
                  href='#'
                  >
                    Discord
                  </Footer.Link>
               </Footer.LinkGroup>
               </div>
               <div>
               <Footer.Title title='Legal' />
               <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/AhtashamulIslam'
                  >
                   Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                  href='#'
                  >
                    Terms &amp; Conditions
                  </Footer.Link>
               </Footer.LinkGroup>
               </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:justify-between sm:items-center'>
        <Footer.Copyright 
          href='#'
          by="Ahtasham's blog"
          year={new Date().getFullYear()}
          />
          <div className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='https://github/AhtashamulIslam' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </div>
          </div>
      </div>
    </Footer>
    
  )
}

export default FooterCom
