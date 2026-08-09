import { ArrowRight } from "lucide-react";


const NotificationModal = ({onClose}) => {
    return(
        <section className="fixed h-full w-full z-50">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="absolute right-30 top-15 bg-stone-50 h-full w-100 p-6 border-l border-gray-300">
                <div className="w-full justify-between items-center flex pb-4 border-b border-gray-300">
                    <h1 className="text-lg font-bold">Notifications</h1>
                    <button onClick={onClose} className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition"><ArrowRight size={15}/></button>
                </div>
                 
            </div>

        </section>
    )
}
export default NotificationModal;