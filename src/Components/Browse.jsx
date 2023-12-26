import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import SecondaryContainer from './SecondaryContainer';
import MainContainer from './MainContainer';


const Browse = () => {
  useNowPlayingMovies();


  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/> 
      
        {/* <img src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/MLP/TVOD/TVOD_MLP_Right.jpg"/>
        <img src="https://m.media-amazon.com/images/G/31/AmazonVideo/2019/MLP.jpg"/>
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/Magellan_MLP/MLP_Template_Image_Left.jpg"/> */}
     </div>
  )
}

export default Browse;