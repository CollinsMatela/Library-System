import useAuthStore from '../store/useAuthStore'
import NotificationIcon from '../src/assets/notification-svgrepo-com.svg'
import RankingIcon from '../src/assets/crown-svgrepo-com.svg'
import defaultProfile from '../src/assets/Student.jpg'
import LittleMeLogo from '../public/LMLC.png'
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
        <nav className=" bg-gray-50 border-b border-gray-300 rounded-t-2xl h-20 w-full justify-between items-center flex px-6">
                              <div className='h-full rounded-2xl flex gap-2 justify-center items-center'>
                                <div className=" bg-white h-10 w-10 rounded-xl justify-center items-center flex cursor-pointer" onClick={() => navigate('/library')}>
                                  <img src={LittleMeLogo} alt="Logo" className='h-8 w-8 object-cover rounded-xl'/>
                                </div>
                                <h1 className="text-medium text-pink-500 font-bold text-lg">Little Me Library</h1>
                              </div>

                              <div className='gap-2 justify-center items-center flex'>
                                <img src={user?.avatar || defaultProfile} className="h-10 w-10 object-cover hover:border-4 hover:border-pink-500 rounded-full cursor-pointer transition-all duration-300 ease-in-out" onClick={handleProfile}/>
                                <button className='h-10 w-10 bg-pink-500 rounded-xl items-center flex justify-center'><img src={RankingIcon} className='h-5 w-5 object-cover' /></button>
                                <button className='h-10 w-10 bg-pink-500 rounded-xl'><img src={NotificationIcon} className='h-full w-full object-cover' /></button>
                                <button className="h-10 px-4 bg-pink-500 text-white font-bold rounded-xl transition-all duration-300 ease-in-out hover:text-white hover:bg-pink-500 cursor-pointer" onClick={handleLogout}>Logout</button>
                              </div>
                              
        </nav>
    )
}
export default Lib_Navigation