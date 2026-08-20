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

        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pl-70">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-stone-300 p-3 px-10">
                    <h1 className="text-sm font-bold text-stone-800">Logbook Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage borrow request from user</h1>                   
              </header>

            <div className="w-full justify-between items-start flex flex-col mb-10 pb-10 px-10">

                <div className="flex items-start justify-between gap-2 w-full mb-4">
                            
                            <div className="justify-center items-center flex gap-2">
                                <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                                    <Users size={20}/>
                                </div>
                                <div>
                                    <h1 className="text-md font-bold text-stone-800 rounded-full">Library Visitor</h1>
                                    <p className="text-stone-400 text-xs">List of people entered library.</p>
                                </div>
                            </div>
                            
                            <div>
                                <button className="bg-stone-800 py-2 px-2 text-white text-xs cursor-pointer hover:-translate-y-1 justify-center items-center flex gap-2"
                                onClick={() => setShowLogBook(true)}
                                ><Plus size={15}/> Add Visitor
                                </button> 
                            </div>
                </div>

                <div className="grid grid-cols-9 w-full bg-stone-900 rounded-xl px-4 py-3 mb-2">
                            <h1 className="text-xs text-white">No.</h1>
                            <h1 className="text-xs text-white">Name</h1>
                            <h1 className="text-xs text-white">Address</h1>
                            <h1 className="text-xs text-white">Contact</h1>
                            <h1 className="text-xs text-white">Purpose</h1>
                            <h1 className="text-xs text-white">Date</h1>
                            <h1 className="text-xs text-white">Time In</h1>
                            <h1 className="text-xs text-white">Time Out</h1>
                            <h1 className="text-xs text-white">Action</h1>
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
                    className="w-full bg-white border border-stone-300 justify-between items-start flex rounded-xl p-4 mb-2"
                    >
                        <div className="grid grid-cols-9 w-full">
                            <h1 className="text-xs text-stone-500 justify-start items-center flex"><span>{index + 1}</span></h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex"><span>{log.name}</span></h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex"><span>{log.address}</span></h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex"><span>{log.contact}</span></h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex"><span>{log.purpose}</span></h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex">{new Date(log.createdAt).toISOString().split("T")[0]}</h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex">{new Date(log.createdAt).toLocaleTimeString()}</h1>
                            <h1 className="text-xs text-stone-500 justify-start items-center flex">{log.leaveTime
                                                                                                    ? new Date(log.leaveTime).toLocaleTimeString()
                                                                                                    : "—"}</h1>
                            {!log.leaveTime && (
                                <button className="bg-blue-600 w-fit text-white p-2 rounded-xl cursor-pointer hover:-translate-y-1 hover:bg-blue-700" onClick={() => LeaveConfirmation(log)}><Check size={15}/></button>
                            )}
                            
                        </div>
                    </div>
                ))
                }
                    </>
                )}
                
            </div>

        </section>
        </>
    )
}
export default Admin_LogBook