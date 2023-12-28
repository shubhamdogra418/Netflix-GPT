import React from 'react'
import GptMovieSuggstions from './GptMovieSuggstions';
import GptSearchBar from './GptSearchBar';
import { Background_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
        <div className='fixed -z-10'>
            <img src={Background_IMG}/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggstions/>

    </div>
  )
}

export default GptSearch;