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

const Admin_Page = () =>{

    const [studentList, setStudentList] = useState([])
    const [employeeList, setEmployeeList] = useState([])

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

    useEffect(() => {
        fetchStudents()
        fetchEmployees()
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

    return(
        <section className="bg-gradient-to-tr from-white via-gray-50 to-emerald-100 w-full justify-start items-start flex">

          <div className="h-screen w-full overflow-auto">
                <nav className="fixed top-0 bg-white h-15 w-full justify-start items-center flex border-b-1 gap-2 border-gray-300 px-20">
                        <h1 className="text-xl font-semibold text-emerald-500">Dashboard Overview</h1>
                </nav>
                <Admin_Dashboard AllStudents={studentList} 
                                 AllEmployees={employeeList}
                                />
                <Admin_Stories/>
                {/* <Admin_Materials/> */}
                <Admin_UserManagement   AllStudents={studentList} 
                                        AllEmployees={employeeList}
                                        reFetchEmployee={fetchEmployees}
                                        reFetchStudent={fetchStudents}
                                        openStudentModal={() => setShowRegisterStudentModal(true)}
                                        openEmployeeModal={() => setShowRegisterEmployeeModal(true)}
                                        handleEditStudent={handleEditStudent}
                                        handleEditEmployee={handleEditEmployee}
                                        />

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
                
          </div>

          
        </section>
    )
}
export default Admin_Page