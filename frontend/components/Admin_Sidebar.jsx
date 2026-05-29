import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"

const Admin_SideBar = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () =>{
          logout();
          localStorage.removeItem("token");
          navigate("/");
    }  
    return(
        <aside className="fixed left-0 top-0 z-0 h-full w-80 bg-gray-50 p-4">
       <div>
        <h1 className="text-2xl font-bold text-pink-500">Little Me Admin</h1>
        <p className="text-sm text-gray-400">Learning Center Dashboard</p>
      </div>

      <div className="bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded-lg mt-6">
        Admin Menu
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Overview</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin/upload')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Upload Story</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin/materials')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">View Stories</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin/students')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Students Account</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={() => navigate('/admin/employee')}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Employee Account</button>
      </div>

      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Activity Log</button>
      </div>

      <div className="bg-gray-100 text-gray-500 font-bold py-2 px-4 rounded-lg mt-6">
        Other Menu
      </div>
      <div className="flex gap-2 cursor-pointer py-2 hover:bg-gray-100 hover:border-none rounded-xl mt-2 p-2" onClick={handleLogout}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <button className="text-gray-500 font-semibold">Logout</button>
      </div>

    </aside>
    )
}
export default Admin_SideBar