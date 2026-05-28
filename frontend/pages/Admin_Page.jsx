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

    return (
  <section className="min-h-screen w-full bg-white pl-80">
    
    <Admin_SideBar/>

    <div className="px-6 md:px-16 py-10 space-y-10">

      <div>
        <h2 className="text-3xl font-bold text-gray-800">Hello {user?.username || "Admin"} 👋</h2>
        <p className="text-gray-400 text-md">
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