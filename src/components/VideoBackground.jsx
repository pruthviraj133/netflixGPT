
import { useSelector } from "react-redux";
import useTrailerMovie from "../hooks/useTrailerMovie";



const VideoBackground = ( {movieId} ) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo)
  useTrailerMovie(movieId);

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1&loop=1&playlist="+trailerVideo?.key} 
        title="YouTube video player" 
        frameBorder="0" 
        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      ></iframe>

    </div>
  )
}

export default VideoBackground