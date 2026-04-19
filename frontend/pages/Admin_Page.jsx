import Admin_SideBar from "../components/Admin_Sidebar"
import Admin_Dashboard from "../components/Admin_Dashboard"
import Admin_Materials from "../components/Admin_Materials"
import Admin_UserManagement from "../components/Admin_UserManagement"
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal"
import RegisterStudentModal from "../modals/RegisterStudentModal"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Edit_Employee_Modal from "../modals/Edit_Employee_Modal"
import { useState } from "react"

const Admin_Page = () =>{
    const [showRegisterEmployeeModal, setShowRegisterEmployeeModal] = useState(false);
    const [showRegisterStudentModal, setShowRegisterStudentModal] = useState(false);

    const [showEditStudentModal, setShowEditStudentModal] = useState(false);
    const [selectedStudentToEdit, setSelectedStudentToEdit] = useState("");

    const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
    const [selectedEmployeeToEdit, setSelectedEmployeeToEdit] = useState("");

    const handleEditStudent = (student) => {
            setSelectedStudentToEdit(student);
            setShowEditStudentModal(true);
    }
    const handleEditEmployee = (employee) => {
           setSelectedEmployeeToEdit(employee);
           setShowEditEmployeeModal(true);
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
        <section className="w-full bg-white justify-start items-center flex flex-col pl-80">
          <nav className="bg-white h-20 w-full justify-between items-center flex px-10">
               <h1>Dashboard</h1>
               <button className="bg-red-100 p-2 rounded-full text-xs cursor-pointer hover:bg-red-200 border-1 border-red-400 text-red-500">Logout</button>
          </nav>
          <Admin_SideBar/>
          <Admin_Dashboard/>
          <Admin_Materials/>
          <Admin_UserManagement refreshStudents={refreshStudentTable} 
                                refreshEmployees={refreshEmployeeTable}
                                openStudentModal={() => setShowRegisterStudentModal(true)}
                                openEmployeeModal={() => setShowRegisterEmployeeModal(true)}
                                handleEditStudent={handleEditStudent}
                                handleEditEmployee={handleEditEmployee}
                                />

          {showRegisterEmployeeModal && (
                <RegisterEmployeeModal
                    triggerRefreshEmployeeTable={triggerRefreshEmployeeTable}
                    closeEmployeeModal={() => setShowRegisterEmployeeModal(false)}
                />
          )}
          {showRegisterStudentModal && (
                <RegisterStudentModal
                    triggerRefreshStudentTable={triggerRefreshStudentTable}
                    closeStudentModal={() => setShowRegisterStudentModal(false)}
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
        </section>
    )
}
export default Admin_Page