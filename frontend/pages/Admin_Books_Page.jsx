import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { MoveRight, Search, LibraryBig, Book } from "lucide-react";

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

    const handleViewStories = (id) => {
          if(!id) return;
          navigate(`/admin/book-information/${id}`);
    }

      return(
        <>
        <Admin_Sidebar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col py-10 pl-80 pr-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10">

                <div>
                    <h1 className="text-lg font-bold text-gray-800">Library Books Management</h1>
                    <h1 className="text-gray-400 text-xs">View all uploaded books available</h1>
                </div>
                
              </header>

              <div className="w-full justify-between items-start flex rounded-t-xl">
                        <div className="flex items-center justify-start gap-2 w-full mb-4">
                            <div className="bg-black p-2 text-white rounded-xl justify-center items-center flex">
                                <LibraryBig size={20}/>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-gray-800 rounded-full">Uploaded Books</h1>
                                <p className="text-gray-400 text-xs">List of all uploaded Books.</p>
                            </div>
                        </div>
                        

                        <div className="justify-between items-center flex border-1 border-gray-300 rounded-lg px-4">
                            
                            <input type="search" 
                                   placeholder="Search by name" 
                                   className="bg-white py-2 outline-none text-xs"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search size={15} className="text-gray-500"/>
                             
                        </div>
              </div> 
              

              <div className="bg-white w-full h-100 overflow-y-auto">
                  {filteredBooks.length === 0 && (
                    <div className="bg-gray-100 w-full rounded-2xl justify-center items-center flex p-4">
                      <h1 className="text-xs text-gray-500">No books uploaded</h1>
                    </div>
                  )}

                  {filteredBooks.length > 0 && (
                    filteredBooks.map((book) => (
                      <div key={book._id} className="bg-white hover:bg-gray-200 h-30 w-full justify-between items-center flex transition cursor-pointer mb-2 gap-2"
                      onClick={() => handleViewStories(book._id)}
                      >
                      
                      <div className="h-full flex w-full">
                          <img src={book?.cover} className="object-cover w-25 p-2" />

                          <div className="h-full flex flex-col w-full p-2">
                            <div className="w-full flex gap-2 justify-center items-center">
                              <div className="bg-gray-200 shadow-sm p-2 rounded-full">
                                <Book size={15}/>
                              </div>
                              

                              <div className="w-full">
                                <div className="flex justify-between items-center w-full">
                                  <h1 className="text-gray-800 font-semibold text-sm">{book?.title} <span className="text-gray-400 text-xs"> • {book?.category}</span></h1>
                                  <h1 className={`${book?.copies> 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"} text-xs p-1 rounded-full`}>{book?.copies> 0 ? "Available" : "Not Available"}</h1>
                                </div>
                                  <h1 className="text-gray-400 text-xs mb-2">{book?.author}</h1>
                              </div>
                              
                            </div>
                              
                              
                              
                              <h1 className="text-gray-400 text-xs">{book?.description.length > 100 ? `${book?.description.slice(0, 200)}...` : book?.description}</h1>
                              
                          </div>
                      </div>

                      {/* <div className="h-full flex items-center justify-center mr-2 p-4">
                          <h1 className="text-black"><MoveRight size={15}/></h1>
                      </div> */}
                      


                    </div>
                    ))
                  )}
              </div>
        </section>
        </>
      )
}
export default Admin_Books_Page;