import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
        toggleGptSearchView: (state)=> {
            state.showGptSearch=!state.showGptSearch; //toggling happening here 
        },
        addGptMovieResult: (state, action) => {
            const { movieResults, movieNames }= action.payload;
            state.movieNames=movieNames;
            state.movieResults=movieResults;
        }
    }
})

//to make the redux slice empty
// const intialState = {
//     returned: []
//   }
  
//   const showOnReviewSlice = createSlice({
//       name: 'showOnReview',
//       initialState,
//       reducers: {
//           reset: () => initialState
//       }
//   });



export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions; 
export default gptSlice.reducer;