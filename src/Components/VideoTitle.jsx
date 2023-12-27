import React from 'react'
import { Link } from 'react-router-dom';
import Lang from '../utils/langConstants';
import { useSelector } from 'react-redux';

const VideoTitle = ({title, overview}) => {
  const langKey= useSelector((store)=> store.config.lang);

  const imdbLink= () => {}
  return (
    <div className='pt-[8%] pl-5 text-white bg-gradient-to-r from-black w-screen absolute aspect-video'>
      <h1 className='font-bold text-white text-3xl pt-20 pl-10 '> {title} </h1>
      <p className=' w-1/2 pl-10 pt-5'> {overview} </p>
      <div className='pt-5 pl-10'>
      <button 
            className='bg-white font-bold text-black hover:bg-opacity-80 md:py-2 px-2 md:px-6 rounded-md hover:bg-opacity-80'> 
            ▶ {Lang[langKey].play}</button>
      <Link to="https://www.imdb.com/title/tt9663764/">
      <button
            onClick={imdbLink} 
            className='hidden md:inline-block mx-2 font-bold  bg-gray-500 text-white p-2 px-4 text-l bg-opacity-50 rounded-md'>  
            ⓘ {Lang[langKey].moreinfo}
      </button> </Link>
    </div>
    </div>
  )
}

export default VideoTitle;