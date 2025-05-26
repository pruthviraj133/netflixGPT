import { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    console.log(message);
    if (message) return;

    // if - Sign up // else - Sign in logic
    if (!isSignInForm) {
      // sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/116875505?v=4"
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            }));
            navigate("/browse");
          }).catch((error) => {
            setErrorMessage(error.message)
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
      // sign in logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
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
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg" alt="bkgrd img" >
        </img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black my-48 mx-auto right-0 left-0 text-white opacity-85'
      >
        <h1
          className='font-bold text-white text-3xl py-4'
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