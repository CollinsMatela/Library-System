import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { alphabetical, categories } from '../mockdata'

import Footer from '../components/Footer'
import Lib_KindergartenBooks from '../library_components/Lib_KindergartenBooks'
import Lib_FirstGradeBooks from '../library_components/Lib_FirstGradeBooks'
import Lib_SecondGradeBooks from '../library_components/Lib_SecondGradeBooks'
import Lib_ThirdGradeBooks from '../library_components/Lib_ThirdGradeBooks'
import Lib_FourthGradeBooks from '../library_components/Lib_FourthGradeBooks'
import Lib_Navigation from '../library_components/Lib_Navigation'
import Lib_Story_Buttons from '../library_components/Lib_Story_Buttons'
import Lib_Shelf from '../library_components/Lib_Shelf'
import Lib_View_Story from '../library_components/Lib_ViewBook'
import Lib_BookCard from '../library_components/Lib_BookCard'
import defaultProfile from '../src/assets/Student.jpg'
import LoadingScreen from '../loadings/loading'
import { useNavigate } from 'react-router-dom'
import BorrowModal from '../modals/BorrowModal'
import { Book, BookOpen, ChevronRight, ImageOff, Info, LoaderCircle, MoveRight, Search, UserCircle } from 'lucide-react'

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [serchedBooks, setSearchedBooks] = useState([]);
    useEffect(() => {
       if (searchQuery.length === 0) {
        setSearchedBooks([]);
      } else {
        setSearchedBooks(books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
      }
       
    }, [searchQuery])
    const latestOrderBook = books.slice(0,5);

    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([])
    const [selectedLetter, setSelectedLetter] = useState('')

    const filterByCategory = (category) => {
        let result = null
        let newestOrderBook = books.reverse()
        setSelectedCategory([])

        if(!category){
          setSelectedCategory(newestOrderBook)
        } else {
            result = newestOrderBook.filter((b) => b.category.toLowerCase().trim() === category.toLowerCase().trim())
            setSelectedCategory(result)
            console.log(result)
        } 
    }

    const filterByLetter = (letter) => {
        let result = null
        setSelectedCategory([])
        
        if(!letter){
           setSelectedCategory(books);
        } else {
            result = books.filter((b) => b.title.toLowerCase().startsWith(letter))
           setSelectedCategory(result) 
        }
        
        }
    

    const [showBorrowModal, setShowBorrowModal] = useState(false);

    const [selectedBook, setSelectedBook] = useState(null);
    const filteredBook = books.find((book) => book._id === selectedBook);

    const handleViewBook = (id) => {
          setSelectedBook(id)
          navigate(`/library/view-book/${id}`)
    }
    const handleBorrowModal = (id) => {
          setSelectedBook(id)
          setShowBorrowModal(true);
    }

    useEffect(() => {
          const loadData = async () => {
                setIsLoading(true)
            try {
                await Promise.all([fetchBooks(), fetchAllBorrow()])
            } catch (error) {
                toast.error('Failed to load the Data.')
            } finally {
                setIsLoading(false)
            }
          }
           
          loadData();
        },[])
    
    const fetchBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
            setSelectedCategory(res.data.books);
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
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
         }
    }

    const requestBorrow = async (bookId) => {

        const requestData = {
            userId: user._id,
            name: `${user.firstname, user.lastname}`,
            bookId: bookId,
        }

         try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/request-borrow`, requestData);
            toast.success(res.data.message);
            fetchBooks();

         } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
         }
    }
    

    return(
        <>
        {showBorrowModal && (<BorrowModal 
        book={filteredBook} 
        onClose={() => setShowBorrowModal(false)}
        requestBorrow={requestBorrow}
        />)}
        <Lib_Navigation/>
        <section className="min-h-screen w-full justify-start items-center flex flex-col bg-white pb-10">

            
            <div className='w-full lg:w-5xl px-4 lg:px-0'>
            <header className="w-fit mt-20 p-2 bg-white rounded-lg justify-center items-start flex flex-col gap-2 mb-4">
                <h1 className="text-2xl font-bold text-stone-800">Welcome back, {user?.firstname} {user?.lastname}! </h1>
                <p className="text-sm text-stone-500">
                    Discover books, track your borrowed materials, and explore the library collection.
                </p>
            </header>
            {/**Basic Search */}
            <div className='w-full'>
                <h1 className="text-xs mb-2 font-semibold text-stone-800 mt-6">Basic Search</h1>
                <div className="w-full h-12 rounded-xl border border-stone-300 justify-center items-center flex px-4 gap-2">
                    <Search size={15} className='text-stone-500 '/>
                    <input type="text" 
                        placeholder="Search title of the book..."
                        className="outline-none bg-transparent text-sm text-stone-500 placeholder:text-stone-500 w-full h-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='w-full border border-stone-200 rounded-xl px-4 py-2 mt-2'>
                    {serchedBooks.length > 0 && (
                        <div>
                            <h1 className="text-xs font-semibold text-stone-500 my-2">Search result <span className="bg-stone-800 px-1 text-white text-[10px] rounded-xl">{serchedBooks.length}</span></h1>
                            {serchedBooks.slice(0, 5).map((book) => (
                                <div key={book._id} className="py-2 flex items-center gap-3 text-left border-b border-stone-300 hover:border-stone-800 transition-all cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0">
                                        <Book size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-xs font-semibold text-stone-800">
                                            {book.title}
                                        </h2>
                                        <p className="text-[10px] text-stone-500 mt-0.5">
                                            {book.author}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="w-full justify-end items-center flex py-4 mt-2">
                                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => navigate("/library/catalog")}>
                                    Go to advanced searching
                                </button>
                            </div>
                        </div>
                        )}   
                    </div>
                    
                </div>
            </div>

            {/** Quick Access */}
<div className="w-full lg:w-5xl px-4 lg:px-0">
    <h1 className="text-xs mb-2 font-semibold text-stone-800 mt-6">
        Quick Access
    </h1>

    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">

        {/** Search & Catalog */}
        <button
            onClick={() => navigate("/library/catalog")}
            className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3 text-left hover:bg-stone-100 hover:border-stone-300 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0">
                <Search size={18} />
            </div>

            <div className="min-w-0">
                <h2 className="text-xs font-semibold text-stone-800">
                    Search & Catalog
                </h2>
                <p className="text-[10px] text-stone-500 mt-0.5">
                    Find books and library materials
                </p>
            </div>
        </button>

        {/** Borrow Status */}
        <button
            onClick={() => navigate("/library/borrow-status")}
            className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3 text-left hover:bg-stone-100 hover:border-stone-300 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                <BookOpen size={18} />
            </div>

            <div className="min-w-0">
                <h2 className="text-xs font-semibold text-stone-800">
                    Borrow Status
                </h2>
                <p className="text-[10px] text-stone-500 mt-0.5">
                    Track your borrowed books
                </p>
            </div>
        </button>

        {/** My Account */}
        <button
            onClick={() => navigate("/library/my-account")}
            className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-3 text-left hover:bg-stone-100 hover:border-stone-300 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                <UserCircle size={18} />
            </div>

            <div className="min-w-0">
                <h2 className="text-xs font-semibold text-stone-800">
                    My Account
                </h2>
                <p className="text-[10px] text-stone-500 mt-0.5">
                    Manage your library account
                </p>
            </div>
        </button>

    </div>
</div>

         {/**Basic Search */}
            <div className="w-full lg:w-5xl px-4 lg:px-0">
                <h1 className="text-xs mb-2 font-semibold text-stone-800 mt-6">Latest Books</h1>
                <div className="w-full justify-center items-start flex gap-2">
                    {latestOrderBook.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <LoaderCircle size={20} className="text-stone-500 animate-spin" />
                        </div>
                    ) : (
                        latestOrderBook.map((book) => (
                            <div key={book.id} className="w-full h-full flex flex-col items-center text-center ">
                                {!book.cover ? (
                                    <div className="w-full h-80 bg-stone-200 rounded-xl flex items-center justify-center">
                                        <ImageOff size={62} className="text-stone-300" />
                                    </div>
                                ) : (
                                    <img src={book.cover} alt={book.title} className="w-full h-80 object-cover rounded-xl" />
                                )}
                                <p className="text-sm text-stone-500 mt-3">{book.title}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
        </section>
         </>
         
    )}

export default Library_Page;
