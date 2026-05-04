
const Confirmation_Popup = ({onConfirm, onCancel}) => {
    return(
       <section className="fixed flex items-center justify-center h-screen">
            
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
                    
                    <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">
                        <h2 className="text-xl text-gray-800 font-bold mb-3">
                            ⚠️ Warning
                        </h2>

                        <p className="text-gray-600 mb-6">Are you sure you want to proceed with this action?</p>


                        <div className="flex justify-end gap-3">
                            <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg mt-4 cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={onConfirm} className="px-4 py-2 bg-pink-500 text-white rounded-lg mt-4 hover:bg-pink-600 cursor-pointer">
                                Confirm
                            </button>
                        </div>
                    </div>

                </div>
            

        </section>
    )
}
export default Confirmation_Popup;