import React, {useEffect} from 'react';
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import {Logo, avatar } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { Link } from 'react-router-dom';
import { toggleGptSearchView } from '../utils/gptSlice';
import Lang from '../utils/langConstants';
import { Supported_Langs } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';


const Header = () => {

  const langKey =useSelector((store)=> store.config.lang);
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const user= useSelector((store)=> store.user);
  const showGptSearch= useSelector((store)=>store.gpt.showGptSearch);


  const goHome=()=> {
    <Link to="/" />
    console.log("working or not");
  }

  const handleGptSearchView =()=> {
    dispatch (toggleGptSearchView());
  }

  const handleLangChange =(e)=>{
    dispatch(changeLanguage(e.target.value));
    // console.log(e.target.value);
  }

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
        <img onClick={goHome} className='w-44 cursor-pointer' src={Logo} alt="Logo"/>
        { user &&
        <div className='flex p-2'> 

            {/* { showGptSearch &&  */}
              <select 
                className='px-3 m-4 py-2 mr-4 rounded-md bg-gray-900 text-white font-bold'
                onChange={handleLangChange}    
            >
                {Supported_Langs.map((lang)=> <option value={lang.identifier}> {lang.name}</option>)}
            </select> 
            {/* } */}
        
            <button
                onClick={handleGptSearchView}   
                className='bg-purple-800 text-white font-bold px-3 m-4 py-2 mr-4 hover:bg-purple-600 rounded-md '> 
                { showGptSearch ? Lang[langKey].home : Lang[langKey].gptSearch }
            </button>
        
            <img className='mr-5 w-8 h-8 mt-5 cursor-pointer' src={avatar}/>
        
            <button 
                onClick={handleSignOut}
                className='text-white bg-red-600 h-10 w-24 mt-4 font-bold rounded-md'> 
                {Lang[langKey].signout}
            </button>
        </div>
        }
    
       
    </div>
  )
}

export default Header;   