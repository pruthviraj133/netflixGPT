


const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-2xl md:text-6xl font-bold w-1/4">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
        <div className="my-4 md:my-0">
            <button className="bg-white text-black text-lg px-2 py-1 md:px-4 md:py-2 md:w-1/12 rounded-sm hover:opacity-80 ">Play</button>
            <button className="hidden md:inline-block mx-2 bg-gray-700 text-white text-lg px-4 py-2 w-1/10 rounded-sm hover:opacity-80">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle