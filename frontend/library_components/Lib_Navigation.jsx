import useAuthStore from '../store/useAuthStore'
import NotificationIcon from '../src/assets/notification-svgrepo-com.svg'
import RankingIcon from '../src/assets/crown-svgrepo-com.svg'
import defaultProfile from '../src/assets/Student.jpg'
import { useNavigate } from 'react-router-dom'

const Lib_Navigation = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
          logout();
          navigate('/');
    }
    const handleProfile = () => {
          navigate('/library/profile');
    }
    
    return(
        <nav className=" bg-gradient-to-br from-pink-300 via-pink-500 to-purple-500 rounded-t-2xl h-20 w-full justify-between items-center flex px-6">
                              <div className="rounded-xl justify-center items-center flex gap-2">
                                <div
                                className="h-12 w-12 border-2 border-white rounded-full cursor-pointer overflow-hidden"
                                onClick={handleProfile}
                              >
                                <img
                                  src={user?.avatar || defaultProfile}
                                  className="h-full w-full object-cover"
                                  alt="profile"
                                />
                              </div>
                                <h1 className="text-medium text-white font-bold text-lg">{`Little Me Online Library`}</h1>
                              </div>

                              <div className='bg-white/50 px-2 py-1 rounded-2xl'>
                                <h1 className="text-medium text-white font-bold text-lg">Your Level 0</h1>
                              </div>
                              <div className='gap-2 justify-center items-center flex'>
                                
                                <button className='h-10 w-10 border-2 border-white rounded-xl items-center flex justify-center'><img src={RankingIcon} className='h-5 w-5 object-cover' /></button>
                                <button className='h-10 w-10 border-2 border-white rounded-xl'><img src={NotificationIcon} className='h-full w-full object-cover' /></button>
                                <button className="h-10 px-4 bg-transparent border-2 border-white text-white font-bold rounded-xl transition-all duration-300 ease-in-out hover:text-gray-500 hover:bg-white cursor-pointer" onClick={handleLogout}>Logout</button>
                              </div>
                              
        </nav>
    )
}
export default Lib_Navigation