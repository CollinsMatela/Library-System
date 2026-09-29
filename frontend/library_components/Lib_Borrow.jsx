import Lib_Navigation from "./Lib_Navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { X, Hourglass, CheckCheck, Check, CalendarClock, Book, Info, MessageCircle, MessageCircleMore, Loader, LoaderCircle, Ellipse, Calendar, Ellipsis, HandHelping, ClockFading, Trash, BookOpen } from "lucide-react"
import useAuthStore from '../store/useAuthStore'
import Confirmation from '../popup/Confirmation_Popup'
import Footer from '../components/Footer'

const Lib_Borrow = () => {

    const user = useAuthStore((state) => state.user);
    const [showConfirmation, setConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [request, setRequest] = useState([]);

    const [isPending, setIsPending] = useState(true);
    const [isApprove, setIsApprove] = useState(false);
    const [isBorrow, setIsBorrow] = useState(false);
    const [isHistory, setIsHistory] = useState(false);

    const latestOrder = request.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const pendingList = latestOrder.filter((z) => z.status.toLowerCase() === 'pending');
    const approveList = latestOrder.filter((z) => z.status.toLowerCase() === 'approved');
    const borrowedList = latestOrder.filter((z) => z.status.toLowerCase() === 'borrowed');
    const historyList = latestOrder.filter((z) => z.status.toLowerCase() === 'returned');

    const fetchBorrow = async () => {
          try {
            console.log(user._id)
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-borrow/${user._id}`);
            setRequest(res.data.request);
            console.log(res.data.message);
          } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
          }
    }

    const deleteBorrow = async (requestId) => {
          try {
            console.log(requestId)
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-request/${requestId}`);
            toast.success(res.data.message);
            fetchBorrow();
            setConfirmation(false);
          } catch (error) {
            console.log(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
    }

    const handleConfirmation = (request) => {
          setSelectedRequest(request)
          setConfirmation(true);
    }

    useEffect(() => {
        setIsLoading(true);

            const loadData = async () =>{
                try {
                await fetchBorrow()

                } catch (error) {
                    toast.error('Failed to load the data.')
                } finally {
                    setIsLoading(false);
                }
            }

        loadData();
    },[])

    const handlePending = () => {
    setIsPending(true);
    setIsApprove(false);
    setIsBorrow(false);
    setIsHistory(false);
    };

    const handleApprove = () => {
        setIsPending(false);
        setIsApprove(true);
        setIsBorrow(false);
        setIsHistory(false);
    };

    const handleBorrow = () => {
        setIsPending(false);
        setIsApprove(false);
        setIsBorrow(true);
        setIsHistory(false);
    };

    const handleHistory = () => {
        setIsPending(false);
        setIsApprove(false);
        setIsBorrow(false);
        setIsHistory(true);
    };

    return(
        <>
        {showConfirmation && 
        (<Confirmation
        errorMessage={errorMessage}
        message={'Are you sure to delete this request?'}
        onConfirm={() => deleteBorrow(selectedRequest._id)}
        onCancel={() => setConfirmation(false)}
        />)}
        <Lib_Navigation/>
        <section className="min-h-screen w-full justify-center items-start flex bg-white">

                    <div className="w-5xl justify-center items-start flex flex-col rounded-2xl px-4 lg:px-0">
        
                        
                        <header className="w-fit mt-20 p-2 bg-white rounded-lg justify-center items-center flex border border-stone-300 shadow-sm gap-2 mb-4">
                            <div className="border border-stone-800 bg-stone-800 p-2 rounded-lg">
                                <Info size={15} className="text-white"/>
                            </div>
                            <div>
                                <h1 className="text-sm text-stone-800 font-bold">Request Status</h1>
                                <p className=" text-stone-500 text-[10px]">
                                    Oversee and manage your book request
                                </p>
                            </div>
                                
                        </header>

                        <div className="w-full flex flex-row mb-4   ">

                            <button
                                className={`${isPending ? 'border-b-3 border-stone-800' : 'border-b border-stone-300'} 
                                flex-1 cursor-pointer p-2 justify-center items-center flex rounded-t`}
                                onClick={() => handlePending()}
                            >
                                <h1 className={`${isPending ? 'text-stone-800 font-bold' : 'text-stone-500'} text-xs`}>
                                    Pending State <span>{pendingList.length || 0}</span>
                                </h1>
                            </button>

                            <button
                                className={`${isApprove ? 'border-b-3 border-stone-800' : 'border-b border-stone-300'} 
                                flex-1 cursor-pointer p-2 justify-center items-center flex rounded-t`}
                                onClick={() => handleApprove()}
                            >
                                <h1 className={`${isApprove ? 'text-stone-800 font-bold' : 'text-stone-500'} text-xs`}>
                                    Approved State <span>{approveList.length || 0}</span>
                                </h1>
                            </button>

                            <button
                                className={`${isBorrow ? 'border-b-3 border-stone-800' : 'border-b border-stone-300'} 
                                flex-1 cursor-pointer p-2 justify-center items-center flex rounded-t`}
                                onClick={() => handleBorrow()}
                            >
                                <h1 className={`${isBorrow ? 'text-stone-800 font-bold' : 'text-stone-500'} text-xs`}>
                                    Borrowed State <span>{borrowedList.length || 0}</span>
                                </h1>
                            </button>

                            <button
                                className={`${isHistory ? 'border-b-3 border-stone-800' : 'border-b border-stone-300'} 
                                flex-1 cursor-pointer p-2 justify-center items-center flex rounded-t`}
                                onClick={() => handleHistory()}
                            >
                                <h1 className={`${isHistory ? 'text-stone-800 font-bold' : 'text-stone-500'} text-xs`}>
                                    History State <span>{historyList.length || 0}</span>
                                </h1>
                            </button>

                        </div>

                        {isLoading ? 
                        (
                            <div className="w-full justify-center items-center flex  mt-4">
                                <LoaderCircle size={20} className="text-stone-500 animate-spin"/>
                            </div>
                        )
                        :
                        (
                         <div className="w-full flex flex-col lg:flex-row gap-4">
                         
                            
                        

                         <div className="flex flex-col gap-2 w-full">
                            
                                {isPending && (
                                    pendingList.length > 0 ? (pendingList.map((pending) => (
                                        
                                        <div key={pending._id} className="w-full justify-center items-center flex gap-2 border border-stone-300 p-2 rounded-lg">
                                            <div className="bg-yellow-500 p-2 rounded-lg">
                                            <Ellipsis size={15} className="text-white"/> 
                                            </div>

                                            <div className="justify-center items-center flex gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-xs font-semibold text-stone-800 justify-center items-center flex gap-2">{pending.title} </h1>
                                                    <h2 className="text-[10px] text-stone-400">Requested date — {new Date(pending.createdAt).toDateString()}</h2>
                                                </div>

                                                <div className="justify-end items-center flex">
                                                <button className="p-2 text-white bg-red-600 text-xs w-full sm:w-fit justify-center sm:justify-end rounded-lg items-center flex gap-1 hover:bg-red-700 cursor-pointer"
                                                title="Remove Request" 
                                                onClick={() => handleConfirmation(pending)}
                                                ><Trash size={15}/>
                                                </button>
                                                </div>

                                                

                                            </div>
                                                
                                            </div>
                
                                        
                                    )
                                
                                )) : (
                                    <div className="w-full min-h-40 bg-stone-100 border border-stone-100 rounded-xl flex flex-col justify-center items-center gap-2 p-6">
                                            <div className="w-10 h-10 rounded-full bg-stone-200 flex justify-center items-center">
                                                <BookOpen size={18} className="text-stone-400" />
                                            </div>

                                            <div className="text-center">
                                                <h1 className="text-xs font-medium text-stone-800">
                                                    No Pending Request
                                                </h1>

                                                <p className="text-[10px] text-stone-500 mt-1">
                                                    You don't have any pending book requests yet.
                                                </p>
                                            </div>
                                        </div>
                                )
                                    
                                )}

                                {isApprove && (
                                    approveList.length > 0 ? 
                                    (approveList.map((approve) => (
                                        
                                        <div key={approve._id} className="w-full justify-center items-center flex gap-2 border border-stone-300 p-2 rounded-lg">
                                            <div className="bg-blue-600 p-2 rounded-lg">
                                            <Check size={15} className="text-white"/> 
                                            </div>

                                            <div className="justify-center items-center flex gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-xs font-semibold text-stone-800 justify-center items-center flex gap-2">{approve.title} </h1>
                                                    <h2 className="text-[10px] text-stone-400">Requested date — {approve.createdAt.split('T')[0]}</h2>
                                                </div>

                                                <div className="justify-end items-center flex">
                                                <button className="p-2 text-white bg-red-600 text-xs w-full sm:w-fit justify-center sm:justify-end rounded-lg items-center flex gap-1 hover:bg-red-700 cursor-pointer"
                                                title="Remove Request"
                                                onClick={() => handleConfirmation(approve)}
                                                ><Trash size={15}/>
                                                </button>
                                                </div>

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))) : (
                                        <div className="w-full min-h-40 bg-stone-100 border border-stone-100 rounded-xl flex flex-col justify-center items-center gap-2 p-6">
                                            <div className="w-10 h-10 rounded-full bg-stone-200 flex justify-center items-center">
                                                <BookOpen size={18} className="text-stone-400" />
                                            </div>

                                            <div className="text-center">
                                                <h1 className="text-xs font-medium text-stone-800">
                                                    No Approved Request
                                                </h1>

                                                <p className="text-[10px] text-stone-500 mt-1">
                                                    You don't have any approved book requests yet.
                                                </p>
                                            </div>
                                        </div>
                                    )
                                    
                                )}

                                {isBorrow && (
                                    borrowedList.length > 0 ? (borrowedList.map((borrow) => (
                                        
                                        <div key={borrow._id} className="w-full justify-center items-center flex gap-2 border border-stone-300 p-2 rounded-lg">
                                            <div className="bg-orange-600 p-2 rounded-lg">
                                            <ClockFading size={15} className="text-white"/> 
                                            </div>

                                            <div className="justify-center items-center flex gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-xs font-semibold text-stone-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                                                    <h2 className="text-[10px] text-stone-400">Return date — {borrow.returnDate.split()[0]}</h2>
                                                </div>

                                                <div className="border-0 sm:border-l border-stone-300 px-2 flex flex-col">
                                                     <h1 className="text-xs text-stone-500">Quantity</h1>
                                                     <h1 className="text-xs text-stone-500">{borrow.quantity}</h1>
                                                </div>

                                                

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))) : (
                                         <div className="w-full min-h-40 bg-stone-100 border border-stone-100 rounded-xl flex flex-col justify-center items-center gap-2 p-6">
                                            <div className="w-10 h-10 rounded-full bg-stone-200 flex justify-center items-center">
                                                <BookOpen size={18} className="text-stone-400" />
                                            </div>

                                            <div className="text-center">
                                                <h1 className="text-xs font-medium text-stone-800">
                                                    No Borrowed Book
                                                </h1>

                                                <p className="text-[10px] text-stone-500 mt-1">
                                                    You don't have any borrowed book yet.
                                                </p>
                                            </div>
                                        </div>
                                    )
                                    
                                )}

                                {isHistory && (
                                    historyList.length > 0 ? (historyList.map((history) => (
                                        
                                        <div key={history._id} className="w-full justify-center items-center flex gap-2 border border-stone-300 p-2 rounded-lg">
                                            <div className="bg-green-600 p-2 rounded-lg">
                                            <CheckCheck size={15} className="text-white"/> 
                                            </div>

                                            <div className="justify-center items-center flex gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-xs font-semibold text-stone-800 justify-center items-center flex gap-2">{history.title} </h1>
                                                    <h2 className="text-[10px] text-stone-400">Return Date — {history.returnDate.split()[0]}</h2>
                                                </div>

                                                <div className="bg-green-600 p-1 rounded-lg flex">
                                                     <h1 className="text-[10px] text-white">Returned</h1>
                                                </div>

                                                

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))) : (
                                        <div className="w-full min-h-40 bg-stone-100 border border-stone-100 rounded-xl flex flex-col justify-center items-center gap-2 p-6">
                                            <div className="w-10 h-10 rounded-full bg-stone-200 flex justify-center items-center">
                                                <BookOpen size={18} className="text-stone-400" />
                                            </div>

                                            <div className="text-center">
                                                <h1 className="text-xs font-medium text-stone-800">
                                                    No Borrowed History
                                                </h1>

                                                <p className="text-[10px] text-stone-500 mt-1">
                                                    You don't have any borrowed history yet.
                                                </p>
                                            </div>
                                        </div>
                                    )
                                    
                                )}

                        </div> 
                        </div>  
                        )}
                        
                         
                        
                        
        
                    </div>
        
                </section>
        </>
    )
}
export default Lib_Borrow