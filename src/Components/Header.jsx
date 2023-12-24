import React from 'react';
import { Background_IMG, Logo } from '../utils/constants';
const Header = () => {
  return (
    <div className=' flex absolute px-20 py-2 bg-gradient-to-b from-black z-10'>
        <img className='w-44' src={Logo} alt="Logo"/>
        <button className='text-white bg-red-600 h-10 w-28 mt-5 font-bold rounded-md'> Sign In</button>

    
       
    </div>
  )
}

export default Header