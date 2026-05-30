import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"
import LittleMeLogo from "../public/LMLC.png"
import { useState } from "react";

const Admin_SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const isOverview = location.pathname === "/admin";
    const isUploadStory = location.pathname === "/admin/upload";
    const isViewStory = location.pathname === "/admin/materials";
    const isStudentAccount = location.pathname === "/admin/students";
    const isEmployeeAccount = location.pathname === "/admin/employee";

    const handleOverview = () => {
          navigate('/admin');
    }
    const handleUploadStory = () => {
          navigate('/admin/upload');
    }
    const handleViewStory = () => {
          navigate('/admin/materials');
    }
    const handleStudent = () => {
          navigate('/admin/students');
    }
    const handleEmployee = () => {
          navigate('/admin/employee');
    }

    const handleLogout = () =>{
          logout();
          localStorage.removeItem("token");
          navigate("/");
    }  
    return(
        <aside className="fixed left-0 top-0 z-0 h-full w-80 bg-white border-r-1 border-gray-300 px-4 py-10">
       <div className="justify-start items-center flex gap-2">
          <div className="bg-white rounded-2xl h-12 w-12 flex justify-center items-center">
              <img src={LittleMeLogo} alt="Little Me Logo" className="h-8 w-8 object-cover"/>
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-pink-500">Little Me Admin</h1>
            <p className="text-xs text-gray-400">Learning Center Dashboard</p>
          </div>
      </div>

      <div className="text-gray-500 text-sm py-2 px-4 rounded-lg mt-6">
        Admin Menu
      </div>

      <div className={`${isOverview ? "bg-pink-500 text-white" : "hover:bg-gray-100 text-gray-800"} justify-start items-center flex font-semibold gap-2 cursor-pointer py-2 hover:border-none rounded-xl mt-2 p-2`} onClick={handleOverview}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        Overview
      </div>

      <div className={`${isUploadStory ? "bg-pink-500 text-white" : "hover:bg-gray-100 text-gray-800"} justify-start items-center flex font-semibold gap-2 cursor-pointer py-2 hover:border-none rounded-xl mt-2 p-2`} onClick={handleUploadStory}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        Upload Story
      </div>

      <div className={`${isViewStory ? "bg-pink-500 text-white" : "hover:bg-gray-100 text-gray-800"} justify-start items-center flex font-semibold gap-2 cursor-pointer py-2 hover:border-none rounded-xl mt-2 p-2`} onClick={handleViewStory}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        View Stories
      </div>

      <div className={`${isStudentAccount ? "bg-pink-500 text-white" : "hover:bg-gray-100 text-gray-800"} justify-start items-center flex font-semibold gap-2 cursor-pointer py-2 hover:border-none rounded-xl mt-2 p-2`} onClick={handleStudent}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        Students Account
      </div>

      <div className={`${isEmployeeAccount ? "bg-pink-500 text-white" : "hover:bg-gray-100 text-gray-800"} justify-start items-center flex font-semibold gap-2 cursor-pointer py-2 hover:border-none rounded-xl mt-2 p-2`} onClick={handleEmployee}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        Employee Account
      </div>

      <div className="text-gray-500 text-sm py-2 px-4 rounded-lg mt-6">
        Other Menu
      </div>
      <div className="justify-start items-center flex font-semibold text-gray-800 flex  gap-2 cursor-pointer py-2 hover:bg-red-100 hover:text-red-500 hover:border-none rounded-xl mt-2 p-2" onClick={handleLogout}>
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        Logout
      </div>

    </aside>
    )
}
export default Admin_SideBar