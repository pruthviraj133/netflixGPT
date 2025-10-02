import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGPTSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGPTSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => { }
    ).catch(() => {
      navigate("/error");
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGPTSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }


  return (
    <div className="absolute w-screen px-8 py-8 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='icon img'>
      </img>
      {user && <div className='flex p-2 justify-between'>
        {
          showGptSearch &&
          <select
            className='p-2 m-2 bg-gray-900 text-white rounded-md'
            onChange={handleLanguageChange}
          >
            {
              SUPPORTED_LANGUAGES.map(lang =>
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>)
            }
          </select>
        }
        <button className='py-2 px-4 mx-2 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGPTSearchClick}>{showGptSearch ? "Homepage": "GPT Search"}</button>
        <img
          className='hidden md:inline-block w-10 h-10 my-2 mx-3'
          src={user.photoURL}
          alt="usericon"
        />
        <button
          onClick={handleSignOut}
          className='bg-red-500 py-2 px-4 my-2 rounded-lg font-bold text-white hover:cursor-pointer'
        >
          Sign Out
        </button>
      </div>}
    </div>
  )
}

export default Header 