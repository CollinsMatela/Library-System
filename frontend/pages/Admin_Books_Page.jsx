import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { MoveRight, Search, LibraryBig, Book, LoaderCircle } from "lucide-react";

const Admin_Books_Page = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    const filteredBooks = books.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
      setIsLoading(true)
       const loadData = async () => {
             try {
               await fetchBooks();
             } catch (error) {
              console.log(error);
              TableRowsSplit.error('Failed to load data');
             } finally {
              setIsLoading(false)
             }
       }
       loadData();
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
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 lg:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Books Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage uploaded books from library</h1>                   
              </header>

              <div className="w-full justify-between items-start flex flex-col md:flex-row rounded-t-xl px-4 gap-2 mb-4 lg:px-10">
                        <div className="flex items-center justify-start gap-2 w-full">
                            <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                                <LibraryBig size={20}/>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800 rounded-full">Uploaded Books</h1>
                                <p className="text-stone-400 text-xs">List of all uploaded Books.</p>
                            </div>
                        </div>
                        

                        <div className="justify-between items-center flex border border-stone-300 rounded-lg px-4 w-full md:w-100">
                            
                            <input type="search" 
                                   placeholder="Search book title" 
                                   className="bg-white py-2 outline-none text-xs"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search size={15} className="text-stone-500"/>
                             
                        </div>
              </div> 
              
              {isLoading ? 
              (
              <div className="w-full justify-center items-center flex p-4">
                 <LoaderCircle size={20} className="text-stone-500 animate-spin"/>
              </div>
              )
              :
              (
                <div className="w-full px-4 lg:px-10">
                  {filteredBooks.length === 0 && (
                    <div className="bg-stone-100 w-full rounded-2xl justify-center items-center flex p-4">
                      <h1 className="text-xs text-stone-500">No books uploaded</h1>
                    </div>
                  )}

                  {filteredBooks.length > 0 && (
                    filteredBooks.map((book) => (
                      <div key={book._id} className="bg-white hover:bg-stone-200 h-30 w-full justify-between items-center flex transition cursor-pointer mb-2 gap-2"
                      onClick={() => handleViewStories(book._id)}
                      >
                      
                      <div className="h-full flex w-full">
                          <img src={book?.cover} className="hidden sm:block object-cover w-25" />

                          <div className="h-full flex flex-col w-full p-2">
                            <div className="w-full flex gap-2 justify-center items-center mb-2">
                              <div className="hidden md:block bg-stone-200 shadow-sm p-2 rounded-full">
                                <Book size={15} className="text-stone-500"/>
                              </div>
                              

                              <div className="w-full">
                                <div className="flex flex-col md:flex-row justify-between items-start w-full">

                                  <div className="justify-center items-center flex gap-2">
                                  <h1 className="text-stone-800 font-semibold text-sm">{book?.title}</h1>
                                  <h1 className="text-stone-400 text-xs">By {book?.author}</h1>
                                  </div>

                                  <div className="justify-center items-center flex gap-2">
                                  <h1 className="text-stone-500 text-xs font-normal p-1 bg-stone-200 rounded-full"> {book?.category}</h1>
                                  <h1 className={`${book?.copies> 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"} text-xs p-1 rounded-full`}>{book?.copies> 0 ? "Available" : "Not Available"}</h1>
                                  </div>
                                  
                                </div>
                                  
                              </div>
                              
                            </div>
                              
                              
                              
                              <h1 className="text-stone-400 text-xs overflow-auto">{book?.description.length > 100 ? `${book?.description.slice(0, 200)}...` : book?.description}</h1>
                              
                          </div>
                      </div>
                    </div>
                    ))
                  )}
              </div>
              )}
              
        </section>
        </>
      )
}
export default Admin_Books_Page;