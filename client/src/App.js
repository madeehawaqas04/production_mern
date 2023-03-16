import React, { createContext, useReducer } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Login from './components/Login';
import Errorpage from './components/Errorpage';
import 'bootstrap/dist/css/bootstrap.css'
import Logout from './components/Logout';
import { initialStatus,reducer } from '../src/reducer/UseReducer';
import ModalDialog from './components/ModalDialog'

//1:context api
export const UserContext = createContext();

const App = () => {
   const [state,dispatch]= useReducer(reducer,initialStatus);


  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>

    
      <Navbar />
         {/* <ModalDialog /> */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Errorpage" element={<Errorpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
