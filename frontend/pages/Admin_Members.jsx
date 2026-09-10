import { Plus } from "lucide-react"
import Admin_SideBar from "../components/Admin_Sidebar"
import MembersModal from "../modals/MembersModal"
import { useState } from "react"

const Admin_Members = () => {

    const [showMemberModal, setShowMemberModal] = useState(false);

      return(
        <>
        <Admin_SideBar/>
        {showMemberModal && (<MembersModal onClose={() => setShowMemberModal(false)}/>)}
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Members Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage borrow request from user</h1>                   
                </header>

                <div className="w-full px-4 lg:px-10">
                     <div className="bg-white w-full border border-stone-300 rounded-lg p-2">
                          <div className="bg-stone-100 px-4 py-3 w-full justify-between items-center border border-stone-300 rounded-lg flex">
                             <div>
                                <h2 className="text-xs font-medium text-stone-700">Librarian Member</h2>
                                <p className="mt-1 text-xs text-stone-500">
                                    Manage librarian accounts and access permissions.
                                </p>
                            </div>

                             <button className="text-xs text-white p-2 bg-stone-800 hover:bg-stone-900 justify-center items-center flex gap-1 rounded-lg"
                             onClick={() => setShowMemberModal(true)}>
                                <Plus size={15}/>
                                Add Librarian
                                </button>
                          </div>
                     </div>
                </div>
        </section>
        </>
      )
}
export default Admin_Members