import React, { useEffect, useState,useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import { UserContext } from "../App";

const Home = () => {


  const [userName, setUserName] = useState('');
  const[show,setShow]=useState(false);
  
  const { state, dispatch } = useContext(UserContext);


  const userHomePage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      console.log(res);
      const data = await res.json();
      console.log(data);

      setUserName(data.name);
      setShow(true);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }


    }
    catch (err) {
      console.log(err);

    }
  }


  useEffect(() => {
    userHomePage();

  }, []);
  return (

    <div className="home">
      <div className="home-div h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="d-flex justify-content-center">
          <p className="fs-3" style={{ letterSpacing: "0.5em", color: "skyblue" }}>WELCOME</p>
          
         
        </div>
        <h1> {state ? userName : ''}</h1>
        <h2>{state ? 'Happy to see you back' : 'We are developer'}</h2>
      </div>
    </div>
  )
}

export default Home
