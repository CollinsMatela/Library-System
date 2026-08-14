import useAuthStore from '../store/useAuthStore'
import RankingIcon from '../src/assets/crown-svgrepo-com.svg'
import defaultProfile from '../src/assets/Student.jpg'
import NaicLibraryLogo from '../src/assets/NaicLibraryLogo.png'
import NotificationModal from '../modals/NotificationModal'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Blocks, BookSearch, BellDot, Info, BadgeInfo, User } from 'lucide-react'
import { useState } from 'react'
import ConfirmationPopup from '../popup/Confirmation_Popup'
import NotificationPopup from '../modals/NotificationModal'

const Lib_Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [isNotification, setIsNotification] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
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
      {isConfirmation && (<ConfirmationPopup message={'Do you want to logout?'} onConfirm={() => handleLogout()} onCancel={() => setIsConfirmation(false)}/>)}

        <nav className="fixed z-20 bg-white/50 backdrop-blur-sm h-15 w-full justify-center items-center flex px-6">

                       <div className='w-5xl justify-between items-center flex'>
                          <div className='h-full rounded-2xl flex gap-2 justify-center items-center'>
                            <div className=" bg-gray-100 h-8 w-8 rounded-full justify-center items-center flex cursor-pointer" onClick={() => navigate('/library')}>
                              <img src={NaicLibraryLogo} alt="Logo" className='h-full w-full object-cover rounded-xl'/>
                            </div>
                            <h1 className="text-medium text-stone-900 font-bold text-sm">Naic Municipal Library</h1>
                          </div>

                          <div className='gap-4 justify-center items-center flex'>
                            <button className={`${location.pathname === '/library' ? "border-b-2 border-stone-900 text-stone-900" : "bg-transparent text-stone-500"} py-2 justify-center items-center flex text-xs transition-all duration-300 ease-in-out cursor-pointer gap-2`} onClick={() => navigate('/library')}><Blocks size={15}/> Book Browse</button>
                            <button className={`${location.pathname === '/library/catalog' ? "border-b-2 border-stone-900 text-stone-900" : "bg-transparent text-stone-500"} py-2 justify-center items-center flex text-xs transition-all duration-300 ease-in-out cursor-pointer gap-2`} onClick={() => navigate('/library/catalog')}><BookSearch size={15}/> Search & Catalog</button>
                            <button className={`${location.pathname === '/library/borrow-status' ? "border-b-2 border-stone-900 text-stone-900" : "bg-transparent text-stone-500"} py-2 justify-center items-center flex text-xs transition-all duration-300 ease-in-out cursor-pointer gap-2`} onClick={() => navigate('/library/borrow-status')}><BadgeInfo size={15}/> Borrow Status</button>
                           
                           <div className='relative'>
                            <button className=" p-2 justify-center items-center flex font-bold transition-all duration-300 ease-in-out cursor-pointer gap-2 hover:bg-stone-200 hover:text-stone-500 rounded-full"
                             onClick={() => setIsNotification(prev => !prev)}>
                              <BellDot size={15} className={`${isNotification ? "text-stone-900" : "text-stone-500"}`}/>
                            </button>
                            {isNotification && (<NotificationPopup/>)}
                           </div>
                            

                            <div className='relative'>
                              <div className='justify-center items-center flex'>
                                {user.avatar ? 
                                (
                                 <button className='h-8 w-8 rounded-full cursor-pointer transition hover:border-2 border-blue-500' onClick={() => setIsProfile(prev => !prev)}>
                                  <img src={user?.avatar} alt="user-avatar"  className='h-full w-full rounded-full'/>
                                </button>
                                )
                                :
                                (
                                <button className='h-8 w-8 rounded-full bg-blue-600 cursor-pointer' onClick={() => setIsProfile(prev => !prev)}>
                                  <h1 className='text-white text-xs font-bold'>{user.firstname.slice(0, 1).toUpperCase()}</h1>
                                </button>
                                )}
                              </div>
                                
                                

                                {isProfile && (
                                  <div className={'absolute w-70 right-0 bg-white shadow-xl justify-start items-start flex flex-col border border-stone-300 rounded-xl gap-1'}>

                                    <div className='w-full justify-start items-start flex gap-2 border-b border-stone-300 p-4'>
                                      <div className='h-10 w-10'>
                                        {user.avatar ? 
                                        (<img src={user?.avatar} className='object-cover rounded-full' />)
                                        :
                                        (
                                          <div className='h-10 w-10 justify-center items-center flex rounded-full bg-blue-600'>
                                             <h1 className='text-white text-md font-bold'>{user.firstname.slice(0, 1).toUpperCase()}</h1>
                                          </div>
                                        )}
                                        
                                      </div>

                                      <div className='w-full justify-start items-start flex flex-col'>
                                        <h1 className='text-xs'>Hello, {user.firstname} {user.lastname}</h1>
                                        <h1 className='text-xs text-stone-500'>Welcome to the Digital Library.</h1>
                                      </div>
                                         
                                    </div>
                                    
                                    <div className='w-full flex flex-col gap-1'>
                                      <button className='px-4 py-2 justify-start items-start w-full flex gap-2 border-b border-stone-300  p-1 cursor-pointer'>
                                      <User size={15} className='text-stone-500'/>
                                      <h1 className='text-xs text-stone-500 hover:text-black' onClick={() => navigate('/library/my-account')}>My Account</h1>
                                    </button>
                                     <button className='px-4 py-2 justify-start items-start w-full flex gap-2 border-b border-b-stone-300 p-1 cursor-pointer' 
                                      onClick={() => setIsConfirmation(true)}>
                                        <LogOut size={15} className='text-stone-500'/>
                                        <h1 className='text-xs text-stone-500 hover:text-red-500'>Logout</h1>
                                      </button>
                                    </div>
                                    
                                </div>
                                )}
                                
                                
                            </div>

                          </div>
                       </div>
                              
                              
        </nav>
        </>
    )
}
export default Lib_Navigation