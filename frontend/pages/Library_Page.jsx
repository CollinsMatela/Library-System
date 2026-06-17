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
import defaultProfile from '../src/assets/Student.jpg'
import LoadingScreen from '../loadings/loading'
import { useNavigate } from 'react-router-dom'

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const [storyBook, setStoryBook] = useState([]);
    const [referenceBook, setReferenceBook] = useState([]);
    const [educationalBook, setEducationalBook] = useState([]);
    const [childrensBook, setChildrensBook] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState("Overview");
    
    const [search, setSearch] = useState("");
    const searchingResult = storyBook.filter((books) => books.title.toLowerCase().includes(search.toLowerCase()));

    const showStories = (genre) => {
    setSelectedGenre(genre);
    };

    const [showViewStory, setShowViewStory] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const handleViewStory = (storyId) => {
          setSelectedStory(storyId)
          navigate(`/library/view-story/${storyId}`)
    }

    useEffect(() => {
           fetchStoryBooks();
           fetchReferenceBooks();
           fetchEducationalBooks();
           fetchChildrensBooks();
        },[])
    
    const fetchStoryBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-storybooks`);
            setStoryBook(res.data.books);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchReferenceBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-referencebooks`);
            setReferenceBook(res.data.referenceBooks);
            console.log("No. of Reference books: ",res.data.referenceBooks.length);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchEducationalBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-educationalbooks`);
            setEducationalBook(res.data.educationalBooks);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchChildrensBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-childrensbooks`);
            setChildrensBook(res.data.childrensBooks);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }


    // useEffect(() => {
    //     fetchStories();
    // },[])

    // const fetchStories = async () =>{
    //       setLoading(true);
    //       try {
    //         const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
    //             setBooks(res.data.books);
    //             console.log(res.data.message);
    //       } catch (error) {
    //         console.log(error)
    //       } finally {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000);
    // }
    // }

    // const handleProfile = () => {
    //       navigate('/library/profile');
    // }

    
    return(
        <section className="min-h-screen w-full bg-black/80 p-4">
            <div className="bg-white min-h-screen shadow-2xl w-full just-center items-center flex flex-col rounded-2xl pb-4">
                {loading && (<LoadingScreen/>)}
                <Lib_Navigation/>
                
                
                <div className="max-5xl w-full justify-center items-start flex gap-2 mt-20">
                <div className="w-full max-w-5xl flex flex-col justify-center items-start mb-10">
                    <h1 className="text-2xl text-gray-800 font-bold text-center">
                        Are you ready? {" "}
                        <span className="text-pink-500 underline">{user?.gradeLevel || "Dev"}!</span>
                    </h1>
                    <h1 className="text-6xl text-gray-800 font-bold text-center">What story will you explore today?</h1>
                </div>
                

                </div>
                

                 <div className="h-20 max-w-5xl w-full bg-white border-2 border-b-4 justify-center items-center flex shadow-sm rounded-4xl outline-none p-2">
                        <div className="h-full w-20"><img src={SearchIcon} className='h-full w-full object-cover bg-black rounded-l-3xl rounded-r-md' /></div>
                        <input type="text" 
                               className="h-full w-full outline-none px-4 text-lg text-black font-bold inner-shadow-lg" 
                               placeholder={`Search stories and explore...`}
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                        />
                 </div>
                 <div className={`${!search ? "hidden" : null} bg-white max-h-50 w-5xl border-b-1 border-gray-300 my-2 overflow-y-auto py-4`}>
                      <h1 className='text-gray-800 font-bold mb-2'>Search Result</h1>
                      {searchingResult.map((story, index) => (
                        <div key={story._id} className='h-20 w-full bg-white rounded-4xl mb-2 justify-start items-center flex gap-4 px-5 cursor-pointer border-1 border-gray-200 hover:bg-blue-100 hover:border-blue-500 group'
                             onClick={() => handleViewStory(story.id)}
                        >
                             <h1 className='bg-gray-100 h-12 w-12 justify-center items-center flex rounded-full group-hover:bg-blue-200 group-hover:text-blue-500'>{index + 1}.</h1>
                             <h1 className='text-gray-800 font-bold'>{story.title.toUpperCase()}</h1>
                        </div>
                      ))}      
                 </div>

                 <Lib_Story_Buttons showStories={showStories}/>
 
                <div className='w-full'>
                    {user.gradeLevel.toLowerCase() === 'kindergarten' && (
                        <Lib_KindergartenBooks 
                        storyBook={storyBook}
                        childrensBook={childrensBook}
                        />
                    )}
                    {user.gradeLevel.toLowerCase() === 'grade 1' && (
                        <Lib_FirstGradeBooks
                        storyBook={storyBook}
                        referenceBook={referenceBook}
                        educationalBook={educationalBook}
                        childrensBook={childrensBook}
                        />
                    )}
                    {user.gradeLevel.toLowerCase() === 'grade 2' && (
                        <Lib_SecondGradeBooks
                        storyBook={storyBook}
                        referenceBook={referenceBook}
                        educationalBook={educationalBook}
                        childrensBook={childrensBook}
                        />
                    )}
                    {user.gradeLevel.toLowerCase() === 'grade 3' && (
                        <Lib_ThirdGradeBooks 
                        storyBook={storyBook}
                        referenceBook={referenceBook}
                        educationalBook={educationalBook}
                        childrensBook={childrensBook}
                        />
                    )}
                    {user.gradeLevel.toLowerCase() === 'grade 4' && (
                        <Lib_FourthGradeBooks 
                        storyBook={storyBook}
                        referenceBook={referenceBook}
                        educationalBook={educationalBook}
                        childrensBook={childrensBook}
                        />
                    )}
                </div>
                
                

            </div>

        </section>
    )
}
export default Library_Page;
