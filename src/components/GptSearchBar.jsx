import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef } from "react";
import openAIClient from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";


const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
    const searchText = useRef(null);
    const dispatch = useDispatch()

    const searchMovieTMDB = async (movieName) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movieName+'&include_adult=false&language=en-US&page=1', API_OPTIONS)
            .then(res => res.json())
            .catch(err => console.error(err));
        return data.results;
    }

    const handleGptSearchClick = async () => {
        // make an API call to GPT API and get movies results
        const response = await openAIClient.responses.create({
            model: 'openai/gpt-oss-20b',
            instructions: 'You are a movie recommendation system. Suggest 5 movies for the input. Comma separated, just like the example ahead. Example: Skyfall, The Dark Knight, Barbie, The Matrix, Inception',
            input: searchText.current.value,
        });
        const gptoutputMovies = response.output?.[1]?.content?.[0]?.text.split(", ");
        // console.log(gptoutputMovies);

        const promiseArray = gptoutputMovies.map(movie => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        // console.log(tmdbResults);
        dispatch(addGPTMovieResult({movieNames: gptoutputMovies, movieResults: tmdbResults}));
    }

    return (
        <div className="pt-[35%] md:pt-[10%] flex justify-center">
            <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={e => e.preventDefault()}>
                <input type="" ref={searchText} className="p-4 m-4 bg-white col-span-9" placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className="px-4 py-2 my-4 ml-2 mr-4 bg-red-700 text-white rounded-md col-span-3" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar