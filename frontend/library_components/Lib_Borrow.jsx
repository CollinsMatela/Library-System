import Lib_Navigation from "./Lib_Navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { X, Hourglass, CheckCheck, Check, CalendarClock, Book, Info, MessageCircle, MessageCircleMore, Loader, LoaderCircle } from "lucide-react"
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

    const inOrderRequest = request.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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

    return(
        <>
        {showConfirmation && 
        (<Confirmation
        errorMessage={errorMessage}
        message={'Are you sure to delete this request?'}
        onConfirm={() => deleteBorrow(selectedRequest._id)}
        onCancel={() => setConfirmation(false)}
        />)}
        <section className="min-h-screen w-full bg-gray-50">
        <Lib_Navigation/>
                    <div className="w-full justify-center items-center flex flex-col rounded-2xl px-10">
        
                        <div className='w-5xl flex flex-col'>
                            <header className="w-full mt-20">
                                    <h1 className="text-xl font-bold">Request Status</h1>
                                    <p className="mt-2 text-gray-600 text-xs">
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
                         <div className="h-100 w-5xl flex flex-col gap-2 mt-4 overflow-y-auto">
                            {inOrderRequest?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-100">
                                    <h2 className="text-sm font-semibold text-gray-700">
                                        No Borrow Requests
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        You haven't requested any books yet.
                                    </p>
                                </div>
                            ) : (
                                inOrderRequest.map((req) => (
                                    <div
                                        key={req._id}
                                        className="flex items-start justify-between border bg-white border-gray-300 rounded-xl p-5 transition duration-200"
                                    >
                                        <div>
                                            <div className="justify-center items-center flex gap-1">
                                                <div className="bg-gray-200 rounded-full p-2">
                                                    <Book size={15}/>
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-semibold text-gray-800">{req.title}</h2>
                                                    <div className="justify-start items-center flex gap-2">
                                                    <p className="text-xs text-gray-500">Requested on{" "}{new Date(req.createdAt).toLocaleDateString()}</p>
                                                    <span className={`justify-center items-center flex gap-1 text-xs font-semibold
                                                    ${
                                                        req.status === "Pending"
                                                        ? " text-yellow-500"
                                                        : req.status === "Approved"
                                                        ? " text-blue-500"
                                                        : req.status === "Borrowed"
                                                        ? " text-orange-500"
                                                        : req.status === "Returned"
                                                        ? " text-green-500"
                                                        : "bg-red-100 text-red-700"}`}><Info size={10}/>{req.status}
                                                    </span>
                                                    </div>
                                                </div>
                                                
                                            </div>


                                        </div>

                                        <div className="h-full w-fit justify-center items-center flex">
                                            {req.status === 'Pending' && (<h1 className="text-xs text-gray-400 font-md justify-center items-center flex gap-1"><MessageCircleMore size={15}/> Currently in review. Please keep waiting!</h1>)}
                                            {req.status === 'Approved' && (<h1 className="text-xs text-gray-400 font-md justify-center items-center flex gap-1"><MessageCircleMore size={15}/> Proceed to library and bring your VALID ID.</h1>)}
                                            {req.status === 'Borrowed' && (<h1 className="text-xs text-gray-400 font-md justify-center items-center flex gap-1"><MessageCircleMore size={15}/>{`Please return until ${req.returnDate}`}</h1>)}
                                            {req.status === 'Returned' && (<h1 className="text-xs text-gray-400 font-md justify-center items-center flex gap-1  "><MessageCircleMore size={15}/>Successfully Returned.</h1>)}
                                        </div>

                                        <div className="justify-center items-center flex gap-2">
                                            
                                        {(req.status === 'Pending' || req.status === 'Approved') && 
                                        (
                                        <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-xl cursor-pointer"
                                        title="Remove Request"
                                        onClick={() => handleConfirmation(req)}
                                        ><X size={15}/>
                                        </button>
                                        )}
                                        
                                        </div>
                                        
                                    </div>
                                ))
                            )}
                        </div>   
                        )}
                        
                         
                        
                        
        
                    </div>
        
                </section>
                 <Footer/>
        </>
    )
}
export default Lib_Borrow