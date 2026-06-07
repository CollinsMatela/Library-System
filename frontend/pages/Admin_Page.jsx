import Admin_Dashboard from "../components/Admin_Dashboard"
import Admin_Stories from "../components/Admin_Stories"
import Admin_UserManagement from "../components/Admin_UserManagement"
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal"
import RegisterStudentModal from "../modals/RegisterStudentModal"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Edit_Employee_Modal from "../modals/Edit_Employee_Modal"
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

    const [studentList, setStudentList] = useState([])
    const [employeeList, setEmployeeList] = useState([])
    const [storiesList, setStoriesList] = useState([]);

    const fetchStudents = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-students`)
            console.log(res.data.message);
            setStudentList(res.data.students);
        } catch (error) {
            console.log(error)
        }
    }
    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-employees`);
            console.log(res.data.message);
            setEmployeeList(res.data.employees);

        } catch (error) {
            console.log(error)
        }
    }
     const fetchStories = async () =>{
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-stories`);
                setStoriesList(res.data.stories);
                console.log(res.data.message);
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        fetchStudents()
        fetchEmployees()
        fetchStories()
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
            {studentList.length}
          </h1>
          <p className="text-xs text-white mt-2 border-t-1 border-white pt-4">
              Registered learners in the system
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl p-6">
          <p className="text-lg flex gap-4">Total Employees<Contact/></p>
          <h1 className="text-5xl font-bold mt-3">
            {employeeList.length}
          </h1>
          <p className="text-xs text-white mt-2 border-t-1 border-white pt-4">
              Active staff and teachers
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl p-6">
          <p className="text-lg flex gap-4">Learning Stories<LibraryBig/></p>
          <h1 className="text-5xl font-bold mt-3">
            {storiesList.length}
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
          {studentList.slice(0, 3).map((student) => (
             <div key={student.id} className="bg-white h-20 w-full border border-gray-300 rounded-xl p-4 mb-2">
              <div className="flex gap-2">
                  <img src="" alt="" className="bg-gray-300 h-12 w-12 rounded-full"/>
                  <div>
                    <h1 className="text-gray-500 font-bold">{student.role} {student.firstname} {student.lastname}</h1>
                    <h1 className="text-sm text-gray-500 font-semibold">{student.gradeLevel}</h1>
                  </div>
              </div>
                  
             </div>
          ))}
      </div>

      <div className="bg-white p-6">
          <h1 className="text-lg font-bold text-gray-500 border-b border-gray-300 pb-4 mb-4">Recent Employee</h1>
          {employeeList.slice(0, 3).map((employee) => (
             <div key={employee.id} className="bg-white h-20 w-full border border-gray-300 rounded-xl p-4 mb-2">
              <div className="flex gap-2">
                  <img src="" alt="" className="bg-gray-300 h-12 w-12 rounded-full"/>
                  <div>
                    <h1 className="text-gray-500 font-bold">{employee.role} {employee.firstname} {employee.lastname}</h1>
                    <h1 className="text-sm text-gray-500 font-semibold">{employee.gradeLevel}</h1>
                  </div>
              </div>
                  
             </div>
          ))}
      </div>
      </div>

      <div className="bg-white h-full w-1/2 p-6">
          <h1 className="text-lg font-bold text-gray-500 border-b border-gray-300 pb-4 mb-4">Newest Uploaded Story</h1>
          {storiesList.slice(0, 3).map((story) => (
            <div
              key={story.id}
              className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200 group mb-1"
            >
              {/* Image */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h1 className="text-lg font-bold leading-tight">
                  {story.title} 
                </h1>

                <p className="text-sm text-gray-200">
                  {story.author}
                </p>
              </div>
            </div>
          ))}
      </div>
      
      
    </div>


  </section>
  
);
}
export default Admin_Page