import useAuthStore from '../store/useAuthStore'
import NotificationIcon from '../src/assets/notification-svgrepo-com.svg'
import RankingIcon from '../src/assets/crown-svgrepo-com.svg'

const Lib_Navigation = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
          logout();
    }
    
    return(
        <nav className="h-20 w-full border-b-1 border-pink-500 justify-between items-center flex px-6">
                              <div className=" rounded-xl justify-center items-center flex gap-2">
                                <img src="none" className='h-10 w-10 bg-gray-300 rounded-full' />
                                <h1 className="text-medium text-gray-800 font-semibold">{`Welcome! ${user?.firstname} ${user?.lastname}`}</h1>
                              </div>
                              <div className='gap-2 justify-center items-center flex'>
                                <button className='h-10 w-10 bg-gray-300 rounded-full'></button>
                                <button className='h-10 w-10 bg-pink-500 rounded-xl items-center flex justify-center'><img src={RankingIcon} className='h-5 w-5 object-cover' /></button>
                                <button className='h-10 w-10 bg-pink-500 rounded-xl'><img src={NotificationIcon} className='h-full w-full object-cover' /></button>
                
                                <button className="h-10 px-4 bg-white border-1 border-pink-500 text-pink-500 font-semibold rounded-xl transition-all duration-300 ease-in-out hover:scale-120 hover:text-white hover:bg-pink-500 cursor-pointer" onClick={handleLogout}>Logout</button>
                              </div>
                              
        </nav>
    )
}
export default Lib_Navigation