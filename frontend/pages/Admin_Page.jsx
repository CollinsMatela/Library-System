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
        <section className="w-full justify-start items-start flex pl-20">

          <Admin_SideBar/>

          <div className="h-screen w-full overflow-auto">
                <nav className="h-15 w-full justify-start items-center flex border-b-1 gap-2 border-gray-300 px-10">
                        <h1 className="text-xl">Overview</h1>
                </nav>
                <Admin_Dashboard/>
                {/* <Admin_Materials/> */}
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
          </div>

          
        </section>
    )
}
export default Admin_Page