import { Plus } from "lucide-react"
import Admin_SideBar from "../components/Admin_Sidebar"
import MembersModal from "../modals/MembersModal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Confirmation_Popup from "../popup/Confirmation_Popup"

const Admin_Members = () => {
    const [members, setMembers] = useState([])
    const [selectedMember, setSelectedMember] = useState(null);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
       const loadData = async () => {
             await FetchMembersRequest()
       }
       loadData()
    },[])

    const FetchMembersRequest = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-members`)
        setMembers(res.data.members);
        console.log(res.data.message);
      } catch (error) {
        toast.error('Failed to fetch data');
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message)
      }
    }
    const DeleteMemberRequest = async (id) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-member/${id}`)
            console.log(res.data.message);
            toast.success("Successfully deleted account")
            setShowConfirmation(false)
            FetchMembersRequest();
          } catch (error) {
            toast.error('Failed to delete account');
            console.log(error.response?.data?.message);
            setErrorMessage(error.response?.data?.message)
          }
    }

      return(
        <>
        {showConfirmation && 
        (
            <Confirmation_Popup
            errorMessage={errorMessage}
            message={'Are you sure to delete this account?'}
            onConfirm={() => DeleteMemberRequest(selectedMember)}
            onCancel={() => {setShowConfirmation(false); setErrorMessage('')}}
            />
        )}
        <Admin_SideBar/>
        {showMemberModal && (<MembersModal onClose={() => setShowMemberModal(false)}/>)}
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Members Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage borrow request from user</h1>                   
                </header>

                <div className="w-full px-4 lg:px-10">
                     <div className="bg-white w-full border border-stone-300 rounded-lg p-2">
                          <div className="bg-stone-100 px-4 py-3 w-full justify-between items-center border border-stone-300 rounded-lg flex mb-2">
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

                           {members?.length === 0 && 
                            
                                <div
                                className="w-full p-6 bg-stone-50 rounded-lg justify-center items-center flex flex-col border border-stone-200">
                                <h1 className="text-sm font-medium text-stone-500">No librarian found</h1>
                                <h1 className="text-xs mt-1 text-stone-500">Add new librarian member</h1>
                                </div>
                            
                            }

                            {members?.length > 0 && 
                            members.map((member, index) => (
                                <div
                                key={member._id}
                                className="w-full justify-between items-center flex border border-stone-300 p-4 rounded-lg mb-2 gap-2">

                                <div className="w-full justify-center items-center flex gap-2">
                                <h1 className="text-xs text-stone-500">{index + 1}</h1>
                                <div>
                                    {!member.avatar ? 
                                    (
                                        <div className="bg-blue-500 h-8 w-8 rounded-full justify-center items-center flex text-white">
                                            {member.firstname.slice(0,1).toUpperCase()}
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="p-2 rounded-full">
                                           <img src={member.avatar} className="object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="w-full justify-start items-start flex flex-col">
                                    <h1 className="text-xs text-stone-700">{member.firstname} {member.extensionname} {member.middlename} {member.lastname}</h1>
                                    <h1 className="text-xs text-stone-500">{member.role.toUpperCase()}</h1>
                                </div>
                                </div>

                                <div className="w-full justify-end items-center flex">
                                    <button className="bg-red-500 p-2 rounded-lg hover:bg-red-600 cursor-pointer"
                                    onClick={() => {setSelectedMember(member._id); setShowConfirmation(true)}}>
                                        <h1 className="text-xs text-white">Delete Account</h1>
                                    </button>
                                </div>
                                
                                </div>
                            ))
                            }
                     </div>

                    
                </div>
        </section>
        </>
      )
}
export default Admin_Members