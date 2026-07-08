import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import View_Student_Modal from "../modals/View_Student_Modal"
import { View, UserPen, Trash } from "lucide-react"
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
            toast.success(res.data.message);
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
       <section className="min-h-screen w-full bg-white pl-80 py-10 space-y-10">
        
        <Admin_Sidebar/>
        <div className="mx-10 justify-between items-start flex">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">User Management</h2>
               <p className="text-gray-400 text-md">Manage user accounts, monitor learning progress, and keep track of student information and activities.</p>
            </div>

       </div>

        {/* Student Container */}
                  <div className="bg-white rounded-xl mx-10">

                    <div className="h-20 w-full justify-between items-center flex rounded-t-xl">
                        <div>
                          <h1 className="text-lg font-bold text-gray-500 rounded-full">Users Table</h1>
                          <p className="text-gray-400 text-sm">Manage student accounts, progress, and information.</p>
                        </div>
                        

                        <div className="space-x-2 justify-center ittems-center flex">
                            <input type="search" 
                                   placeholder="Search by name, grade, or branch" 
                                   className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                             
                        </div>
                    </div>   
                      {/* Columns */}
                        <div className="bg-gray-900 h-12 w-full rounded-xl justify-between items-center flex px-4">

                            <div className="w-100 justify-start items-center flex gap-4">
                                <h1 className="text-sm font-semibold text-white mr-14">No.</h1>
                                <h1 className="text-sm font-semibold text-white">Fullname</h1>
                            </div>
                            
                            
                            <div className="w-100 justify-start items-center flex">
                                        <div className="w-2/3">
                                          <h1 className="text-sm font-semibold text-white">Email</h1>
                                        </div>
                                        <div className="w-1/3">
                                          <h1 className="text-sm font-semibold text-white">Contact</h1>
                                        </div>
                                                                     
                            </div>
                            
                            <div className="w-[10%]">
                                <h1 className="text-sm font-semibold text-white">Actions</h1>
                            </div>
                        </div>
                    <div className="h-100 w-full rounded-b-xl pb-10 overflow-y-scroll">
                        
                        {/* Rows */}
                        {filteredUser.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full rounded-xl justify-center items-center flex px-4 py-2 mt-2">
                                <p className="text-gray-500">No students found.</p>
                            </div>
                        )}
                        {
                            filteredUser.map((user, index) => {

                                const updatedCreatedAt = new Date(user.createdAt).toISOString().split("T")[0];;
                                
                                return (
                                <div key={user._id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-100 justify-between items-center flex px-4 py-2 mt-2 hover:border-blue-500 hover:bg-blue-100 cursor-pointer">
                                    <div className="w-100 justify-start items-center flex gap-4">
                                        <p className="text-gray-500">{index + 1}</p>
                                        {user.avatar ? 
                                        <img src={user.avatar} className="bg-gray-100 h-12 w-12 rounded-full" />
                                        :
                                        <div className="bg-blue-600 h-12 w-12 rounded-full text-white font-bold justify-center items-center flex">{user.firstname.charAt(0).toUpperCase()}</div>
                                        }
                                        
                                        <p className="text-gray-500">{user.lastname}, {user.firstname}, {user.middlename}</p>
                                    </div>
                                    
                                    <div className="w-100 justify-start items-center flex">
                                        <div className="w-2/3">
                                          <p className="text-gray-500 wrap-break-word">{user.email}</p>
                                        </div>
                                        <div className="w-1/3">
                                          <p className="text-gray-500 wrap-break-word">{user.contact}</p>
                                        </div>
                                                                         
                                    </div>
                                    
                                    <div className="w-[10%] break-words gap-2 flex">
                                        <button className="bg-blue-500 text-white justify-center items-center flex p-2 rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => handleViewStudent(user)}><View/></button>
                                        <button className="bg-amber-500 text-white justify-center items-center flex p-2 rounded-lg cursor-pointer hover:bg-amber-600" onClick={() => handleEditStudent(user)}><UserPen/></button>
                                        <button className="bg-red-500 text-white justify-center items-center flex p-2 rounded-lg cursor-pointer hover:bg-red-600" onClick={() => deleteConfirmation(user)}><Trash/></button>
                                        
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