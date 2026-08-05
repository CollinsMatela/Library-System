import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify"

import SearchIcon from '../src/assets/search-svgrepo-com.svg'
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
import { LoaderCircle } from 'lucide-react'

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
        <section className="min-h-screen w-full justify-start items-center flex flex-col bg-gray-50 pb-10">
           
            <Lib_Navigation/>

            <header className="w-5xl mt-10">
                    <h1 className="text-xl font-bold">Browse Books</h1>
                    <p className="mt-2 text-gray-600 text-xs">
                        Browse educational resources, fiction, and non-fiction books available in the library.
                    </p>
            </header>

            <div className="w-5xl justify-center items-center flex flex-col mt-6 rounded-xl">                   
                    {isLoading ? 
                    (
                    <div className='w-full justify-center items-center flex p-4'>
                        <LoaderCircle size={20} className='animate-spin'/>
                    </div>
                    )
                    :
                    (
                    <div className='w-full grid grid-cols-4 gap-4'>
                        {books.map((book) => (
                            <Lib_BookCard 
                            key={book._id}
                            book={book}
                            handleViewBook={() => handleViewBook(book._id)}
                            showBorrowModal={() => handleBorrowModal(book._id)}
                            requestBorrow={requestBorrow}
                            />
                        ))}
                    </div>
                    )}
                    

                 
                
                

            </div>

        </section>
         </>
    )
}
export default Library_Page;
