import Admin_SideBar from "../components/Admin_Sidebar"
import Admin_Dashboard from "../components/Admin_Dashboard"
import Admin_Materials from "../components/Admin_Materials"
import Admin_UserManagement from "../components/Admin_UserManagement"

const Admin_Page = () =>{
    return(
        <section className="h-screen w-full bg-gray-100 justify-start items-center flex flex-col pl-80">
          <Admin_SideBar/>
          <Admin_Dashboard/>
          <Admin_Materials/>
          <Admin_UserManagement/>
 
        </section>
    )
}
export default Admin_Page