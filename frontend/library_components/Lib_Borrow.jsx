import Lib_Navigation from "./Lib_Navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { X, Hourglass, CheckCheck, Check, CalendarClock, Book, Info, MessageCircle, MessageCircleMore, Loader, LoaderCircle, Ellipse, Calendar, Ellipsis, HandHelping, ClockFading } from "lucide-react"
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

    const [isPending, setIsPending] = useState(false);
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
        <section className="min-h-screen w-full bg-stone-50">
        <Lib_Navigation/>
                    <div className="w-full justify-center items-center flex flex-col rounded-2xl px-10">
        
                        <div className='w-5xl flex flex-col'>
                            <header className="w-full mt-20">
                                    <h1 className="text-xl font-bold">Request Status</h1>
                                    <p className="mt-2 text-stone-600 text-xs">
                                        Browse educational resources, fiction, and non-fiction books available in the library.
                                    </p>
                            </header>
                        </div>
                        {isLoading ? 
                        (
                            <div className="w-5xl justify-center items-center flex  mt-4">
                                <LoaderCircle size={20} className="animate-spin"/>
                            </div>
                        )
                        :
                        (
                         <div className="w-5xl flex gap-4 my-10">
                         
                            <div  className='w-80 justify-start items-start flex flex-col gap-2 border-r border-stone-500 pr-4'>
                                <button
                                    className={`${isPending ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-start items-start flex`}
                                    onClick={() => handlePending()}
                                >
                                    <h1 className={`${isPending ? 'text-white' : 'text-stone-500'} text-xs`}>
                                        Pending Status
                                    </h1>
                                </button>

                                <button
                                    className={`${isApprove ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-start items-start flex`}
                                    onClick={() => handleApprove()}
                                >
                                    <h1 className={`${isApprove ? 'text-white' : 'text-stone-500'} text-xs`}>
                                        Approved Status
                                    </h1>
                                </button>

                                <button
                                    className={`${isBorrow ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-start items-start flex`}
                                    onClick={() => handleBorrow()}
                                >
                                    <h1 className={`${isBorrow ? 'text-white' : 'text-stone-500'} text-xs`}>
                                        Borrowed Status
                                    </h1>
                                </button>

                                <button
                                    className={`${isHistory ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-start items-start flex`}
                                    onClick={() => handleHistory()}
                                >
                                    <h1 className={`${isHistory ? 'text-white' : 'text-stone-500'} text-xs`}>
                                        History Status
                                    </h1>
                                </button>
                            </div>
                        

                         <div className="flex flex-col gap-2 w-full">
                            
                                {isPending && (
                                    pendingList.map((pending) => (
                                        
                                        <div key={pending._id} className="w-full justify-start items-center flex gap-2 border border-stone-300 p-4 rounded-xl">
                                            <div className="bg-yellow-500 p-2 rounded-lg">
                                            <Ellipsis size={15} className="text-white"/> 
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-sm font-semibold text-stone-800 justify-center items-center flex gap-2">{pending.title} </h1>
                                                    <h2 className="text-xs text-stone-400">Requested date — {pending.createdAt.split('T')[0]}</h2>
                                                </div>

                                                <div className="justify-end items-center flex">
                                                <button className="p-2 text-stone-500 text-xs w-fit justify-end items-center flex gap-1 hover:bg-stone-200 cursor-pointer"
                                                title="Remove Request"
                                                onClick={() => handleConfirmation(req)}
                                                ><X size={15}/> Remove
                                                </button>
                                                </div>

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))
                                    
                                )}

                                {isApprove && (
                                    approveList.map((approve) => (
                                        
                                        <div key={approve._id} className="w-full justify-start items-center flex gap-2 border border-stone-300 p-4 rounded-xl">
                                            <div className="bg-blue-600 p-2 rounded-lg">
                                            <Check size={15} className="text-white"/> 
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-sm font-semibold text-stone-800 justify-center items-center flex gap-2">{approve.title} </h1>
                                                    <h2 className="text-xs text-stone-400">Requested date — {approve.createdAt.split('T')[0]}</h2>
                                                </div>

                                                <div className="justify-end items-center flex">
                                                <button className="p-2 text-stone-500 text-xs w-fit justify-end items-center flex gap-1 hover:bg-stone-200 cursor-pointer"
                                                title="Remove Request"
                                                onClick={() => handleConfirmation(req)}
                                                ><X size={15}/> Remove
                                                </button>
                                                </div>

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))
                                    
                                )}

                                {isBorrow && (
                                    borrowedList.map((borrow) => (
                                        
                                        <div key={borrow._id} className="w-full justify-start items-center flex gap-2 border border-stone-300 p-4 rounded-xl">
                                            <div className="bg-orange-600 p-2 rounded-lg">
                                            <ClockFading size={15} className="text-white"/> 
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-sm font-semibold text-stone-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                                                    <h2 className="text-xs text-stone-400">Return date — {borrow.returnDate.split()[0]}</h2>
                                                </div>

                                                <div className="border-l border-stone-300 px-2 flex flex-col">
                                                     <h1 className="text-xs text-stone-500">Quantity</h1>
                                                     <h1 className="text-xs text-stone-500">{borrow.quantity}</h1>
                                                </div>

                                                

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))
                                    
                                )}

                                {isHistory && (
                                    historyList.map((history) => (
                                        
                                        <div key={history._id} className="w-full justify-start items-center flex gap-2 border border-stone-300 p-4 rounded-xl">
                                            <div className="bg-green-600 p-2 rounded-lg">
                                            <CheckCheck size={15} className="text-white"/> 
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="justify-start items-start flex flex-col w-full">
                                                    <h1 className="text-sm font-semibold text-stone-800 justify-center items-center flex gap-2">{history.title} </h1>
                                                    <h2 className="text-xs text-stone-400">Return Date — {history.returnDate.split()[0]}</h2>
                                                </div>

                                                <div className="border-l border-stone-300 px-2 flex flex-col">
                                                     <h1 className="text-xs text-stone-500">Quantity</h1>
                                                     <h1 className="text-xs text-stone-500">{history.quantity}</h1>
                                                </div>

                                                

                                                

                                                </div>
                                                
                                            </div>
                
                                        
                                    ))
                                    
                                )}

                        </div> 
                        </div>  
                        )}
                        
                         
                        
                        
        
                    </div>
        
                </section>
                 <Footer/>
        </>
    )
}
export default Lib_Borrow