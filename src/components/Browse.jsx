import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGPTSearch)
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();

  return (
    <div >
      <Header />
      {
        showGptSearch ?
          <GptSearch /> :
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
      }

      {/*
        Main Container
          - Video Background
          - Video Title
        Secondary Container
          - Movie list * n
            - cards * n
       */}
    </div>
  )
}

export default Browse