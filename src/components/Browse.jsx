import React from 'react'
import Header from './Header'

const Browse = () => {
  return (
    <div >
      <Header/>
      <div className='h-screen flex justify-center items-center flex-col'>
        Namaste, Browse Page
        <div className='h-21 w-21 bg-amber-500 hover:bg-green-400 transition'>

        </div>
      </div>
    </div>
  )
}

export default Browse