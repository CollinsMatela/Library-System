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

    const [showRegisterEmployeeModal, setShowRegisterEmployeeModal] = useState(false);
    const [showRegisterStudentModal, setShowRegisterStudentModal] = useState(false);

    const [showEditStudentModal, setShowEditStudentModal] = useState(false);
    const [selectedStudentToEdit, setSelectedStudentToEdit] = useState("");

    const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
    const [selectedEmployeeToEdit, setSelectedEmployeeToEdit] = useState("");

    const [showAccountConfirmation, setShowAccountConfirmation] = useState(false);
    const [newAccountDetails, setNewAccountDetails] = useState(null);

    const handleEditStudent = (student) => {
            setSelectedStudentToEdit(student);
            setShowEditStudentModal(true);
    }
    const handleEditEmployee = (employee) => {
           setSelectedEmployeeToEdit(employee);
           setShowEditEmployeeModal(true);
    }
    const PopUpStudentInfo = (account) =>{
          setShowAccountConfirmation(true);
          setNewAccountDetails(account);
    }

    const [refreshStudentTable, setRefreshStudentTable] = useState(false);
    const [refreshEmployeeTable, setRefreshEmployeeTable] = useState(false);

    const triggerRefreshStudentTable = () => {
        setRefreshStudentTable(prev => !prev);
    }
    const triggerRefreshEmployeeTable = () => {
        setRefreshEmployeeTable(prev => !prev);
    }

    const handleLogout = () =>{
          logout();
          localStorage.removeItem("token");
          navigate("/");
    }  

    return (
  <section className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 pl-80">
    
    <nav className="sticky top-0 z-0 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm px-8 md:px-16 py-4 flex justify-end items-center">

      <button
        onClick={handleLogout}
        className="bg-gray-300 hover:bg-pink-400 text-white px-6 py-2 rounded-full transition duration-300"
      >
        Logout
      </button>
    </nav>

    <aside className="fixed left-0 top-0 h-full w-80 bg-white/90 backdrop-blur-md border-r border-pink-100 shadow-sm p-4">
       <div>
        <h1 className="text-2xl font-bold text-pink-500">Little Me Admin</h1>
        <p className="text-sm text-gray-400">Learning Center Dashboard</p>
      </div>

      <div className="bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded-lg mt-6">
        Admin Menu
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin/upload')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Upload Story</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin/materials')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">View Stories</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Students Account</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Teacher | Admin Account</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Activity Log</button>
      </div>
    </aside>

    <div className="px-6 md:px-16 py-10 space-y-10">

      <div className="bg-white rounded-3xl shadow-md p-8 border border-pink-100">
        <h2 className="text-4xl font-bold text-gray-700">
          Hello {user?.username || "Admin"} 👋
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Welcome back! Here's today's overview of Little Me Learning Center.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-3xl p-6 shadow-lg">
          <p className="text-lg">Total Students</p>
          <h1 className="text-5xl font-bold mt-3">
            {studentList.length}
          </h1>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl p-6 shadow-lg">
          <p className="text-lg">Total Employees</p>
          <h1 className="text-5xl font-bold mt-3">
            {employeeList.length}
          </h1>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-3xl p-6 shadow-lg">
          <p className="text-lg">Learning Stories</p>
          <h1 className="text-5xl font-bold mt-3">
            {storiesList.length}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-gray-100">
        <Admin_UserManagement
          AllStudents={studentList}
          AllEmployees={employeeList}
          reFetchEmployee={fetchEmployees}
          reFetchStudent={fetchStudents}
          openStudentModal={() => setShowRegisterStudentModal(true)}
          openEmployeeModal={() => setShowRegisterEmployeeModal(true)}
          handleEditStudent={handleEditStudent}
          handleEditEmployee={handleEditEmployee}
        />
      </div>
    </div>

    {showRegisterEmployeeModal && (
      <RegisterEmployeeModal
        reFetchEmployee={fetchEmployees}
        closeEmployeeModal={() => setShowRegisterEmployeeModal(false)}
        openAccountConfirmation={PopUpStudentInfo}
      />
    )}

    {showRegisterStudentModal && (
      <RegisterStudentModal
        reFetchStudent={fetchStudents}
        closeStudentModal={() => setShowRegisterStudentModal(false)}
        openAccountConfirmation={PopUpStudentInfo}
      />
    )}

    {showEditStudentModal && (
      <Edit_Student_Modal
        selectedStudent={selectedStudentToEdit}
        triggerRefreshStudentTable={triggerRefreshStudentTable}
        closeEditStudentModal={() => setShowEditStudentModal(false)}
      />
    )}

    {showEditEmployeeModal && (
      <Edit_Employee_Modal
        selectedEmployee={selectedEmployeeToEdit}
        triggerRefreshEmployeeTable={triggerRefreshEmployeeTable}
        closeEditEmployeeModal={() => setShowEditEmployeeModal(false)}
      />
    )}

    {showAccountConfirmation && (
      <Account_Conformation
        newAccountDetails={newAccountDetails}
        closeAccountConfirmation={() => setShowAccountConfirmation(false)}
      />
    )}
  </section>
  
);
}
export default Admin_Page