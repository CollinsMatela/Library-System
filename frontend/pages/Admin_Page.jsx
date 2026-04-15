import Admin_SideBar from "../components/Admin_Sidebar"
import Admin_Dashboard from "../components/Admin_Dashboard"
import Admin_Materials from "../components/Admin_Materials"
import Admin_UserManagement from "../components/Admin_UserManagement"
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal"
import RegisterStudentModal from "../modals/RegisterStudentModal"
import { useState } from "react"

const Admin_Page = () =>{
    const [showRegisterEmployeeModal, setShowRegisterEmployeeModal] = useState(false);
    const [showRegisterStudentModal, setShowRegisterStudentModal] = useState(false);

    const [refreshStudentTable, setRefreshStudentTable] = useState(false);
    const [refreshEmployeeTable, setRefreshEmployeeTable] = useState(false);

    const triggerRefreshStudentTable = () => {
        setRefreshStudentTable(prev => !prev);
    }
    const triggerRefreshEmployeeTable = () => {
        setRefreshEmployeeTable(prev => !prev);
    }

    return(
        <section className="h-screen w-full bg-gray-100 justify-start items-center flex flex-col pl-80">
          <Admin_SideBar/>
          <Admin_Dashboard/>
          <Admin_Materials/>
          <Admin_UserManagement refreshStudents={refreshStudentTable} 
                                refreshEmployees={refreshEmployeeTable}
                                openStudentModal={() => setShowRegisterStudentModal(true)}
                                openEmployeeModal={() => setShowRegisterEmployeeModal(true)}
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
        </section>
    )
}
export default Admin_Page