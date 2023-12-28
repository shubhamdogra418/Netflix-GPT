import React from 'react'
import Lang from '../utils/langConstants'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import openai from '../utils/openAI';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

    const dispatch= useDispatch();
    const langKey= useSelector((store)=> store.config.lang);
    const searchText= useRef(null);

    const searchMovieTMDB = async (movie)=> {
        const data= await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie + "&include_adult=false&language=en-US&page=1"
            , API_OPTIONS);
        const json= await data.json();
        return json.results;
    }


    const handleGPTSearchClick = async()=> {
        console.log(searchText.current.value);
        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of 7 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya, Angoor, Aankhein";
        // on the basis of current value >> calling the OPEN AI and get the results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery}],    
            model: 'gpt-3.5-turbo',
          });
          if(!gptResults.choices) {
            console.log("GPT API Failed");
          }
          console.log(gptResults?.choices[0]?.message?.content);
          const gptMovies= gptResults?.choices[0]?.message?.content.split(",");
          //list comes as array now >> map function
          const promiseArray=gptMovies.map((movie)=> searchMovieTMDB(movie));
          //as this is async function it will not give result immediately but promises
          //that takes time for all Pomises to resolve >> use Promises.all
          const tmdbResults= await Promise.all(promiseArray);
          //push all these to store ans use whenever we need
          console.log(tmdbResults);
          dispatch(addGptMovieResult({movieResults: tmdbResults, movieNames: gptMovies}));
    }

  return (
    <div className='pt-[10%] flex justify-center'>
        
        <form 
            onSubmit={(e)=> e.preventDefault()}
            className='w-1/2 grid grid-cols-12'> 
            <input 
                ref={searchText}
                className='rounded-md font-bold p-3 m-4 col-span-9 border-x-slate-200 border-s-purple-5000 bg-white text-black ' 
                type="text" 
                placeholder={Lang[langKey].placeholder}/>
            <button 
                onClick={handleGPTSearchClick}
                className='bg-purple-600 col-span-3 cursor-pointer m-4 ml-1 text-white rounded-md py-1 font-bold'> 
                {Lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar