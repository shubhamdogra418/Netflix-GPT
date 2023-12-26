import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[8%] pl-5 text-white bg-gradient-to-r from-black w-screen absolute aspect-video'>
      <h1 className='font-bold text-white text-3xl pt-20 pl-10 '> {title} </h1>
      <p className=' w-1/2 pl-10 pt-5'> {overview} </p>
      <div className='pt-5 pl-10'>
      <button className='bg-white font-bold text-black hover:bg-opacity-80 md:py-2 px-2 md:px-6 rounded-md hover:bg-opacity-80'> ▶ Play</button>
      <button className='hidden md:inline-block mx-2 font-bold  bg-gray-500 text-white p-2 px-4 text-l bg-opacity-50 rounded-md'>  ⓘ More Info</button>
    </div>
    </div>
  )
}

export default VideoTitle;