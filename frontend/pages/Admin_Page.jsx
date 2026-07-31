import Admin_Dashboard from "../components/Admin_Dashboard"
import Admin_Stories from "../components/Admin_Stories"
import Admin_UserManagement from "../components/Admin_UserManagement"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import Account_Conformation from "../popup/Account_Conformation"
import { useState, useEffect} from "react"
import axios from "axios"
import useAuthStore from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import Admin_SideBar from "../components/Admin_Sidebar"
import {Users, Contact, LibraryBig, Book, SquareGanttChart, CircleAlert, User} from 'lucide-react'
import { toast } from "react-toastify"

const Admin_Page = () =>{
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])
    const [borrows, setBorrows] = useState([])

    const Pending = borrows.filter((borrow) => borrow.status === 'Pending')

    const cards = [
      {icon: <Users size={15}/>, title: 'No. of Users', value: users.length, text: 'Registered Users in system'},
      {icon: <LibraryBig size={15}/>, title: 'No. of Books', value: books.length, text: 'Uploaded Books in system'},
      {icon: <SquareGanttChart size={15}/>, title: 'No. of Pending Request', value: Pending.length, text: 'Borrowing request from users in system'},
    ]

    const fetchUsers = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`)
            console.log(res.data.message);
            setUsers(res.data.users);
        } catch (error) {
            console.log(error)
        }
    }
    const fetchBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
            console.log(res.data.message);
            console.log(res.data.books.length)
            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
            }
    }
    const fetchAllBorrow = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrows(res.data.borrows);
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    useEffect(() => {
        fetchUsers()
        fetchBooks()
        fetchAllBorrow()
    }, [])


    return (
  <section className="min-h-screen w-full bg-white pl-70 pb-10">
    
    <Admin_SideBar/>

    <div className="py-10 px-10 flex flex-col gap-6">


      <div className="w-full justify-between items-start flex">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Hello {user?.username || "Admin"} 👋</h2>
          <p className="text-gray-400 text-xs">Welcome back! Here's today's overview of Naic Municipal Library.</p>
        </div>
        <p className="w-fit bg-blue-100 text-blue-500 text-xs font-bold rounded-full px-2 py-1 mb-2">Admin Portal</p>
        
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-blue-500 text-white rounded-2xl p-6`}
          >
            <p className="text-xs flex items-center gap-2">
              {card.title}
              {card.icon}
            </p>

            <h1 className="text-xl font-bold mt-3">
              {card.value}
            </h1>

            <p className="text-xs text-white mt-2 border-t border-white pt-4">
              {card.text}
            </p>
          </div>
        ))}
      </div>
        
      
      


      
      </div>
   
    
    <div className="w-full justify-between items-start flex gap-4 px-10">

      <div className="grid grid-cols-1 h-full w-1/2 gap-4">

        <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4">

            <div className="flex items-center justify-start gap-2 mb-5">
              <div className="bg-black p-2 rounded-xl">
                   <User size={20} color="white"/>
              </div>
              <div>
                    <h2 className="text-md font-bold text-gray-800">Recent Registered User</h2>
                    <p className="text-xs text-gray-500">Most recently added user to the library</p>
              </div>
          </div>

          {users.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((user) => (
             <div key={user._id} className="bg-white w-full border border-gray-300 rounded-xl p-2 mb-2">
              <div className="flex gap-2  ">
                  {user.avatar ? 
                  <img src={user.avatar} className="bg-gray-100 h-12 w-12 rounded-full" />
                  :
                  <div className="bg-blue-600 h-10 w-10 rounded-full text-white font-bold justify-center items-center flex">{user.firstname.charAt(0).toUpperCase()}</div>
                  }
                  <div>
                    <h1 className="text-black text-sm">{user.firstname} {user.lastname}</h1>
                    <h1 className="text-xs text-gray-500">Created At: {user.createdAt.split("T")[0]}</h1>
                  </div>
              </div>
                  
             </div>
          ))}
      </div>

      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 mb-5">
              <div className="bg-black p-2 rounded-xl">
                   <SquareGanttChart size={20} color="white"/>
              </div>
              <div>
                    <h2 className="text-md font-bold text-gray-800">Pendings Borrow</h2>
                    <p className="text-xs text-gray-500">Most recently pendings of borrowing to the library</p>
              </div>
          </div>
        </div>
          {Pending.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((pen, index) => (
             <div key={pen._id} className="bg-white w-full border border-yellow-500 rounded-xl p-2">
              <div className="justify-start items-center flex gap-2">

                  <div className="h-10 w-10 bg-yellow-500 rounded-xl justify-center items-center flex">
                    <CircleAlert size={20} color="white"/>
                  </div>

                  <div>
                    <h1 className="text-yellow-500 text-sm">{pen.name}</h1>
                    <h1 className="text-xs text-yellow-400">Requested Date: {pen.createdAt.split("T")[0]}</h1>
                  </div>

                  
              </div>
                  
             </div>
          ))}
      </div>

      </div>

      <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-start gap-2 mb-5">
              <div className="bg-black p-2 rounded-xl">
                   <Book size={20} color="white"/>
              </div>
              <div>
                    <h2 className="text-md font-bold text-gray-800">Newest Book</h2>
                    <p className="text-xs text-gray-500">Latest added book to the library</p>
              </div>
          </div>

        {books.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover */}
              <img
                src={books[0].cover}
                alt={books[0].title}
                className="w-50 h-72 object-cover shadow-sm rounded-md"
              />

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    {books[0].title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    <span className="">{books[0].author}</span>
                  </p>
                </div>

                <p className="text-gray-600 text-xs line-clamp-4">
                  {books[0].description || 'No Description'}
                </p>

                <div className="grid grid-cols-1 gap-2 mt-6">

                  <div className="bg-white justify-between items-center flex border-b border-gray-300">
                    <p className="text-xs text-black">Type</p>
                    <p className="text-xs">{books[0].type}</p>
                  </div>

                  <div  className="bg-white justify-between items-center flex border-b border-gray-300">
                    <p className="text-xs text-black">Category</p>
                    <p className="text-xs">{books[0].category}</p>
                  </div>

                  <div  className="bg-white justify-between items-center flex border-b border-gray-300">
                    <p className="text-xs text-black">Pages</p>
                    <p className="text-xs">{books[0].pages.length}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-500">
              No books uploaded yet.
            </div>
          )}
        </div>

      
      
      
    </div>


  </section>
  
);
}
export default Admin_Page