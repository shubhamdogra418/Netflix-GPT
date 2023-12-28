import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTrailerVideo =(movieId)=> {
    const dispatch= useDispatch();

    const trailerVideo= useSelector((store)=> store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const data= await fetch
        ("https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US", API_OPTIONS);
    const json= await data.json();
    console.log(json);

    const filterData= json.results.filter((video)=> video.type === "Trailer");
    const trailer= filterData.length ? filterData[0] : json.results.filter((video)=> video.type==="Teaser");
    console.log("Trailer key is; ", trailer.key);
    dispatch(addTrailerVideo(trailer));
  }; 
  
  useEffect(()=> {
    if(!trailerVideo) getMovieVideos();
  }, []);
}

export default useTrailerVideo;