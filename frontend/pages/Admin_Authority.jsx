import { Plus, Trash, Users } from "lucide-react"
import Admin_SideBar from "../components/Admin_Sidebar"
import MembersModal from "../modals/MembersModal"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import Admin_Header from "../components/Admin_Header"

const Admin_Authority = () => {
    const [members, setMembers] = useState([])
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [roleConfirmation, setRoleConfirmation] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [filterRole, setFilterRole] = useState('')

    const [selectedLibrarian, setSelectedLibrarian] = useState(null);
    const [selectedNewRole, setSelectedNewRole] = useState('')

    const [filteredRole, setFilteredRole] = useState([]);

    let SystemAdmin = members.filter((m) => m.role?.toLowerCase() === "system administrator");
    let HeadLibrarian = members.filter((m) => m.role?.toLowerCase() === "head librarian");
    let ITLibrarian = members.filter((m) => m.role?.toLowerCase() === "it librarian");
    let AssistantLibrarian = members.filter((m) => m.role?.toLowerCase() === "assistant librarian");

    useEffect(() => {
       const loadData = async () => {
             await FetchMembersRequest()
       }
       loadData()
    },[])
    useEffect(() => {
        if (filterRole === "system administrator") {
        setFilteredRole(SystemAdmin);
        }

        if (filterRole === "head librarian") {
        setFilteredRole(HeadLibrarian);
        }

        if (filterRole === "it librarian") {
            setFilteredRole(ITLibrarian);
        }

        if (filterRole === "assistant librarian") {
            setFilteredRole(AssistantLibrarian);
        }

        if (filterRole === "") {
            setFilteredRole(members);
        }
    }, [filterRole, members])
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
            setDeleteConfirmation(false);
            FetchMembersRequest();
          } catch (error) {
            toast.error('Failed to delete account');
            console.log(error.response?.data?.message);
            setErrorMessage(error.response?.data?.message)
          }
    }
    const UpdateRoleRequest = async (selectedLibrarian, selectedNewRole) => {
          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-role-librarian/${selectedLibrarian._id}`, {role: selectedNewRole})
            console.log(res.data.message)
            toast.success(res.data.message)
            FetchMembersRequest()
            setSelectedLibrarian(null);
            setSelectedNewRole('');
            setRoleConfirmation(false)
          } catch (error) {
            toast.error('Failed to update librarian role')
            console.log(error.response?.data?.message)
            setErrorMessage(error.response?.data?.message)
          }
    }
    const handleUpdateRole = (librarian, newRole) => {
          setRoleConfirmation(true)
          setSelectedLibrarian(librarian)
          setSelectedNewRole(newRole)
    }
    const handleDeleteLibrarian = (librarian) => {
          setDeleteConfirmation(true);
          setSelectedLibrarian(librarian)
    }

      return(
        <>
        {deleteConfirmation && 
        (
            <Confirmation_Popup
            errorMessage={errorMessage}
            message={'Are you sure to delete this account?'}
            onConfirm={() => DeleteMemberRequest(selectedLibrarian._id)}
            onCancel={() => {setDeleteConfirmation(false); setErrorMessage('')}}
            />
        )}
        {roleConfirmation && 
        (
            <Confirmation_Popup
            errorMessage={errorMessage}
            message={'Are you sure to update the role?'}
            onConfirm={() => UpdateRoleRequest(selectedLibrarian, selectedNewRole)}
            onCancel={() => {setRoleConfirmation(false); setErrorMessage('')}}
            />
        )}
        <Admin_SideBar/>
        {showMemberModal && (<MembersModal 
        onClose={() => setShowMemberModal(false)}
        reFetch={FetchMembersRequest}/>)
        }
        <section className="bg-stone-50 min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <Admin_Header mainText={'Authority Management'} subText={'Manage the authorized librarian account'}/>

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10">

                    <div className="w-full justify-between items-center flex gap-2 mb-4">
                            <div className="justify-center items-center flex gap-2">
                                <div className="flex rounded-lg bg-stone-800 p-2 text-white justify-center items-center">
                                    <Users size={20}/>
                                </div>
                                <div>
                                    <h1 className="text-md font-bold text-stone-800 rounded-full">Authorized Member</h1>
                                    <p className="text-stone-400 text-[10px]">List of registered authorized people.</p>
                                </div>
                            </div>
                            

                            <button className="text-[10px] text-white p-2 bg-stone-800 hover:bg-stone-900 justify-center items-center flex gap-1 rounded-lg"
                            onClick={() => setShowMemberModal(true)}>
                            <Plus size={15}/>
                            <h1 className="hidden sm:block">Authorized</h1>
                            </button>
                    </div>

                     <div className="bg-white h-120 w-full border border-stone-300 rounded-lg p-2 space-y-2">

                          <div className="bg-stone-100 p-2 w-full justify-between items-start border border-stone-300 rounded-lg flex flex-col sm:flex-row mb-2 gap-2">
                             <div>
                                <h2 className="text-[10px] font-medium text-stone-700">Authorized Member</h2>
                                <p className="mt-1 text-[10px] text-stone-500">
                                    Manage librarian accounts and access permissions.
                                </p>
                            </div>

                             <select className="text-[10px] w-full sm:w-fit text-stone-500 outline-none p-2 bg-white border border-stone-300 justify-center items-center flex gap-1 rounded-lg"
                             value={filterRole}
                             onChange={(e) => setFilterRole(e.target.value)}>
                                 <option value="">Filter Role</option>
                                 <option value="system administrator">System Administrator</option>
                                 <option value="head librarian">Head Librarian</option>
                                 <option value="it librarian">IT Librarian</option>
                                 <option value="assistant librarian">Assistant Librarian</option>
                            </select>
                          </div>
                          
                          <div className="h-100 w-full space-y-2 overflow-auto">
                           {filteredRole?.length === 0 && 
                            
                                <div
                                className="w-full p-6 bg-stone-50 rounded-lg justify-center items-center flex flex-col border border-stone-200">
                                <h1 className="text-xs font-bold text-stone-800">No {filterRole} found</h1>
                                <h1 className="text-[10px] mt-1 text-stone-500">Add new librarian member</h1>
                                </div>
                            
                            }

                            {filteredRole?.length > 0 && 
                            filteredRole.map((member, index) => (
                                <div
                                key={member._id}
                                className="w-full bg-stone-50 justify-between items-center flex border border-stone-300 p-2 rounded-lg gap-2">

                                <div className="w-full justify-center items-center flex gap-2">
                                <h1 className="text-[10px] text-stone-500">{index + 1}</h1>
                                <div>
                                    {!member.avatar ? 
                                    (
                                        <div className="hidden sm:flex bg-blue-500 h-8 w-8 rounded-full justify-center items-center text-white">
                                            {member.firstname.slice(0,1).toUpperCase()}
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="hidden sm:flex p-2 rounded-full">
                                           <img src={member.avatar} className="object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="w-full justify-start items-start flex flex-col">
                                    <h1 className="text-[10px] text-stone-700 font-medium">{member.firstname} {member.extensionname} {member.middlename} {member.lastname}</h1>
                                    <h1 className="text-[10px] text-stone-500">{member.role.toUpperCase()}</h1>
                                </div>
                                </div>

                                <div className="w-full justify-end items-center flex gap-1">
                                    <select className="border border-stone-300 p-2 text-[10px] w-25 sm:w-fit text-stone-500 rounded-lg outline-none"
                                    onChange={(e) => handleUpdateRole(member, e.target.value)}>
                                        <option value="">Select Role</option>
                                        <option value="system administrator">System Administrator</option>
                                        <option value="head librarian">Head Librarian</option>
                                        <option value="it librarian">IT Librarian</option>
                                        <option value="assistant librarian">Assistant Librarian</option>
                                    </select>
                                    <button className="bg-red-500 p-2 rounded-lg hover:bg-red-600 cursor-pointer justify-center items-center flex gap-1"
                                    onClick={() => handleDeleteLibrarian(member)}>
                                        <Trash size={15} className="text-white"/>
                                       
                                    </button>
                                </div>
                                
                                </div>
                            ))
                            }
                     </div>
                     </div>
                    
                </div>
        </section>
        </>
      )
}
export default Admin_Authority