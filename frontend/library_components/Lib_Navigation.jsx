import useAuthStore from '../store/useAuthStore'
import NotificationIcon from '../src/assets/notification-svgrepo-com.svg'
import RankingIcon from '../src/assets/crown-svgrepo-com.svg'
import defaultProfile from '../src/assets/Student.jpg'
import NaicLibraryLogo from '../src/assets/NaicLibraryLogo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Blocks, BookSearch } from 'lucide-react'

const Lib_Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
        <nav className=" bg-white border-b border-gray-300 h-20 w-full justify-center items-center flex px-6">

                       <div className='w-7xl justify-between items-center flex'>
                          <div className='h-full rounded-2xl flex gap-2 justify-center items-center'>
                            <div className=" bg-gray-100 h-10 w-10 rounded-full justify-center items-center flex cursor-pointer" onClick={() => navigate('/library')}>
                              <img src={NaicLibraryLogo} alt="Logo" className='h-full w-full object-cover rounded-xl'/>
                            </div>
                            <h1 className="text-medium text-black font-bold text-lg">Naic Municipal Library</h1>
                          </div>

                          <div className='gap-2 justify-center items-center flex'>
                            <button className={`${location.pathname === '/library' ? "bg-black text-white" : "bg-white text-black"} h-10 px-4 justify-center items-center flex text-sm transition-all duration-300 ease-in-out cursor-pointer gap-2 rounded-xl`} onClick={() => navigate('/library')}><Blocks size={20}/> Book Browse</button>
                            <button className={`${location.pathname === '/library/catalog' ? "bg-black text-white" : "bg-white text-black"} h-10 px-4 justify-center items-center flex text-sm transition-all duration-300 ease-in-out cursor-pointer gap-2 rounded-xl`} onClick={() => navigate('/library/catalog')}><BookSearch size={20}/> Catalog</button>
                            <button className={`${location.pathname === '/library/borrow-status' ? "bg-black text-white" : "bg-white text-black"} h-10 px-4 justify-center items-center flex text-sm transition-all duration-300 ease-in-out cursor-pointer gap-2 rounded-xl`} onClick={() => navigate('/library/borrow-status')}><BookSearch size={20}/> Borrow Status</button>
                            <button className="h-10 px-4 justify-center items-center flex text-gray-500 font-bold transition-all duration-300 ease-in-out cursor-pointer gap-2 hover:bg-red-100 hover:text-red-500 hover:underline rounded-xl" onClick={handleLogout}><LogOut size={20}/></button>
                          </div>
                       </div>
                              
                              
        </nav>
    )
}
export default Lib_Navigation