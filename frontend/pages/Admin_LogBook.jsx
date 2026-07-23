import Admin_SideBar from "../components/Admin_Sidebar"
import { Plus } from "lucide-react"
import LogBookModal from "../modals/LogBookModal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from 'axios'
import Confirmation from '../popup/Confirmation_Popup'

const Admin_LogBook = () => {

    const [showLogBook, setShowLogBook] = useState(false);
    const [showConfirmation, setConfirmation] = useState(false);
    
    const [logBookList, setLogBookList] = useState([]);
    const orderedLogBookList = [...logBookList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const [logBook, setLogBook] = useState({
    name: "",
    address: "",
    contact: "",
    purpose: "",
    leaveTime: null,
    });

    useEffect(() => {
        fetchLogBook();
    },[])

    const fetchLogBook = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-all-logbook`);
            console.log(res.data.message);
            toast.success(res.data.message);
            setLogBookList(res.data.logBookList);

        } catch (error) {
            toast.error(error.response?.data?.message);
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
            resetState();
            setShowLogBook(false);

        } catch (error) {
            toast.error(error.response?.data?.message);
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
        
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col py-10 pl-90 pr-10">
            <Admin_SideBar/>

            <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-gray-300 pb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Log Book Management</h1>
                    <h1 className="text-gray-400 text-md">Manage people entries to library</h1>
                </div>
            </header>

            <div className="w-full justify-between items-start flex flex-col mb-10 border-b border-gray-300 pb-10">
                <div className="w-full justify-between items-start flex mb-4">
                    <div>
                       <h1 className="text-3xl font-bold text-gray-800">Visitor List</h1>
                       <h1 className="text-gray-400 text-md">Manage people entries to library</h1> 
                    </div>
                    <div>
                       <button className="bg-blue-600 py-4 px-4 text-white rounded-xl cursor-pointer hover:-translate-y-1"
                       onClick={() => setShowLogBook(true)}
                       ><Plus size={20}/>
                       </button> 
                    </div>
                    
                </div>

                {orderedLogBookList.length === 0 && (
                    <div className="w-full bg-gray-300 rounded-xl p-4">No Visitor Listed</div>
                )}

                {orderedLogBookList.length > 0 &&
                orderedLogBookList.map((log) => (
                    <div
                    key={log._id}
                    className="w-full bg-white border rounded-xl p-4 mb-2"
                    >
                    <h1>{log.name}</h1>
                    <h1>{log.address}</h1>
                    <h1>{log.contact}</h1>
                    <h1>{log.purpose}</h1>
                    <h1>{new Date(log.createdAt).toLocaleString()}</h1>
                    <h1>{log.leaveTime || "Not Yet Leaving"}</h1>
                    </div>
                ))
                }
            </div>

        </section>
        </>
    )
}
export default Admin_LogBook