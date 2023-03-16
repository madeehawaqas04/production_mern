import React, { useEffect,useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../App";

const Logout = () => {
    const { state, dispatch } = useContext(UserContext);

    //promises
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/Logout', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }).then((res) => {
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            else{
                dispatch({ type: 'USER', payload: false });

                navigate('/Login');
            } 
           
        }).catch((err)=>{
            console.log(err);
        })
    });
    // return (
    //     <>
    //         <h1>logout</h1>
    //     </>
    // )
}

export default Logout
