import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { MoveRight, Search } from "lucide-react";

const Admin_Books_Page = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    const filteredBooks = books.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
       fetchBooks();
    }, [])

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

    const handleViewStories = (storyId) => {
          if(!storyId) return;
          navigate(`/admin/materials/${storyId}`);
    }

      return(
        <>
        <Admin_Sidebar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col py-10 pl-90 pr-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Library Books Management</h1>
                    <h1 className="text-gray-400 text-md">View all uploaded books available</h1>
                </div>
                
              </header>

              <div className="h-20 w-full justify-between items-center flex rounded-t-xl">
                        <div>
                          <h1 className="text-lg font-bold text-gray-500 rounded-full">Uploaded Books Table</h1>
                          <p className="text-gray-400 text-sm">Manage books material.</p>
                        </div>
                        

                        <div className="space-x-2 justify-center ittems-center flex">
                          
                            <input type="search" 
                            
                                   placeholder="Search by title..." 
                                   className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
              </div> 
              

              <div className="bg-white w-full grid grid-cols-1">
                  {filteredBooks.length === 0 && (
                    <div className="bg-gray-100 h-20 w-full rounded-2xl justify-center items-center flex mt-4">
                      <h1>No books uploaded</h1>
                    </div>
                  )}
                  {filteredBooks.length > 0 && (
                    filteredBooks.map((book) => (
                      <div key={book._id} className="bg-white hover:bg-gray-100 h-30 w-full justify-between items-center flex transistion-all duration-300 ease-in-out cursor-pointer mb-2 gap-2"
                      onClick={() => handleViewStories(book._id)}
                      >
                      
                      <div className="h-full flex gap-2">
                          <img src={book?.cover} className="object-cover h-full w-25" />
                          <div className="h-full flex flex-col">
                              <h1 className="text-black text-lg">{book?.title}</h1>
                              <h1 className="text-gray-500 text-xs">Author: {book?.author}</h1>
                              <h1 className="text-gray-500 text-xs">Publish Year: {book?.publication}</h1>
                          </div>
                      </div>

                      <div className="h-full flex items-center justify-center mr-2 p-4">
                          <h1 className="text-gray-300 font-bold cursor-pointer"><MoveRight/></h1>
                      </div>
                      


                    </div>
                    ))
                  )}
              </div>
        </section>
        </>
      )
}
export default Admin_Books_Page;