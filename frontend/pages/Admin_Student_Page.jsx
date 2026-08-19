import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import View_Student_Modal from "../modals/View_Student_Modal"
import { View, UserPen, Trash, Search, Users } from "lucide-react"
import { toast } from "react-toastify"


const Admin_Student_Page = () => {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState('');
    
    const filteredUser = users.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
    })

    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewStudent, setShowViewStudent] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const handleEditStudent = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleRegistration = () => {
        setShowStudentRegistration(true);
    };

    const handleViewStudent = (user) => {
         setSelectedUser(user);
         setShowViewStudent(true);
    }

    useEffect(() => {
       fetchUsers();
    },[])
    const fetchUsers = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`)
            console.log(res.data.message);
            setUsers(res.data.users);
        } catch (error) {
            console.log(error)
        }
    }
    const deleteConfirmation = (user) => {
          setSelectedUser(user);
          setShowConfirmationPopup(true);
    }
    const deleteStudent = async (userId) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-student/${userId}`);
            console.log(res.data.message);
            toast.success(res.data.message);
            fetchUsers();
          } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
          }
          setShowConfirmationPopup(false);
    }

    return(
        <>
        {showConfirmationPopup && (<Confirmation_Popup onConfirm={() => deleteStudent(selectedUser?._id)} onCancel={() => setShowConfirmationPopup(false)} />)}
        {showEditModal && (<Edit_Student_Modal selectedUser={selectedUser} reFetch={() => fetchUsers()} closeEditStudentModal={() => setShowEditModal(false)}/>)}
        {showViewStudent && (<View_Student_Modal user={selectedUser} onClose={() => setShowViewStudent(false)}/>)}
       <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pl-70">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-stone-300 p-3 px-10">
                    <h1 className="text-sm font-bold text-stone-800">Users Account</h1>
                    <h1 className="text-stone-400 text-xs">Manage user accounts</h1>                   
              </header>
        
        <Admin_Sidebar/>
        

        {/* Student Container */}
                  <div className="w-full px-10">

                    <div className="w-full justify-between items-center flex rounded-t-xl">

                        <div className="flex items-center justify-start gap-2 mb-4">
                            <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                              <Users size={20}/>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-gray-800 rounded-full">Users Table</h1>
                                <p className="text-gray-400 text-xs">Manage student accounts, progress, and information.</p>
                            </div>
                          
                        </div>
                        

                        <div className="justify-between items-center flex border-1 border-gray-300 rounded-lg px-4">
                            
                            <input type="search" 
                                   placeholder="Search by name" 
                                   className="bg-white py-2 outline-none text-xs"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search size={15} className="text-gray-500"/>
                             
                        </div>
                    </div>   
                      {/* Columns */}
                        <div className="bg-stone-900 w-full rounded-xl grid grid-cols-7 justify-between items-center flex px-4 py-3">
        
                                <h1 className="text-xs text-white mr-14">No.</h1>
                                <h1 className="text-xs text-white">Lastname</h1>
                                <h1 className="text-xs text-white">Firstname</h1>
                                <h1 className="text-xs text-white">Middle</h1>
                                <h1 className="text-xs text-white">Email</h1>
                                <h1 className="text-xs text-white">Contact</h1>
                                <h1 className="text-xs text-white">Actions</h1>
                            
                        </div>
                    <div className="h-100 w-full rounded-b-xl pb-10">
                        
                        {/* Rows */}
                        {filteredUser.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full rounded-xl justify-center items-center flex px-4 py-2 mt-2">
                                <p className="text-xs text-gray-500">No students found.</p>
                            </div>
                        )}
                        {
                            filteredUser.map((user, index) => {

                                const updatedCreatedAt = new Date(user.createdAt).toISOString().split("T")[0];;
                                
                                return (
                                <div key={user._id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 grid grid-cols-7 justify-start items-center px-4 py-2 mt-2 hover:border-blue-500 hover:bg-blue-100 cursor-pointer">
                                    <h1 className="text-xs text-gray-500 justify-start items-center wrap-break-word">{index + 1}</h1>
                                    <h1 className="text-xs text-gray-500 justify-start items-center wrap-break-word">{user.lastname}</h1>
                                    <h1 className="text-xs text-gray-500 justify-start items-center wrap-break-word">{user.firstname}</h1>
                                    <h1 className="text-xs text-gray-500 justify-start items-center wrap-break-word">{user.middlename}</h1>
                                    <h1 className="text-xs text-gray-500 justify-start items-center wrap-break-word">{user.email}</h1>
                                    <h1 className="text-xs text-gray-500 justify-start items-center wrap-break-word">{user.contact}</h1>

                                    
                                    <div className="break-words gap-2 flex">
                                        <button className="bg-blue-500 text-white justify-center items-center flex p-2 rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => handleViewStudent(user)}><View size={15}/></button>
                                        <button className="bg-amber-500 text-white justify-center items-center flex p-2 rounded-lg cursor-pointer hover:bg-amber-600" onClick={() => handleEditStudent(user)}><UserPen size={15}/></button>
                                        <button className="bg-red-500 text-white justify-center items-center flex p-2 rounded-lg cursor-pointer hover:bg-red-600" onClick={() => deleteConfirmation(user)}><Trash size={15}/></button>
                                        
                                    </div>
                                </div>
                              )
                              })
                              }
                    </div>
                    </div>
       </section>
       </>
    )
}
export default Admin_Student_Page;