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

function App() {
  return (
    <BrowserRouter>
     <Header/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/projects' element={<Projects/>}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App
