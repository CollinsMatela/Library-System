import { ArrowLeft, ArrowRight, Info, LoaderCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NaicMunicupalLogo from '../src/assets/NaicLibraryLogo.png'
import useAuthStore from "../store/useAuthStore"

const NotificationModal = ({onClose}) => {
    const user = useAuthStore((state) => state.user);
    const [notifications, setNotifications] = useState([]);
    const [filteredNotification, setFilteredNotification] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadData = async () => {
              setIsLoading(true)
               try {
                await Promise.all([fetchNotifications(), fetchAllBorrow()])
               } catch (error) {
                toast.error('Failed to load the notifications');
               } finally {
                setIsLoading(false)
               }
        }
        loadData();
    }, [])

    useEffect(() => {
        const UserNotification = notifications.filter((notif) => notif.recipient === user._id).reverse();
        const GlobalNotification = notifications.filter((notif) => notif.recipient === null).reverse();
        setFilteredNotification([...GlobalNotification, ...UserNotification])
    },[notifications])

    useEffect(() => {
        
       DueNotification(borrows)
    },[borrows])

    const DueNotification = async (borrows) => {
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/due-notifications`, {borrows: borrows});
            console.log(res.data.message);

          } catch (error) {
            toast.error(error?.response?.data?.message)
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const fetchNotifications = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-notifications`);
            setNotifications(res.data.notifications);
            console.log(res.data.message);

          } catch (error) {
            toast.error(error?.response?.data?.message)
            setErrorMessage(error?.response?.data?.message)
          }
    }
    const fetchAllBorrow = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrows(res.data.borrows);
            toast.success(res.data.borrows);
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    return(

            <div className="absolute right-0 bg-white w-95 lg:w-100 rounded-xl shadow-sm border border-gray-300">
                <div className="w-full justify-between items-start flex p-4 border-b border-gray-300">
                    <div>
                     <h1 className="text-lg font-bold">Notifications</h1>
                     <p className="text-xs text-stone-500">Stay informed about your library activities.</p>   
                    </div>
                    <button className="cursor-pointer " onClick={onClose}>
                        <ArrowLeft size={15}/>
                    </button>
                    
                </div>

                {isLoading ? 
                (
                    <div className="p-2 w-full justify-center items-center flex rounded-xl">
                        <LoaderCircle size={15} className="text-gray-500 animate-spin"/>
                        </div>
                )
                :
                (
                    <div className="w-full h-100 overflow-y-auto">
                    {filteredNotification.length === 0 && (
                        <div className="p-4 bg-gray-200 rounded-xl justify-center items-center flex gap-1 mt-2">
                         <Info size={15} className="text-gray-500"/>
                         <h1 className="text-xs text-gray-500">No Notifications Found.</h1>
                        </div>
                    )}

                    {filteredNotification.length > 0 && (
                        filteredNotification.map((notif) => (
                            <div className="min-h-15 w-full bg-white px-4 border-b border-stone-300 justify-start items-center flex gap-2">
                                <div className="relative h-8 w-8 justify-center items-center flex">
                                    <div className="absolute inset-0 bg-gray-100/50 rounded-full"></div>
                                    <img src={NaicMunicupalLogo} alt="library-logo" className="object-cover"/>
                                </div>
                                <div className="w-full">
                                    <h1 className={`text-stone-800 text-xs font-medium`}>{notif.title} <span className="text-xs text-stone-400 font-normal">• {new Date(notif.createdAt).toLocaleDateString("en-US", {month: 'short', day: '2-digit'})}</span></h1>
                                    <h1 className="text-xs text-stone-400">{notif.message}</h1>
                                </div>
                               
                            </div>
                        ))
                    )}
                    </div>
                )}
                
                
            </div>
            
    )
}
export default NotificationModal;