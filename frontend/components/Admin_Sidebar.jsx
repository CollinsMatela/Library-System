import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"
import { useState } from "react";
import { AppWindow, FileUp, LibraryBig, Users, Contact, LogOut, HandHelping, User, ArrowUp, Home, BookUser } from 'lucide-react'
import NaicLogo from '../src/assets/NaicLibraryLogo.png'

const Admin_SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const isOverview = location.pathname === "/admin";
    const isLogBook = location.pathname === "/admin/log-book";
    const isUploadStory = location.pathname === "/admin/upload-book";
    const isViewStory = location.pathname === "/admin/books";
    const isUsersAccount = location.pathname === "/admin/users";
    const isUserRegistration = location.pathname === "/admin/user-registration";
    const isBorrowBook = location.pathname === "/admin/borrow-book"

    const handleOverview = () => {
          navigate('/admin');
    }
    const handleLogBook = () => {
          navigate('/admin/log-book');
    }
    const handleUploadStory = () => {
          navigate('/admin/upload-book');
    }
    const handleViewStory = () => {
          navigate('/admin/books');
    }
    const handleUsers = () => {
          navigate('/admin/users');
    }
    const handleUserRegistration = () => {
          navigate('/admin/user-registration');
    }
    const handleBorrowBook = () => {
          navigate('/admin/borrow-book');
    }

    const handleLogout = () =>{
          logout();
          localStorage.removeItem("token");
          navigate("/");
    }  
    return(
      <aside className="fixed bottom-0 md:top-0 lg:left-0 z-0 h-fit md:h-full w-full md:w-20 lg:w-60 bg-white border-r border-stone-300">
        
       <div className="hidden md:flex justify-center lg:justify-start items-center lg:gap-2 p-3 border-b border-stone-300">
        
          <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center">
              <img src={NaicLogo} alt="Little Me Logo" className="h-full w-full object-cover"/>
          </div>
          
          <div>
            <h1 className="hidden lg:block text-sm font-bold text-black">Naic Municipal Library</h1>
            <p className="hidden lg:block text-xs text-stone-400">Admin Portal</p>
          </div>
      </div>

      <div className="hidden lg:flex justify-center md:justify-start items-center text-stone-500 text-xs py-2 px-4 mt-6">
        <h1 className="hidden lg:block">Menu</h1>
      </div>
      
      <div className="w-full grid grid-cols-8 md:grid-cols-1">

      <div className={`${isOverview ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleOverview}>
        <Home className={`${isOverview ? 'text-white' : 'text-stone-500'}`} size={20}/>
       <h1 className="hidden lg:block">Overview</h1>
        
      </div>

      <div className={`${isLogBook ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleLogBook}>
        <BookUser className={`${isLogBook ? 'text-white' : 'text-stone-500'}`} size={20}/>
        <h1 className="hidden lg:block">Logbook</h1>
        
      </div>

      <div className={`${isUploadStory ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleUploadStory}>
        <ArrowUp className={`${isUploadStory ? 'text-white' : 'text-stone-500'}`} size={20}/>
        <h1 className="hidden lg:block">Upload</h1>
      </div>

      <div className={`${isViewStory ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleViewStory}>
        <LibraryBig className={`${isViewStory ? 'text-white' : 'text-stone-500'}`} size={20}/>
        <h1 className="hidden lg:block">Catalog</h1>
      </div>

      <div className={`${isBorrowBook ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleBorrowBook}>
        <HandHelping className={`${isBorrowBook ? 'text-white' : 'text-stone-500'}`} size={20}/>
        <h1 className="hidden lg:block">Request</h1>
      </div>

      <div className={`${isUserRegistration ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleUserRegistration}>
        <User className={`${isUserRegistration ? 'text-white' : 'text-stone-500'}`} size={20}/>
        <h1 className="hidden lg:block">Registration</h1>
      </div>

      <div className={`${isUsersAccount ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-500"} h-10 text-xs justify-center lg:justify-start items-center flex font-semibold gap-2 cursor-pointer hover:border-none mt-2 p-4`} onClick={handleUsers}>
        <Users className={`${isUsersAccount ? 'text-white' : 'text-stone-500'}`} size={20}/>
        <h1 className="hidden lg:block">Accounts</h1>
      </div>

      <div className="h-10 text-xs justify-center lg:justify-start items-center flex font-semibold text-red-500 flex  gap-2 cursor-pointer py-2 hover:bg-red-100 hover:border-none mt-2 p-4" onClick={handleLogout}>
        <LogOut className={`text-red-500`} size={20}/>
        <h1 className="hidden lg:block">Logout</h1>
      </div>
      </div>

    </aside>
    )
}
export default Admin_SideBar