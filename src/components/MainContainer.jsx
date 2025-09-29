import { useSelector } from "react-redux"
import VideoTitle from "./VideoTitle";
import VideoBackground from "./Videobackground";



const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  
  // if (movies === null) return; // same as below; if movies isn't there, return
  if (!movies) return;
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  console.log(mainMovie);


  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer