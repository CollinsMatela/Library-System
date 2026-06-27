import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'

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

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    const showStories = (genre) => {
    setSelectedGenre(genre);
    };

    const [showViewStory, setShowViewStory] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

    const handleViewBook = (id) => {
          setSelectedStory(id)
          navigate(`/library/view-book/${id}`)
    }

    useEffect(() => {
           fetchBooks();
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
            }
    }
    

    return(
        <section className="min-h-screen w-full bg-black/80 p-4">
            <div className="bg-white min-h-screen shadow-2xl w-full just-center items-center flex flex-col rounded-2xl pb-4">
                {loading && (<LoadingScreen/>)}
                <Lib_Navigation/>
                
                
                <div className='w-full min-h-screen grid grid-cols-4 p-10 gap-4'>
                    {books.map((book) => (
                        <Lib_BookCard 
                        key={book._id}
                        title={book.title}
                        author={book.author}
                        cover={book.cover}
                        handleViewBook={() => handleViewBook(book._id)}
                        />
                    ))}
                </div>
                
                

            </div>

        </section>
    )
}
export default Library_Page;
