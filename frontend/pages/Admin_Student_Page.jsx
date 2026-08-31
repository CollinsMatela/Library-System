import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import View_Student_Modal from "../modals/View_Student_Modal"
import { View, UserPen, Trash, Search, Users, LoaderCircle } from "lucide-react"
import { toast } from "react-toastify"


const Admin_Student_Page = () => {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading]= useState(false);
    
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
       setIsLoading(true)
       const loadData = async () => {
             try {
                await fetchUsers();
             } catch (error) {
                console.log(error);
                toast.error("Failed to load data")
             } finally {
                setIsLoading(false)
             }
       }
       loadData()
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
         <Admin_Sidebar/>   
       <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-stone-300 p-3 px-4 lg:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Users Account</h1>
                    <h1 className="text-stone-400 text-xs">Manage user accounts</h1>                   
              </header>
        
        
        

        {/* Student Container */}
                  <div className="w-full px-4">

                    <div className="w-full justify-between items-start flex flex-col sm:flex-row rounded-t-xl mb-4 lg:mb-2">

                        <div className="flex items-center justify-start gap-2 mb-4">
                            <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                              <Users size={20}/>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Users Table</h1>
                                <p className="text-stone-400 text-xs">Manage student accounts.</p>
                            </div>
                          
                        </div>
                        

                        <div className="w-full sm:w-50 justify-between items-center flex border-1 border-stone-300 rounded-lg px-4">
                            
                            <input type="search" 
                                   placeholder="Search by name" 
                                   className="bg-white py-2 outline-none text-xs"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search size={15} className="text-stone-500"/>
                             
                        </div>
                    </div>

                    <div className="w-full border-0 md:border border-stone-300 rounded-xl md:p-2">

                    
                      {/* Columns */}
                        <div className="hidden rounded-t-xl w-full bg-stone-100 md:grid md:grid-cols-4 px-4 py-3">
        
                                <h1 className="text-xs text-stone-500">Fullname</h1>
                                <h1 className="text-xs text-stone-500">Email</h1>
                                <h1 className="text-xs text-stone-500">Contact</h1>
                                
                            
                        </div>

                    {isLoading ?
                    (
                     <div className="w-full justify-center items-center flex p-4">
                        <LoaderCircle size={20} className="text-stone-500 animate-spin"/>
                     </div>
                    )
                    :
                    (
                      <div className="h-100 w-full rounded-b-xl pb-10">
                        
                        {/* Rows */}
                        {filteredUser.length < 1 && (
                            <div className="bg-stone-100 h-15 w-full justify-center items-center flex px-4 py-2">
                                <p className="text-xs text-stone-500">No students found.</p>
                            </div>
                        )}
                        {
                            filteredUser.map((user, index) => {

                                const updatedCreatedAt = new Date(user.createdAt).toISOString().split("T")[0];;
                                
                                return (
                                <div key={user._id} className="bg-white gap-2 min-h-12 w-ful border-b border-stone-300 grid grid-cols-2 md:grid-cols-4 justify-start items-center md:px-4 py-2 hover:border-blue-500 hover:bg-blue-100 cursor-pointer">
                                    <div className="w-full justify-start items-center flex gap-1 border-amber-200">
                                        <h1 className="text-xs text-stone-500 justify-start items-center wrap-break-word">{index + 1}</h1>
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover"/>
                                        )
                                        :
                                        (
                                            <div className="h-8 w-8 rounded-full bg-blue-500 justify-center items-center flex text-white">{user.firstname.slice(0,1).toUpperCase()}</div>
                                        )}
                                        <h1 className="text-xs text-stone-500 justify-start items-center wrap-break-word">{user.firstname} {user.middlename} {user.lastname}</h1>
                                    </div>
                                    
                                    
                                    <h1 className="hidden md:block text-xs text-stone-500 justify-start items-center wrap-break-word">{user.email}</h1>
                                    <h1 className="hidden md:block text-xs text-stone-500 justify-start items-center wrap-break-word">{user.contact}</h1>

                                    
                                    <div className=" wrap-break-words gap-2 justify-end flex">
                                        <button className="bg-stone-800 text-white justify-center items-center flex p-2 cursor-pointer hover:bg-stone-900" onClick={() => handleViewStudent(user)}><View size={15}/></button>
                                        <button className="bg-stone-800 text-white justify-center items-center flex p-2 cursor-pointer hover:bg-stone-900" onClick={() => handleEditStudent(user)}><UserPen size={15}/></button>
                                        <button className="bg-stone-800 text-white justify-center items-center flex p-2 cursor-pointer hover:bg-stone-900" onClick={() => deleteConfirmation(user)}><Trash size={15}/></button>
                                    </div>

                                </div>
                              )
                              })
                              }
                    </div>  
                    )}
                    </div>
                    
                    </div>
       </section>
       </>
    )
}
export default Admin_Student_Page;