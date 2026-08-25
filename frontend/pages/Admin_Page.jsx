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
import {Users, Contact, LibraryBig, Book, SquareGanttChart, CircleAlert, User, LoaderCircle} from 'lucide-react'
import { toast } from "react-toastify"

const Admin_Page = () =>{
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])
    const [borrows, setBorrows] = useState([])
    const [logbook, setLogbook] = useState([]);

    const newestBookIndex = books.length - 1;

    const Pending = borrows.filter((borrow) => borrow.status === 'Pending')

    const cards = [
      {icon: <Users size={15}/>, title: 'No. of Users', value: users.length, text: 'Registered Users in system'},
      {icon: <LibraryBig size={15}/>, title: 'No. of Books', value: books.length, text: 'Uploaded Books in system'},
      {icon: <SquareGanttChart size={15}/>, title: 'No. of Pending Request', value: Pending.length, text: 'Request from users'},
       {icon: <Users size={15}/>, title: 'No. of Visitors', value: logbook.length, text: 'People entered the library'},
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

    const fetchLogBook = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-all-logbook`);
            console.log(res.data.message);
            setLogbook(res.data.logBookList);

        } catch (error) {
            toast.error(error.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
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
            
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
          try {
            await Promise.all([fetchBooks(), fetchAllBorrow(), fetchUsers(), fetchLogBook()])
          } catch (error) {
            console.log(error);
            toast.error('Failed to load data.');
          } finally {
            setIsLoading(false)
          }
        }

        loadData()
    }, [])


    return (
  <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pl-20 md:pl-60">
              
    <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-stone-300 p-3 px-10">
          <h1 className="text-sm font-bold text-stone-800">Library Overview</h1>
          <h1 className="text-stone-400 text-xs">Oversee the details of library</h1>                   
    </header>
    
    <Admin_SideBar/>

    <div className="w-full px-10 mb-4 flex flex-col gap-6">


      <div className="w-full justify-between items-start flex">
        <div>
          <h2 className="text-3xl font-bold text-stone-800">Hello, Librarian</h2>
          <p className="text-stone-400 text-xs">Welcome back! Here's today's overview of Naic Municipal Library.</p>
        </div>
        
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <div
        key={index}
        className=" h-fit overflow-hidden rounded-2xl border-b-4 border-stone-300 bg-stone-800 p-4 shadow-sm transition-all duration-300 hover:bg-stone-900 hover:shadow-lg"
      >

        {/* Content */}
        <div className=" flex h-full flex-w flex-col justify-center md:justify-between back">
          
          {/* Title + Icon */}
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-white">
              {card.title}
            </p>

            <div className=" h-9 w-9 items-center justify-center flex rounded-xl bg-white/30 text-white border">
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <h1 className="text-2xl font-bold text-white">
            {isLoading ? (<LoaderCircle size={20} className="text-white animate-spin"/>) : (`${card.value}`)}
          </h1>

          {/* Description */}
          <p className="hidden sm:block text-xs text-white border-t pt-2">
            {card.text}
          </p>

        </div>
      </div>
              ))}
      </div>
        
      
      <div className="w-full bg-white border border-stone-300 rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-start gap-2 mb-5">
              <div className="hidden md:block bg-stone-800 p-2">
                   <Book size={20} color="white"/>
              </div>
              <div>
                    <h2 className="text-md font-bold text-stone-800">Newest Book</h2>
                    <p className="text-xs text-stone-500">Latest added book to the library</p>
              </div>
          </div>
{isLoading ? 
          (
          <div className="w-full justify-center items-center flex"><LoaderCircle size={20} className="text-stone-500 animate-spin"/></div>
          ) :
          (books.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover */}
              <img
                src={books[newestBookIndex].cover}
                alt={books[newestBookIndex].title}
                className="hidden md:block w-50 h-72 object-cover shadow-sm rounded-md"
              />

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-stone-800">
                    {books[newestBookIndex].title}
                  </h3>
                  <p className="text-stone-500 text-xs">
                    <span className="">{books[newestBookIndex].author}</span>
                  </p>
                </div>

                <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-xl">
                    <p className="text-xs text-stone-500 font-semibold">Type</p>
                    <p className="text-xs text-stone-500 ">{books[newestBookIndex].description || 'No Description'}</p>
                  </div>

                <div className="grid grid-cols-3 gap-2">

                  <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-xl">
                    <p className="text-xs text-stone-500 font-semibold">Type</p>
                    <p className="text-xs text-stone-500 ">{books[newestBookIndex].type}</p>
                  </div>

                  <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-xl">
                    <p className="text-xs text-stone-500 font-semibold">Category</p>
                    <p className="text-xs text-stone-500 ">{books[newestBookIndex].category}</p>
                  </div>

                  <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-xl">
                    <p className="text-xs text-stone-500 font-semibold">Pages</p>
                    <p className="text-xs text-stone-500 ">{books[newestBookIndex].pages.length}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-stone-500">
              No books uploaded yet.
            </div>
          ))}
        </div>


      
      </div>
   
    
    <div className="w-full justify-between items-start flex-col md:flex-row gap-4 px-10">

      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full gap-4 bg-white mb-4">

        <div className="bg-white border border-stone-300 rounded-xl shadow-sm p-4">

            <div className="flex items-center justify-start gap-2 mb-5">
              <div className="hidden md:block bg-stone-800 p-2">
                   <User size={20} color="white"/>
              </div>
              <div>
                    <h2 className="text-md font-bold text-stone-800">Recent Users</h2>
                    <p className="text-xs text-stone-500">Most recent added users</p>
              </div>
          </div>
          
          {isLoading ? 
          (
          <div className="w-full justify-center items-center flex"><LoaderCircle size={20} className="text-stone-500 animate-spin"/></div>
          ) :
          (
          users.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3).map((user) => (
                      <div key={user._id} className=" bg-white w-full border border-stone-300 rounded-xl p-2 mb-2">
                        <div className="flex gap-2  ">
                            {user.avatar ? 
                            <img src={user.avatar} className="bg-stone-100 h-12 w-12 rounded-full" />
                            :
                            <div className="bg-blue-600 h-10 w-10 rounded-full text-white font-bold justify-center items-center flex">{user.firstname.charAt(0).toUpperCase()}</div>
                            }
                            <div className="justify-center items-center md:items-start flex-col">
                              <h1 className="text-stone-800 text-xs">{user.firstname} {user.lastname}</h1>
                              <h1 className="text-xs text-stone-500">{new Date(user.createdAt).toLocaleDateString()}</h1>
                            </div>
                        </div>
                            
                      </div>
                    ))
          )}
          
      </div>

      <div className="bg-white border border-stone-300 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 mb-5">
              <div className="hidden md:block bg-stone-800 p-2">
                   <SquareGanttChart size={20} color="white"/>
              </div>
              <div>
                    <h2 className="text-md font-bold text-stone-800">Pendings Borrow</h2>
                    <p className="text-xs text-stone-500">Most recent request</p>
              </div>
          </div>
        </div>
         {isLoading ? (
  <div className="w-full flex items-center justify-center">
    <LoaderCircle
      size={20}
      className="text-stone-500 animate-spin"
    />
  </div>
) : Pending.length > 0 ? (
  Pending
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
    .map((pen) => (
      <div
        key={pen._id}
        className="w-full rounded-xl border border-stone-300 bg-white p-2"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500">
            <CircleAlert size={20} color="white" />
          </div>

          <div>
            <h1 className="text-sm text-stone-500">
              {pen.name}
            </h1>

            <h1 className="text-xs text-stone-400">
              {new Date(pen.createdAt).toLocaleDateString()}
            </h1>
          </div>
        </div>
      </div>
    ))
) : (
  <div className="flex items-center justify-center p-4 text-stone-500 text-xs bg-stone-200 rounded-xl">
    No pending requests.
  </div>
)}
      </div>

      </div>

      
        
      
      
      
    </div>


  </section>
  
);
}
export default Admin_Page