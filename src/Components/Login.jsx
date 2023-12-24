import React from 'react'
import Header from './Header'
import { Background_IMG } from '../utils/constants'
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/Validate';


const Login = () => {
    const email= useRef(null);
    const password= useRef(null);
    const name= useRef(null);   

    const [isSignInForm, setIsSignInForm]= useState(true);
    const [errorMessage, setErrorMesage]= useState(null); 

    const handleButtonClick=()=> {
        //validate the form data means correct format
        console.log(email.current.value);
        console.log(password.current.value);
        console.log(name.current.value);
        const message= checkValidData(name.current.value, email.current.value, password.current.value);       
        setErrorMesage(message);
    }

    const toggleSignInForm=()=> {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div className='flex'>
        <Header/>
        <div className='absolute'>
            <img src={Background_IMG}/>
        </div>
        <form
            onSubmit={(e)=> e.preventDefault()} 
            className='relative p-12 my-24 mx-auto left-0 right-0  bg-black text-white w-4/12 items-center bg-opacity-75'>
            <h1 className='font-bold text-red-600 text-3xl pb-4'> 
                {isSignInForm ? "Sign In": "SignUp" }
            </h1>       
            {!isSignInForm && <input 
                ref={name}
                className='p-2 mb-3 m-1 mt-1 w-full text-black' 
                type="text" 
                placeholder='Enter Name'/>
            }
            <input 
                ref={email}
                className='p-2 m-1 mt-1 w-full text-black' 
                type="text" 
                placeholder='Enter Email'/>
            <input 
                ref={password}
                className='p-2 m-1 mt-3 w-full text-black' 
                type="password" 
                placeholder='Enter Password'/>
            <p className='text-white font-bold '> {errorMessage} </p>
            <button 
                onClick={handleButtonClick}
                className='p-2 m-1 mt-8 w-full font-bold text-white bg-red-600 rounded-md cursor-pointer'> 
                {isSignInForm ? "Sign In" : "SIgn Up"  }
            </button>
            <h5 
                className='font-bold m-1 underline cursor-pointer' 
                onClick={toggleSignInForm}> 
                { isSignInForm ? "New to Netflix? SignUp now": "Already Registered! SignIn"  }
            </h5>
        </form>

    </div>
  )
}

export default Login