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
       
    }, [searchQuery, books])
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

            
            <div className="w-full max-w-5xl px-4">
            {/* `mt-20` clears the fixed `h-16` navigation rendered above. */}
            <header className="mt-20 mb-4">
                <h1 className="text-2xl font-bold text-stone-800">Welcome back, {user?.firstname} {user?.lastname}! </h1>
                <p className="mt-1 text-sm text-stone-500">
                    Discover books, track your borrowed materials, and explore the library collection.
                </p>
            </header>
            {/**Basic Search */}
            <div className='w-full'>
                <h2 className="text-xs mb-2 font-semibold text-stone-800 mt-6">Basic Search</h2>
                <div className="w-full h-12 rounded-xl border border-stone-300 justify-center items-center flex px-4 gap-2">
                    <Search size={15} className='text-stone-500 '/>
                    <input type="text" 
                        placeholder="Search title of the book..."
                        className="outline-none bg-transparent text-sm text-stone-500 placeholder:text-stone-500 w-full h-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='w-full rounded-xl py-2'>
                    {serchedBooks.length > 0 && (
                        <div className="w-full rounded-xl px-4 py-2 bg-stone-50 border border-stone-300">
                            <h2 className="text-xs font-semibold text-stone-500 my-2">Search result <span className="bg-stone-800 px-1 text-white text-[10px] rounded-xl">{serchedBooks.length}</span></h2>
                            {serchedBooks.length > 5 && (
                                <p className="text-[10px] text-stone-400 mt-1">Showing the top 5 of {serchedBooks.length} matches.</p>
                            )}
                            {serchedBooks.slice(0, 5).map((book) => (
                                // A button rather than a styled div: the row already
                                // looked clickable but had no handler, and this gives it
                                // keyboard access for free. Spans, not headings - a
                                // heading is not phrasing content, so it is invalid
                                // inside <button>.
                                <button
                                    key={book._id}
                                    type="button"
                                    onClick={() => handleViewBook(book._id)}
                                    className="w-full py-2 flex items-center gap-3 text-left border-b border-stone-300 hover:border-stone-800 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
                                >
                                    <span className="w-10 h-10 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0">
                                        <Book size={18} />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-xs font-semibold text-stone-800 truncate">
                                            {book.title}
                                        </span>
                                        <span className="block text-[10px] text-stone-500 mt-0.5 truncate">
                                            {book.author}
                                        </span>
                                    </span>
                                </button>
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
<div className="w-full max-w-5xl px-4">
    <h2 className="text-xs mb-2 font-semibold text-stone-800 mt-6">
        Quick Access
    </h2>

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

         {/**Latest Books */}
            <div className="w-full max-w-5xl px-4">
                <div className="flex items-center justify-between mt-6 mb-3">
                    <h2 className="text-xs font-semibold text-stone-800">Latest Books</h2>
                    <button
                        type="button"
                        onClick={() => navigate("/library/catalog")}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded"
                    >
                        View all
                        <ChevronRight size={13} />
                    </button>
                </div>

                {/* `isLoading` is what distinguishes "still fetching" from "the
                    library has nothing" - keying this off the array length alone
                    left the spinner running forever on an empty library. */}
                {isLoading ? (
                    <div className="w-full flex items-center justify-center py-16">
                        <LoaderCircle size={20} className="text-stone-500 animate-spin" />
                    </div>
                ) : latestOrderBook.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-stone-50 py-16 text-center">
                        <ImageOff size={32} className="text-stone-300" />
                        <p className="text-xs font-semibold text-stone-700">No books yet</p>
                        <p className="text-[10px] text-stone-400">New titles will appear here as they are added.</p>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {latestOrderBook.map((book) => (
                            <button
                                key={book._id}
                                type="button"
                                onClick={() => handleViewBook(book._id)}
                                className="group flex flex-col items-center text-left cursor-pointer"
                            >
                                <span className="block w-full aspect-[3/4] overflow-hidden rounded-xl bg-stone-200 border border-stone-200 group-hover:border-stone-400 transition-colors">
                                    {book.cover ? (
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center">
                                            <ImageOff size={40} className="text-stone-300" />
                                        </span>
                                    )}
                                </span>
                                <p className="mt-3 line-clamp-2 text-xs leading-snug text-stone-600 group-hover:text-stone-900 transition-colors">
                                    {book.title}
                                </p>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
        </section>
         </>
         
    )}

export default Library_Page;
