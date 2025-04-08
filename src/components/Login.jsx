import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/98df3030-1c2b-4bd1-a2f5-13c611857edb/web/IN-en-20250331-TRIFECTA-perspective_247b6f06-c36d-4dff-a8eb-4013325c3f8e_large.jpg" alt="bkgrd img" >
        </img>
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-48 mx-auto right-0 left-0 text-white opacity-85'>
        <h1 className='font-bold text-white text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {isSignInForm && <input
          type="text"
          placeholder="Full Name"
          className='bg-gray-700 p-4 my-4 w-full text-gray-200 rounded-lg'
        />}
        <input
          type="text"
          placeholder="Email Address"
          className='bg-gray-700 p-4 my-4 w-full text-gray-200 rounded-lg'
        />
        <input
          type="password"
          placeholder="Password"
          className='bg-gray-700 p-4 my-4 w-full text-gray-200 rounded-lg'
        />
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 hover:cursor-pointer' onClick={toggleSignInForm}> {isSignInForm ? "Already registered? Sign In now" : "New to Netflix? Sign up now"}</p>
      </form>
    </div>
  )
}

export default Login