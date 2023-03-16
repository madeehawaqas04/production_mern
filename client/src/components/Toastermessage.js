import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toastermessage = () => {
  return (
    <>
    {
      toast.error("in toaster",{position:"top-center"})
    }
    
			<ToastContainer />
    </>
  )
}

export default Toastermessage




