import Lib_Navigation from "./Lib_Navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { X } from "lucide-react"
import useAuthStore from '../store/useAuthStore'
import Confirmation from '../popup/Confirmation_Popup'

const Lib_Borrow = () => {

    const user = useAuthStore((state) => state.user);
    const [showConfirmation, setConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [request, setRequest] = useState([]);

    const fetchBorrow = async () => {
          try {
            console.log(user._id)
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-borrow/${user._id}`);
            setRequest(res.data.request);
            console.log(res.data.message);
            toast.success(res.data.message);
          } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
          }
    }

    const deleteBorrow = async (requestId) => {
          try {
            // console.log(requestId)
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-request/${requestId}`);
            toast.success(res.data.message);
            fetchBorrow();
            setConfirmation(false);
          } catch (error) {
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
    }

    const handleConfirmation = (request) => {
          setSelectedRequest(request)
          setConfirmation(true);
    }

    useEffect(() => {
        fetchBorrow();
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
        <section className="min-h-screen w-full">
        <Lib_Navigation/>
                    <div className="w-full justify-center items-center flex flex-col rounded-2xl px-10">
        
                        <div className='w-7xl flex flex-col gap-10 bg-white'>
                            <header className="w-full mt-10">
                                    <h1 className="text-3xl font-bold">Request Status</h1>
                                    <p className="mt-2 text-gray-600">
                                        Browse educational resources, fiction, and non-fiction books available in the library.
                                    </p>
                            </header>
                        </div>
                        <div className="w-7xl flex flex-col gap-4 bg-white mt-4">
                            {request?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 rounded-xl bg-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-700">
                                        No Borrow Requests
                                    </h2>
                                    <p className="mt-2 text-gray-500">
                                        You haven't requested any books yet.
                                    </p>
                                </div>
                            ) : (
                                request.map((req) => (
                                    <div
                                        key={req._id}
                                        className="flex items-center justify-between border border-gray-300 rounded-xl p-5 transition duration-200"
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {req.title}
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Requested on{" "}
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="justify-center items-center flex gap-2">
                                            <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold
                                                ${
                                                    req.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : req.status === "Approved"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : req.status === "Borrowed"
                                                        ? "bg-green-100 text-green-700"
                                                        : req.status === "Returned"
                                                        ? "bg-gray-100 text-gray-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {req.status}
                                        </span>
                                        <button className="px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 cursor-pointer"
                                        onClick={() => handleConfirmation(req)}
                                        ><X size={20} color="white"/></button>
                                        </div>
                                        
                                    </div>
                                ))
                            )}
                        </div>
                         
                        
                        
        
                    </div>
        
                </section>
        </>
    )
}
export default Lib_Borrow