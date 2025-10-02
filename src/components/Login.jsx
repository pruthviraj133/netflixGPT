import { 
  useRef, 
  useState 
} from 'react'

import Header from './Header'
import { checkValidData } from '../utils/validate';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    console.log(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: USER_AVATAR
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " - " + errorMessage)
          });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className="md:w-screen h-screen object-cover" src={BG_URL} alt="bkgrd img" >
        </img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full md:w-3/12 absolute p-12 bg-black my-48 mx-auto right-0 left-0 text-white rounded-lg opacity-85'
      >
        <h1
          className='font-bold text-white text-2xl md:text-3xl py-4'
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm &&
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className='bg-gray-700 p-4 my-4 w-full text-gray-200 rounded-lg'
          />}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className='bg-gray-700 p-4 my-4 w-full text-gray-200 rounded-lg'
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className='bg-gray-700 p-4 my-4 w-full text-gray-200 rounded-lg'
        />
        <p className='text-red-600 font-bold py-2 text-lg'>{errorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg hover:cursor-pointer'
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 hover:cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "Already registered? Sign Up now" : "New to Netflix? Sign In now"}</p>
      </form>
    </div>
  )
}

export default Login