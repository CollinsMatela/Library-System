
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "react-toastify"

const LogBookModal = ({logBook, setLogBook, confirmation, onClose}) => {

    
    return(
        <section className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden px-4 flex flex-col gap-2">

            {/* Header */}
            <div className="py-6">
                <h1 className="text-2xl font-bold text-gray-900"> Register Visitor</h1>
                <p className="text-sm text-gray-500 mt-1">Please review the selected book before submitting your borrow request.</p>
            </div>

            <div className="flex flex-col gap-2">
                <input type="text" 
                placeholder="Name" 
                className="w-full bg-white border border-gray-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.name}
                onChange={(e) => setLogBook((prev) => ({...prev, name: e.target.value}) )}
                />

                <input type="text" 
                placeholder="Address" 
                className="w-full bg-white border border-gray-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.address}
                onChange={(e) => setLogBook((prev) => ({...prev, address: e.target.value}) )}
                />

                <input type="text" 
                placeholder="Contact" 
                className="w-full bg-white border border-gray-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.contact}
                onChange={(e) => setLogBook((prev) => ({...prev, contact: e.target.value}) )}
                />

                <input type="text" 
                placeholder="Purpose" 
                className="w-full bg-white border border-gray-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.purpose}
                onChange={(e) => setLogBook((prev) => ({...prev, purpose: e.target.value}) )}
                />
                
            </div>

            <div className="flex gap-2 w-full items-center justify-end my-4">
                <button className="justify-center items-center flex gap-2 text-gray-500 text-sm hover:bg-gray-300 p-2 rounded-xl cursor-pointer"
                onClick={onClose}><ArrowLeft size={20}/>Cancel</button>
                <button className="justify-center items-center flex gap-2 text-white text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-xl cursor-pointer"
                onClick={confirmation}><Plus size={20}/>Submit</button>
            </div>



            </div>
        </section>
    )
}
export default LogBookModal