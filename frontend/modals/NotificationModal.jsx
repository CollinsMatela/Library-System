import { ArrowRight, Info, LoaderCircle } from "lucide-react";
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
        <section className="fixed h-full w-full z-50">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="absolute right-30 top-15 bg-white h-[91vh] w-100 p-6 border-l border-gray-300 overflow-y-scroll">
                <div className="w-full justify-between items-center flex pb-4 border-b border-gray-300">
                    <h1 className="text-lg font-bold">Notifications</h1>
                    <button onClick={onClose} className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition text-gray-500"><ArrowRight size={15}/></button>
                </div>

                {isLoading ? 
                (
                    <div className="p-2 w-full justify-center items-center flex rounded-xl">
                        <LoaderCircle size={15} className="text-gray-500 animate-spin"/>
                        </div>
                )
                :
                (
                    <div className="w-full">
                    {filteredNotification.length === 0 && (
                    filteredNotification.map((notif) => (
                        <div className="p-4 bg-gray-200 justify-center items-center flex gap-1 mt-2">
                         <Info size={20} className="text-gray-500"/>
                         <h1 className="text-xs text-gray-500">No Notifications Found.</h1>
                        </div>
                        ))
                    )}

                    {filteredNotification.length > 0 && (
                        filteredNotification.map((notif) => (
                            <div className="w-full p-4 mt-2 bg-white border border-gray-300 rounded-xl justify-start items-center flex gap-2">
                                <div className="relative h-8 w-8 justify-center items-center flex">
                                    <div className="absolute inset-0 bg-gray-100/50 rounded-full"></div>
                                    <img src={NaicMunicupalLogo} alt="library-logo" className="object-cover"/>
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-between item-center">
                                        <h1 className="text-xs font-medium text-stone-800">{notif.title} <span className="text-xs text-stone-400 font-normal">• {new Date(notif.createdAt).toLocaleDateString("en-US", {month: 'short', day: '2-digit'})}</span></h1>
                                    </div>  
                                    <h1 className="text-xs text-stone-400">{notif.message}</h1>
                                </div>
                               
                            </div>
                        ))
                    )}
                    </div>
                )}
                
                
            </div>
            

        </section>
    )
}
export default NotificationModal;