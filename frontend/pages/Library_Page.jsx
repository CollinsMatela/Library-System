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
import { Book, ChevronRight, Info, LoaderCircle } from 'lucide-react'

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState([]);
    

    const showStories = (genre) => {
    setSelectedGenre(genre);
    };
    const [selectedTitle, setSelectedTitle] = useState('All');
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
        <section className="min-h-screen w-full justify-start items-center flex flex-col bg-stone-50 pb-10">

            <header className="w-5xl mt-20">
                    <h1 className="text-xl font-bold">Browse Books</h1>
                    <p className="mt-2 text-stone-600 text-xs">
                        Browse educational resources, fiction, and non-fiction books available in the library.
                    </p>
            </header>

            <div className="w-5xl justify-center items-center flex flex-col mt-6 rounded-xl ">                   
                    {isLoading ? 
                    (
                    <div className='w-full justify-center items-center flex p-4'>
                        <LoaderCircle size={20} className='animate-spin'/>
                    </div>
                    )
                    :
                    (
                        <div className='gap-4 justify-start items-start flex w-full'>
                            <div className='justify-start items-start flex flex-col w-100 gap-2 border border-stone-300 rounded-xl shadow-sm bg-white'>
                                <div className='w-full p-4 border-b border-stone-300'>
                                    <h1 className='text-lg font-bold text-stone-800'>Selection Section</h1>
                                    <h1 className='text-xs text-stone-500'>Find your choice</h1>
                                </div>
                                 

                                 <div className='w-full flex flex-col gap-1 px-4'>
                                    <h1 className='text-xs text-stone-800'>Alphabetical</h1>
                                    <select className='w-full border border-stone-300 rounded-xl p-2 text-xs text-stone-500'
                                            onChange={(e) => filterByLetter(e.target.value)}
                                    >
                                        {alphabetical.map((item) => (
                                            <option 
                                            key={item.value}
                                            value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                 </div>

                                 <div className='w-full flex flex-col gap-1 px-4'>
                                    <h1 className='text-xs text-stone-800'>Categories</h1>
                                    
                                        {categories.map((item) => (
                                            <button 
                                            className='w-full border-b border-stone-300 text-xs text-stone-500 py-2 justify-start items-center flex cursor-pointer hover:text-stone-800 hover:font-semibold gap-2'
                                            value={item.value}
                                            onClick={(e) => {filterByCategory(e.target.value);
                                                             setSelectedTitle(item.label);
                                            }}
                                            >
                                            <Book size={10}/>{item.label}
                                            </button>
                                        ))}
                                    
                                 </div>

                            </div>

                            
                                <div className='w-full border border-stone-300 shadow-sm rounded-xl'>
                                <header className='w-full p-4 border-b border-stone-300'>
                                    <h1 className='text-lg font-bold text-stone-800 justify-start items-center flex'>Book Collection <ChevronRight size={15}/> <span className='text-stone-500 text-lg'>{selectedTitle || "All"} {selectedLetter}</span></h1>
                                    <h1 className='text-xs text-stone-500 '>Browse and discover books in the library.</h1>
                                </header>
                            {selectedCategory.length > 1 ? (
                                <div className='bg-white w-full grid grid-cols-3 gap-1 p-4'>
                                    
                                    {selectedCategory.map((book) => (
                                        <Lib_BookCard 
                                        key={book._id}
                                        book={book}
                                        handleViewBook={() => handleViewBook(book._id)}
                                        showBorrowModal={() => handleBorrowModal(book._id)}
                                        requestBorrow={requestBorrow}
                                        />
                                    ))}
                                </div>

                               
                                
                            ) : (
                                <div className='p-4 justify-center items-center flex w-full gap-1'>
                                        <Info size={10} className='text-stone-500'/>
                                        <h1 className='text-stone-500 text-xs'>No Book found</h1>
                                    </div>
                            )}
                          </div>
                        </div>
                    
                    )}
                    

                 
                
                

            </div>
            
        </section>
        <Footer/>
         </>
         
    )}

export default Library_Page;
