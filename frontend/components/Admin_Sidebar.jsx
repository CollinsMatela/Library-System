import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"
import { useState } from "react";
import { AppWindow, FileUp, LibraryBig, Users, Contact, LogOut, HandHelping, User, ArrowUp, Home, BookUser, ScrollText, Package, SquarePen, ShieldCog, Lock, Pen, Square, Plus } from 'lucide-react'
import NaicLogo from '../src/assets/NaicLibraryLogo.png'
import Confirmation_Popup from "../popup/Confirmation_Popup";

const Admin_SideBar = () => {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const isOverview = location.pathname === "/admin";
    const isLogBook = location.pathname === "/admin/log-book";
    const isUploadStory = location.pathname === "/admin/upload-book";
    const isViewStory = location.pathname === "/admin/books";
    const isUsersAccount = location.pathname === "/admin/users";
    const isAuthority = location.pathname === "/admin/authority";
    const isBorrowBook = location.pathname === "/admin/borrow-book"
    const isInventory = location.pathname === "/admin/inventory";
    const isEdit = location.pathname === "/admin/edit"

    const lowAccess = !["assistant librarian", "it librarian", "head librarian", "system administrator"].includes(user?.role) // Librarian Assistant
    const midAccess = !["it librarian", "head librarian", "system administrator"].includes(user?.role) // IT Librarian
    const highAccess = !["head librarian", "system administrator"].includes(user?.role) // Head Librarian
    const fullAccess = !["system administrator"].includes(user?.role); // System Administrator

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
    const handleAuthority = () => {
          navigate('/admin/authority');
    }
    const handleBorrowBook = () => {
          navigate('/admin/borrow-book');
    }
    const handleInventory = () => {
          navigate('/admin/inventory');
    }
    const handleEdit = () => {
          navigate('/admin/edit');
    }

    const handleLogout = () =>{
          logout();
          localStorage.removeItem("token");
          navigate("/");
    }  
    return(
      <>
      {showConfirmation && (
        <Confirmation_Popup
        onConfirm={() => handleLogout()}
        onCancel={() => setShowConfirmation(false)}
        message={'Are you sure to logout?'}
        />
      )}
      <aside className="fixed bottom-0 md:top-0 lg:left-0 z-0 h-fit md:h-full w-full md:w-20 lg:w-60 bg-white border-r border-stone-300">
        
       <div className="hidden md:flex justify-center lg:justify-start items-center lg:gap-2 p-3 border-b border-stone-300">
        
          <div className="bg-white rounded-full h-8 w-8 flex justify-center items-center">
              <img src={NaicLogo} alt="Little Me Logo" className="h-full w-full object-cover"/>
          </div>
          
          <div>
            <h1 className="hidden lg:block text-sm font-bold text-stone-800">Naic Municipal Library</h1>
            <p className="hidden lg:block text-[10px] text-stone-400">Library Management Portal</p>
          </div>
      </div>


      <div className="w-full px-2">

      <div className="hidden lg:flex justify-center md:justify-start items-center text-stone-800 text-[10px] py-2 px-4 mt-6">
        <h1 className="hidden lg:block">Menu</h1>
      </div>
      
      <div className="w-full grid grid-cols-10 md:grid-cols-1">

      <div className={`${isOverview ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleOverview}>
        <Home className={`${isOverview ? 'text-white' : 'text-stone-800'}`} size={15}/>
       <h1 className="hidden lg:block">Overview</h1>
        
      </div>

      <button disabled={lowAccess}
      className={`${lowAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isLogBook ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleLogBook}>
        {lowAccess ?
        <Lock className={`${isLogBook ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <BookUser className={`${isLogBook ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Logbook</h1>
        
      </button>

      <button disabled={lowAccess}
      className={`${lowAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isViewStory ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleViewStory}>
        {lowAccess ?
        <Lock className={`${isViewStory ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <LibraryBig className={`${isViewStory ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Catalog</h1>
      </button>

      <button disabled={midAccess}
       className={`${midAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isUploadStory ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleUploadStory}>
        {midAccess ?
        <Lock className={`${isUploadStory ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <Plus className={`${isUploadStory ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Upload</h1>
      </button>

      <button disabled={midAccess}
      className={`${midAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isEdit ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 text-[10px] rounded-lg justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleEdit}>
        {midAccess ?
        <Lock className={`${isEdit ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <SquarePen className={`${isEdit ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Edit</h1>
      </button>

      <button disabled={midAccess}
      className={`${midAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isInventory ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleInventory}>
        {midAccess ?
        <Lock className={`${isInventory ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <Package className={`${isInventory ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Inventory</h1>
      </button>

      <button disabled={highAccess}
      className={`${highAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isBorrowBook ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleBorrowBook}>
        {highAccess ?
        <Lock className={`${isBorrowBook ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <HandHelping className={`${isBorrowBook ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Request</h1>
      </button>

      <button disabled={fullAccess}
      className={`${fullAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isAuthority ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2  hover:border-none mt-1 py-4 px-2`} onClick={handleAuthority}>
        {fullAccess ?
        <Lock className={`${isAuthority ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <ShieldCog className={`${isAuthority ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Authority</h1>
      </button>

      <button disabled={fullAccess}
      className={`${fullAccess ? "bg-stone-100 cursor-not-allowed" : ""} ${isUsersAccount ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-800"} h-10 rounded-lg text-[10px] justify-center lg:justify-start items-center flex font-normal gap-2 hover:border-none mt-1 py-4 px-2`} onClick={handleUsers}>
        {fullAccess ?
        <Lock className={`${isUsersAccount ? 'text-white' : 'text-stone-800'}`} size={15}/>
        :
        <Users className={`${isUsersAccount ? 'text-white' : 'text-stone-800'}`} size={15}/>
        }
        <h1 className="hidden lg:block">Accounts</h1>
      </button>
      </div>

      </div>

    </aside>
    </>
    )
}
export default Admin_SideBar