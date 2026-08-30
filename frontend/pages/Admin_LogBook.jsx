import Admin_SideBar from "../components/Admin_Sidebar"
import { Plus, Check, Users, LoaderCircle } from "lucide-react"
import LogBookModal from "../modals/LogBookModal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'
import Confirmation from '../popup/Confirmation_Popup'

const Admin_LogBook = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [showLogBook, setShowLogBook] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const [logBookList, setLogBookList] = useState([]);
    const orderedLogBookList = [...logBookList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const [logBook, setLogBook] = useState({
    name: "",
    address: "",
    contact: "",
    purpose: "",
    leaveTime: null,
    });

    const updateLeaveTime = async () => {

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-leave`, {id: selectedVisitor});
            console.log(res.data.message);
            toast.success(res.data.message);
            fetchLogBook();
            setShowConfirmation(false);
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
          }
    }

    const LeaveConfirmation = (visitor) => {
          setErrorMessage('');
          setSelectedVisitor(visitor._id);
          setShowConfirmation(true)
    }

    useEffect(() => {
        setIsLoading(true)
        const loadData = async () => {
              try {
                await fetchLogBook()
              } catch (error) {
                console.log(error);
                toast.error("Failed to load data")
              } finally {
                setIsLoading(false)
              }
        }
        loadData()
    },[])

    const fetchLogBook = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-all-logbook`);
            console.log(res.data.message);
            setLogBookList(res.data.logBookList);

        } catch (error) {
            toast.error(error.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    }

    const resetState = () => {
        setLogBook((prev) => ({
            ...prev,
            name: "",
            address: "",
            contact: "",
            purpose: "",
        }))
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register-visitor`, logBook);
            console.log(res.data.message);
            toast.success(res.data.message);
            fetchLogBook()
            resetState();
            setShowLogBook(false);

        } catch (error) {
            toast.error(error.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
        };

    const confirmation = () => {
          if(!logBook.name || !logBook.address || !logBook.contact){
             toast.warning('Please fill the name and address')
             return
          }
          handleSubmit();
    }

    return(
        <>
        {showLogBook && (<LogBookModal logBook={logBook} 
        setLogBook={setLogBook} 
        confirmation={confirmation}
        onClose={() => setShowLogBook(false)}/>)}

        {showConfirmation && (<Confirmation 
        errorMessage={errorMessage} 
        message={'Is visitor going to leave?'} 
        onConfirm={() => updateLeaveTime(selectedVisitor)} 
        onCancel={() => setShowConfirmation(false)}/>)}

        <Admin_SideBar/>

        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-70">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Logbook Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage borrow request from user</h1>                   
              </header>

            <div className="w-full justify-between items-start flex flex-col mb-10 pb-10 px-4 md:px-10">

                <div className="flex items-start justify-between gap-2 w-full mb-4">
                            
                            <div className="justify-center items-center flex gap-2">
                                <div className="hidden sm:flex bg-stone-800 p-2 text-white justify-center items-center">
                                    <Users size={20}/>
                                </div>
                                <div>
                                    <h1 className="text-md font-bold text-stone-800 rounded-full">Library Visitor</h1>
                                    <p className="text-stone-400 text-xs">List of people entered library.</p>
                                </div>
                            </div>
                            
                            <div>
                                <button className="bg-stone-800 p-2 text-white text-xs cursor-pointer hover:-translate-y-1 justify-center items-center flex gap-2"
                                onClick={() => setShowLogBook(true)}
                                ><Plus size={15}/> Add Visitor
                                </button> 
                            </div>
                </div>
                
                <div className="w-full border-0 lg:border border-stone-300 lg:rounded-xl lg:p-2">

                
                <div className="hidden lg:grid grid-cols-9 w-full bg-stone-100 rounded-t-xl px-4 py-3 mb-2">
                            <h1 className="text-xs text-stone-500">No.</h1>
                            <h1 className="text-xs text-stone-500">Name</h1>
                            <h1 className="text-xs text-stone-500">Address</h1>
                            <h1 className="text-xs text-stone-500">Contact</h1>
                            <h1 className="text-xs text-stone-500">Purpose</h1>
                            <h1 className="text-xs text-stone-500">Date</h1>
                            <h1 className="text-xs text-stone-500">Time In</h1>
                            <h1 className="text-xs text-stone-500">Time Out</h1>
                            <h1 className="text-xs text-stone-500">Action</h1>
                </div>
                
                {isLoading ? 
                (
                <div className="w-full justify-center items-center flex p-4">
                    <LoaderCircle size={20} className="text-stone-500 animate-spin"/>
                </div>
                )
                :
                (
                    <>
                    {orderedLogBookList.length === 0 && (
                    <div className="w-full bg-stone-200 rounded-xl p-4 text-xs justify-center items-center flex">No Visitor Listed</div>
                )}

                {orderedLogBookList.length > 0 &&
                orderedLogBookList.map((log, index) => (
                    <div
                    key={log._id}
                    className={`w-full bg-white justify-between items-start flex flex-col lg:flex-row px-2 mb-1 border-0 lg:border-b border-stone-300 border-l-2 ${log.leaveTime ? "border-l-blue-500" : "border-l-yellow-500"}`}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-9 gap-2 w-full lg:p-2">
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">No.</span>{index + 1}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Name:</span>{log.name}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Address:</span>{log.address}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Contact:</span>{log.contact}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Purpose:</span>{log.purpose}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Date:</span>{new Date(log.createdAt).toISOString().split("T")[0]}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Time In:</span>{new Date(log.createdAt).toLocaleTimeString()}</h1>
                            <h1 className="text-xs text-stone-500 justify-between items-center flex"><span className="lg:hidden">Time Out:</span>{log.leaveTime
                                                                                                    ? new Date(log.leaveTime).toLocaleTimeString()
                                                                                                    : ""}</h1>
                            <div className="w-full lg:w-fit justify-end items-center flex border-y lg:border-0 border-stone-300 py-2 lg:p-0">
                            <button 
                            disabled={log.leaveTime}
                            className={`${!log.leaveTime ? "bg-stone-800 hover:bg-stone-900 cursor-pointer" : "bg-stone-200 cursor-not-allowed"} text-white w-fit justify-center items-center flex p-2 rounded-lg`} 
                            onClick={() => LeaveConfirmation(log)}><Check size={15}/>
                            </button>   
                            </div>
                        </div>
                        
                    </div>
                ))
                }
                    </>
                )}
                </div>
                
            </div>

        </section>
        </>
    )
}
export default Admin_LogBook