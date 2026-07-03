import { Check, X, TriangleAlert } from "lucide-react";
const Confirmation_Popup = ({errorMessage, message, onConfirm, onCancel}) => {
    
    return(
       <section className="fixed z-100 flex items-center justify-center h-screen">
            
                <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
                    
                    <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">
                        <h2 className="text-xl justify-start items-center flex gap-2 text-gray-800 font-bold mb-3">
                            <TriangleAlert/> Warning
                        </h2>
                        
                        <div className="w-full justify-start items-center flex">
                        <p className={`${errorMessage ? "" : "hidden"} bg-red-100 rounded-xl text-red-500 mb-2 p-2`}>{errorMessage}</p>
                        <p className="text-gray-600 mb-6">{message || "Are you sure to proceed?"}</p>
                        </div>
                        

                        <div className="flex justify-end gap-3">
                            <button onClick={onCancel} className="px-4 py-2 bg-white text-gray-500 justify-center items-center flex gap-2 rounded-lg mt-4 cursor-pointer">
                                <X size={20}/> Cancel
                            </button>
                            <button onClick={onConfirm} className="px-4 py-2 bg-black text-white justify-center items-center flex gap-2 rounded-lg mt-4 cursor-pointer">
                                <Check size={20}/> Confirm
                            </button>
                        </div>
                    </div>

                </div>
            

        </section>
    )
}
export default Confirmation_Popup;