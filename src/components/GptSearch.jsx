import { BG_URL } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"




const GptSearch = () => {
    return (
        <>
            <div className='fixed -z-10'>
                <img className="md:w-screen h-screen object-cover" src={BG_URL} alt="bkgrd img" >
                </img>
            </div>
            <div className="">
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </>
    )
}

export default GptSearch