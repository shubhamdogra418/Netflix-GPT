import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const useNowPlayingMovies =()=> {
  const dispatch=useDispatch();
  const nowPlayingMovies= useSelector((store)=> store.movies?.nowPlayingMovies);
  const getNowPlayingMovies= async() => {
    const data= await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?page=1', 
        API_OPTIONS);
    const json= await data.json();
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));

  }

  useEffect(()=> {
    //only call is no data, if data is there don't call at all
    !nowPlayingMovies &&  getNowPlayingMovies();
  },[]);
};

export default useNowPlayingMovies;