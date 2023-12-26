import React, {useEffect} from 'react';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import {Logo, avatar } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const user= useSelector((store)=> store.user);

  const handleSignOut =()=> {

    signOut(auth).then(() => {
      //no need to dispatch an action, Firebase's onAuthStateChange handeling it 
      console.log("sign out successfull")

    }).catch((error) => {
        navigate("/error");
    });
  }

    useEffect(()=> {
      const unsubscribe= onAuthStateChanged(auth, (user) => {
          if (user) {
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({
                  uid: uid, 
                  email: email, 
                  displayName: displayName,
                  photoURL: photoURL,
              }));
              //logged in  >> navigate to browse page
              navigate("/browse");
          } else {
            // User is signed out
            dispatch(removeUser());
            navigate("/");
          } //lgged out >> navigate to login home page
        });          
        //unmounting the onAUthStateChangeCallback
        return () => unsubscribe();
  },[]) //render only once on the mounting of the app
  


  return (
    <div className=' flex justify-between absolute w-screen px-20 py-2 bg-gradient-to-b from-black z-10'>
        <img className='w-44 cursor-pointer' src={Logo} alt="Logo"/>
        { user &&
        <div className='flex'> 
            <img className='mr-5 w-11 h-10 mt-4 cursor-pointer' src={avatar}/>
            <button 
                onClick={handleSignOut}
                className='text-white bg-red-600 h-10 w-28 mt-4 font-bold rounded-md'> 
                Sign Out
            </button>
        </div>
        }
    
       
    </div>
  )
}

export default Header;   