import React from 'react'
import Header from './Header'
import { Background_IMG } from '../utils/constants'
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/Validate';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/Firebase';
import { user_avatar } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const name= useRef(null);
    const email= useRef(null);
    const password= useRef(null);
    
    const dispatch=useDispatch();

    const [isSignInForm, setIsSignInForm]= useState(true);
    const [errorMessage, setErrorMesage]= useState(null); 

    const handleButtonClick=()=> {
        //validate the form data means correct format
        const message= checkValidData(email.current.value, password.current.value);       
        setErrorMesage(message);
        console.log(email.current.value);
        console.log(password.current.value);
        if(message) return; //means emailId,password not valid
        if(!isSignInForm) {
            //signUp logic
            //i have to upate my redux store with the latest info of signin and signup so for
            //that have to dispatch an action evertime,instead of that I would use Firebase given onAutStateChange
            // which will automatically fetch info everytime I update the auth( signIn/Up/Out) 
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user; //old (not-updated user)

              updateProfile(user, {
                    displayName: name.current.value, 
                    photoURL: user_avatar
              }).then(() => {
                // Profile updated!
                const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              }).catch((error) => {
                    console.log("Profile not Updated")
              });

              console.log(user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMesage("Aleady Registered");

              // ..
            });
              
        } 
        else {
            //signIn logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              console.log(user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMesage("User not Registered, SignUp Now");
            });          
        }


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