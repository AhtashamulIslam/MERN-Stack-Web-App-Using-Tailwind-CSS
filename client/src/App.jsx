import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import FooterCom from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import SearchURL from './pages/SearchURL'

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
     <Header/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/signin' element={<SignIn/>}/>
        <Route path='/search' element={<SearchURL/>}/>
       <Route element={<PrivateRoute />}>
       <Route path='/dashboard' element={<Dashboard/>}/>
       </Route>
       <Route element={<OnlyAdminPrivateRoute />}>
       <Route path='/create-post' element={<CreatePost/>}/>
       <Route path='/update-post/:postId' element={<UpdatePost/>}/>
       </Route>
       <Route path='/projects' element={<Projects/>}/>
       <Route path='/post/:postSlug' element={<PostPage />}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App
