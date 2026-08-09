import useAuthStore from '../store/useAuthStore'
import RankingIcon from '../src/assets/crown-svgrepo-com.svg'
import defaultProfile from '../src/assets/Student.jpg'
import NaicLibraryLogo from '../src/assets/NaicLibraryLogo.png'
import NotificationModal from '../modals/NotificationModal'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Blocks, BookSearch, BellDot, Info, BadgeInfo } from 'lucide-react'
import { useState } from 'react'
import ConfirmationPopup from '../popup/Confirmation_Popup'

const Lib_Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [isNotification, setIsNotification] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);

    const handleLogout = () => {
          logout();
          navigate('/');
    }
    const handleProfile = () => {
          navigate('/library/profile');
    }
    
    return(
      <>
      {isNotification && (<NotificationModal onClose={() => setIsNotification(false)}/>)}
      {isConfirmation && (<ConfirmationPopup message={'Do you want to logout?'} onConfirm={() => handleLogout} onCancel={() => setIsConfirmation(false)}/>)}

        <nav className="fixed z-20 bg-white/50 backdrop-blur-sm h-15 w-full justify-center items-center flex px-6">

                       <div className='w-5xl justify-between items-center flex'>
                          <div className='h-full rounded-2xl flex gap-2 justify-center items-center'>
                            <div className=" bg-gray-100 h-8 w-8 rounded-full justify-center items-center flex cursor-pointer" onClick={() => navigate('/library')}>
                              <img src={NaicLibraryLogo} alt="Logo" className='h-full w-full object-cover rounded-xl'/>
                            </div>
                            <h1 className="text-medium text-black font-bold text-sm">Naic Municipal Library</h1>
                          </div>

                          <div className='gap-4 justify-center items-center flex'>
                            <button className={`${location.pathname === '/library' ? "border-b-2 border-black text-black" : "bg-transparent text-gray-500"} py-2 justify-center items-center flex text-xs transition-all duration-300 ease-in-out cursor-pointer gap-2`} onClick={() => navigate('/library')}><Blocks size={15}/> Book Browse</button>
                            <button className={`${location.pathname === '/library/catalog' ? "border-b-2 border-black text-black" : "bg-transparent text-gray-500"} py-2 justify-center items-center flex text-xs transition-all duration-300 ease-in-out cursor-pointer gap-2`} onClick={() => navigate('/library/catalog')}><BookSearch size={15}/> Search & Catalog</button>
                            <button className={`${location.pathname === '/library/borrow-status' ? "border-b-2 border-black text-black" : "bg-transparent text-gray-500"} py-2 justify-center items-center flex text-xs transition-all duration-300 ease-in-out cursor-pointer gap-2`} onClick={() => navigate('/library/borrow-status')}><BadgeInfo size={15}/> Borrow Status</button>

                            <button className=" p-2 justify-center items-center flex font-bold transition-all duration-300 ease-in-out cursor-pointer gap-2 hover:bg-stone-200 hover:text-stone-500 rounded-full"
                             onClick={() => setIsNotification(true)}>
                              <BellDot size={15} className={`${isNotification ? "text-black" : "text-gray-500"}`}/>
                            </button>

                            <button className='h-7 w-7 rounded-full bg-blue-600'>
                              <h1 className='text-white text-xs font-bold'>{user.firstname.slice(0, 1).toUpperCase()}</h1>
                            </button>
                            <button className="p-2 justify-center items-center flex text-gray-500 font-bold transition-all duration-300 ease-in-out cursor-pointer gap-2 hover:bg-red-100 hover:text-red-500 rounded-full" 
                            onClick={() => setIsConfirmation(true)}>
                              <LogOut size={15}/>
                              </button>
                          </div>
                       </div>
                              
                              
        </nav>
        </>
    )
}
export default Lib_Navigation