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
import {Users, Contact, LibraryBig, Book, SquareGanttChart, CircleAlert, User, LoaderCircle, ImageOff} from 'lucide-react'
import { toast } from "react-toastify"
import Admin_Header from "../components/Admin_Header"

const Admin_Page = () =>{
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([])
    const [books, setBooks] = useState([])
    const [borrows, setBorrows] = useState([])
    const [logbook, setLogbook] = useState([]);

    const Pending = borrows.filter((borrow) => borrow.status === 'Pending')

    const cards = [
      {icon: <Users size={15}/>, title: 'No. of Users', value: users.length, text: 'Registered Users'},
      {icon: <LibraryBig size={15}/>, title: 'No. of Books', value: books.length, text: 'Published Books'},
      {icon: <SquareGanttChart size={15}/>, title: 'No. of Pending Request', value: Pending.length, text: 'Requests'},
       {icon: <Users size={15}/>, title: 'No. of Visitors', value: logbook.length, text: 'Visitors entered'},
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
  <>
  <Admin_SideBar/>
  <section className="bg-stone-50 min-h-screen w-full justify-start items-start flex flex-col pb-10 md:pl-20 lg:pl-60">
              
    <Admin_Header mainText={'Overview Library'} subText={'Oversee the details of the library'}/>

    <div className="w-full px-10 flex flex-col gap-4">


      <div className="w-full justify-between items-start flex">
        <div>
          <h2 className="text-3xl font-bold text-stone-800">Hello, {`${user.firstname || 'Admin'}`}</h2>
          <p className="text-stone-400 text-xs">Welcome back! Here's today's overview of Naic Municipal Library.</p>
        </div>
        
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <div
        key={index}
        className=" h-fit overflow-hidden rounded-lg border-b-4 border-stone-300 bg-white p-4 shadow-sm transition-all duration-300 hover:bg-stone-100 hover:shadow-lg"
      >

        {/* Content */}
        <div className=" flex h-full flex-w flex-col justify-center md:justify-between back">
          
          {/* Title + Icon */}
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-stone-800">
              {card.title}
            </p>

            <div className=" h-9 w-9 items-center justify-center flex rounded-xl bg-white/30 text-stone-500 border border-stone-300">
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <h1 className="text-2xl font-bold text-stone-800">
            {isLoading ? (<LoaderCircle size={20} className="text-stone-800 animate-spin"/>) : (`${card.value}`)}
          </h1>

          {/* Description */}
          <p className="hidden sm:block text-xs text-stone-800 border-t border-stone-400 pt-2">
            {card.text}
          </p>

        </div>
      </div>
              ))}
      </div>
        
      
      <div className="w-full bg-white border-b-4 border-stone-200 rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-start gap-2 mb-5">
              <div className="hidden md:block bg-white border border-stone-200 rounded-xl p-2">
                   <Book size={15} className="text-stone-500"/>
              </div>
              <div>
                    <h2 className="text-sm font-bold text-stone-800">Newest Book</h2>
                    <p className="text-xs text-stone-500">Latest added book to the library</p>
              </div>
          </div>
{isLoading ? 
          (
          <div className="w-full justify-center items-center flex">
            <LoaderCircle size={20} className="text-stone-800 animate-spin"/>
          </div>
          ) :
          (books.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Cover */}
              {!books[0].cover ?
              (
              <div className="hidden md:flex w-50 h-72 bg-stone-100 border border-stone-300 shadow-sm rounded-md flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center">
                  <ImageOff size={28} className="text-stone-400" strokeWidth={1.5} />
                </div>

                <div className="text-center px-4">
                  <p className="text-sm font-medium text-stone-600">
                    No Cover Available
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Cover image not provided
                  </p>
                </div>
              </div>
              )
              :
              (
              <img
                  src={books[0].cover}
                  alt={books[0].title}
                  className="hidden md:block w-50 h-72 object-cover shadow-sm rounded-md"
                />
              )}
              

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-stone-800">
                    {books[0].title}
                  </h3>
                  <p className="text-stone-500 text-xs">
                    <span className="">{books[0].author}</span>
                  </p>
                </div>

                <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-lg">
                    <p className="text-xs text-stone-800 font-semibold">Description</p>
                    <p className="text-xs text-stone-500 ">{books[0].description || 'No Description'}</p>
                  </div>

                <div className="grid grid-cols-3 gap-2">

                  <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-lg">
                    <p className="text-xs text-stone-800 font-semibold">Category</p>
                    <p className="text-xs text-stone-500 ">{books[0].category}</p>
                  </div>

                  <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-lg">
                    <p className="text-xs text-stone-800 font-semibold">Language</p>
                    <p className="text-xs text-stone-500 ">{books[0].category}</p>
                  </div>

                  <div className="hidden md:flex bg-stone-100 justify-start items-start flex-col p-4 rounded-lg">
                    <p className="text-xs text-stone-800 font-semibold">Publish Date</p>
                    <p className="text-xs text-stone-500 ">{new Date(books[0].createdAt).toLocaleDateString()}</p>
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
  </section>
  </>
);
}
export default Admin_Page