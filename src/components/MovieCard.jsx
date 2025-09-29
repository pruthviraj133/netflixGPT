import { IMG_CDN_URL } from "../utils/constants"




const MovieCard = ({posterPath}) => {
  return (
    <div className="w-48 pr-4">
        <img 
            alt="Alt text"
            src={IMG_CDN_URL + posterPath}

        ></img>
    </div>
  )
}

export default MovieCard