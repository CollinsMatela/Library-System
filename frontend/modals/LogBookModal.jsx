
import { ArrowLeft, Plus } from "lucide-react"
import { toast } from "react-toastify"

const LogBookModal = ({logBook, setLogBook, confirmation, onClose}) => {

    
    return(
        <section className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

            <div className="bg-white border border-stone-300 rounded-2xl w-lg overflow-hidden flex flex-col gap-2">

            {/* Header */}
            <div className="p-4 border-b border-stone-300">
                <h1 className="text-sm font-bold text-stone-900"> Register Visitor</h1>
                <p className="text-xs text-stone-500">Please review the selected book before submitting your borrow request.</p>
            </div>

            <div className="flex flex-col gap-2 p-4">
                <input type="text" 
                placeholder="Name" 
                className="w-full text-xs bg-white border border-stone-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.name}
                onChange={(e) => setLogBook((prev) => ({...prev, name: e.target.value}) )}
                />

                <input type="text" 
                placeholder="Address" 
                className="w-full text-xs bg-white border border-stone-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.address}
                onChange={(e) => setLogBook((prev) => ({...prev, address: e.target.value}) )}
                />

                <input type="text" 
                placeholder="Contact" 
                className="w-full text-xs bg-white border border-stone-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.contact}
                onChange={(e) => setLogBook((prev) => ({...prev, contact: e.target.value}) )}
                />

                <input type="text" 
                placeholder="Purpose" 
                className="w-full text-xs bg-white border border-stone-300 roundedl-xl p-2 rounded-xl outline-none"
                value={logBook.purpose}
                onChange={(e) => setLogBook((prev) => ({...prev, purpose: e.target.value}) )}
                />
                
            </div>

            <div className="flex gap-2 w-full items-center justify-end p-4 border-t border-stone-300">
                <button className="justify-center items-center flex gap-1 text-stone-500 text-xs hover:bg-stone-300 p-2 cursor-pointer"
                onClick={onClose}><ArrowLeft size={15}/></button>
                <button className="justify-center items-center flex gap-1 text-white text-xs bg-stone-800 hover:bg-stone-900 p-2 cursor-pointer"
                onClick={confirmation}><Plus size={15}/>Submit</button>
            </div>



            </div>
        </section>
    )
}
export default LogBookModal