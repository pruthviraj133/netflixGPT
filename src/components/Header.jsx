import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate(); 
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch(() => {
      navigate("/error");
  });
  }

  return (
    <div className="absolute w-screen px-8 py-8 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className='w-44'  src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg" alt='icon img'>
      </img>
      {user && <div className='flex p-2'>
        <img 
          className='w-10 h-10 mx-2' 
          src={user.photoURL} 
          alt="usericon" 
        />
        <button 
          onClick={handleSignOut} 
          className='bg-red-500 p-2 rounded-lg font-bold text-white hover:cursor-pointer'
        >
          Sign Out
        </button>
      </div>}
    </div>
  )
}

export default Header 