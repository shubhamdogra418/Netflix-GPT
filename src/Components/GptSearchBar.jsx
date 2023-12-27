import React from 'react'
import Lang from '../utils/langConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

    const langKey= useSelector((store)=> store.config.lang);

  return (
    <div className='pt-[10%] flex justify-center'>
        
        <form className='w-1/2 grid grid-cols-12 '> 
            <input 
                className='rounded-md font-bold p-3 m-4 col-span-9 border-x-slate-200 border-s-purple-5000 bg-white text-black ' 
                type="text" 
                placeholder={Lang[langKey].placeholder}/>
            <button 
                className='bg-purple-600 col-span-3 cursor-pointer m-4 ml-1 text-white rounded-md py-1 font-bold'> 
                {Lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar