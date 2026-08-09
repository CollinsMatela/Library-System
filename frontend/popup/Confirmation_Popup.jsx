import { Check, X, TriangleAlert } from "lucide-react";
const Confirmation_Popup = ({errorMessage, message, onConfirm, onCancel}) => {
    
    return(
       <section className="fixed z-100 flex items-center justify-center h-screen">
            
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    
                    <div className="bg-white rounded-2xl p-6 w-100 border border-gray-300 shadow-xl">
                        <h2 className="text-lg justify-start items-center flex gap-2 text-gray-800 font-bold mb-3">
                            <TriangleAlert size={15}/> Warning
                        </h2>
                        
                        <div className="w-full justify-start items-start flex flex-col">
                            {errorMessage ? (
                                <p className="bg-red-100 text-red-600 text-sm rounded-xl p-2 mb-2 w-full">{errorMessage}</p>
                            ) : (
                                <p className="text-gray-600 text-sm mb-6">{message || "Are you sure you want to proceed?"}</p>
                            )}
                        </div>
                        

                        <div className="flex justify-end gap-3">
                            <button onClick={onCancel} className="p-2 bg-white text-gray-500 text-xs justify-center items-center flex gap-2 rounded-lg mt-4 cursor-pointer">
                                <X size={15}/> Cancel
                            </button>
                            <button onClick={onConfirm} className="p-2 bg-black text-white text-xs justify-center items-center flex gap-2 rounded-lg mt-4 cursor-pointer">
                                <Check size={15}/> Confirm
                            </button>
                        </div>
                    </div>

                </div>
            

        </section>
    )
}
export default Confirmation_Popup;