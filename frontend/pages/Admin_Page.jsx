import Admin_Dashboard from "../components/Admin_Dashboard"
import Admin_Stories from "../components/Admin_Stories"
import Admin_UserManagement from "../components/Admin_UserManagement"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Account_Conformation from "../popup/Account_Conformation"
import { useState, useEffect} from "react"
import axios from "axios"
import useAuthStore from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import Admin_SideBar from "../components/Admin_Sidebar"
import {Users, Contact, LibraryBig} from 'lucide-react'

const Admin_Page = () =>{
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    const [users, setUsers] = useState([])

    const fetchUsers = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`)
            console.log(res.data.message);
            setUsers(res.data.users);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers()

    }, [])


    return (
  <section className="min-h-screen w-full bg-white pl-80">
    
    <Admin_SideBar/>

    <div className="px-6 md:px-16 py-10 space-y-10">


      <div>
        <p className="w-fit bg-pink-100 text-pink-500 text-xs font-bold rounded-full px-2 py-1 mb-2">Administrator Portal</p>
        <h2 className="text-3xl font-bold text-gray-800">Hello {user?.username || "Admin"} 👋</h2>
        <p className="text-gray-400 text-sm">Welcome back! Here's today's overview of Little Me Learning Center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-3xl p-6">
          <p className="text-lg flex gap-4">Total Students<Users/></p>
          <h1 className="text-5xl font-bold mt-3">
            {users.length}
          </h1>
          <p className="text-xs text-white mt-2 border-t-1 border-white pt-4">
              Registered learners in the system
          </p>
        </div>


        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl p-6">
          <p className="text-lg flex gap-4">Learning Stories<LibraryBig/></p>
          <h1 className="text-5xl font-bold mt-3">
            {0}
          </h1>
          <p className="text-xs text-white mt-2 border-t-1 border-white pt-4">
              Educational content available
          </p>
        </div>
      </div>
    </div>
    
    <div className="w-full min-h-100 justify-between items-start flex px-10">

      <div className="grid grid-cols-1 h-full w-1/2">
        <div className="bg-white p-6 ">
          <h1 className="text-lg font-bold text-gray-500 border-b border-gray-300 pb-4 mb-4">Recent Students</h1>
          {users.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((student) => (
             <div key={student.id} className="bg-white h-20 w-full border border-gray-300 rounded-xl p-4 mb-2">
              <div className="flex gap-2">
                  {student.avatar ? 
                  <img src={student.avatar} className="bg-gray-100 h-12 w-12 rounded-full" />
                  :
                  <div className="bg-pink-500 h-12 w-12 rounded-full text-white font-bold justify-center items-center flex">{student.firstname.charAt(0).toUpperCase()}</div>
                  }
                  <div>
                    <h1 className="text-gray-500 font-bold">{student.role} {student.firstname} {student.lastname}</h1>
                    <h1 className="text-sm text-gray-500 font-semibold">{student.gradeLevel}</h1>
                  </div>
              </div>
                  
             </div>
          ))}
      </div>

      </div>

      
      
      
    </div>


  </section>
  
);
}
export default Admin_Page