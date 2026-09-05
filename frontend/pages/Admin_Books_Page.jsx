import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { MoveRight, Search, LibraryBig, Book, LoaderCircle, ChevronDown, ChevronUp } from "lucide-react";
import AdvancedSearch from "./BookPage_Component/AdvancedSearch";
import { toast } from "react-toastify";

const Admin_Books_Page = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);
    const [advancedSearch, setAdvancedSearch] = useState({
      title: "",
      category: "",
      field: "",
      gradeLevel: "",
      subject: "",
      author: "",
      language: "",
      publisher: "",
      isbn: "",
      publication: "",
      edition: "",
      volume: "",
      ddc: "",
      callNumber: "",
      copies: "",
      donatedFrom: "",
      receivedDate: "",
      illustrator: "",
      series: "",
    });

 const FindBook = () => {

       const result = books.filter((book) => {
        return Object.entries(advancedSearch).every(([key, value]) => {
            if (!value) return true;

            return book[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
        });
      });

      return setFiltered(result);
 }
  

    useEffect(() => {
      setIsLoading(true)
       const loadData = async () => {
             try {
               await fetchBooks();
             } catch (error) {
              console.log(error);
              toast.error('Failed to load data');
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

    const handleAdvancedSearchChange = (e) => {
      const { name, value } = e.target;
      setAdvancedSearch((currentFilters) => ({
        ...currentFilters,
        [name]: value,
      }));
    };

    const clearAdvancedSearch = () => {
      setAdvancedSearch({
        title: "", category: "", field: "", gradeLevel: "", subject: "", author: "",
        language: "", publisher: "", isbn: "", publication: "", edition: "",
        volume: "", ddc: "", callNumber: "", copies: "", donatedFrom: "",
        receivedDate: "", illustrator: "", series: "",
      });
      setFiltered([])
    };

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
                        

                        <div className="justify-between items-center flex border border-stone-300 rounded-lg px-2 w-full md:w-fit">
                            
                            <input type="search"
                                   name="title"
                                   placeholder="Search book title" 
                                   className="bg-white py-2 outline-none text-xs"
                                   value={advancedSearch.title}
                                   onChange={handleAdvancedSearchChange}
                            />
                            <div className="h-full py-1 px-2 border-l border-stone-300" onClick={FindBook}>
                              <Search size={15} className="text-stone-300 hover:text-stone-900 cursor-pointer transition"/> 
                            </div>
                            
                        </div>
                        <div className="justify-center items-center flex gap-1 bg-stone-100 border border-stone-300 rounded-lg p-2 w-fit cursor-pointer" onClick={() => setIsAdvanceSearch(isAdvanceSearch => !isAdvanceSearch)}>
                          <h1 className="text-xs text-stone-500">Adv</h1>
                            {isAdvanceSearch ? 
                            (<ChevronDown size={15} className="text-stone-500"/>)
                            :
                            (<ChevronUp size={15} className="text-stone-500"/>)
                            }
                        </div>
              </div>
                           
              {isAdvanceSearch && 
              (
                <AdvancedSearch
                  filters={advancedSearch}
                  onFilterChange={handleAdvancedSearchChange}
                  onClear={clearAdvancedSearch}
                  onSubmit={(event) => event.preventDefault()}
                  FindBook={FindBook}
                />
              )}
              
              {isLoading ? 
              (
              <div className="w-full justify-center items-center flex p-4">
                 <LoaderCircle size={20} className="text-stone-500 animate-spin"/>
              </div>
              )
              :
              (
                <div className="w-full px-4 lg:px-10 mb-10">
                  
                  <div className="w-full p-2 border border-stone-200 rounded-lg">

                    <div className="mb-2 w-full">
                      <div className="flex items-center justify-between rounded-t-lg bg-stone-100 px-4 py-3">
                        <div>
                          <h2 className="text-xs font-medium text-stone-700">Search results</h2>
                          <p className="mt-1 text-xs text-stone-500">
                            Showing books that match your selected filters.
                          </p>
                        </div>

                        <span className="px-3 py-1 text-xs font-medium text-stone-500">
                          {filtered.length} {filtered.length === 1 ? "book" : "books"} found
                        </span>
                      </div>
                    </div>
                  {filtered.length === 0 && (
                    <div className="flex w-full flex-col items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-4 py-10 text-center">

                    <h2 className="text-sm font-medium text-stone-500">
                      No books found
                    </h2>

                    <p className="mt-1 text-xs text-stone-500">
                      Try changing or clearing your search filters.
                    </p>
                  </div>
                  )}

                  {filtered.length > 0 && (
                    filtered.map((book) => (
                      <div key={book._id} className="bg-stone-50 p-2 hover:bg-stone-100 h-fit w-full rounded-lg border border-stone-300 justify-between items-center flex flex-col transition cursor-pointer mb-1 gap-2"
                      onClick={() => handleViewStories(book._id)}
                      >
                            <div className="w-full flex gap-2 justify-center items-center mb-2">
                              <div className="hidden md:block bg-stone-200 shadow-sm p-2 rounded-full">
                                <Book size={15} className="text-stone-500"/>
                              </div>
                              

                              <div className="w-full">
                                <div className="flex flex-col md:flex-row justify-between items-start w-full">

                                  <div className="justify-center items-center flex gap-1">
                                  <h1 className="text-stone-800 font-semibold text-xs">{book?.title}</h1>
                                  <h1 className="text-stone-400 text-xs">By {book?.author}</h1>
                                  </div>

                                  <div className="justify-center items-center flex gap-1">
                                  <h1 className="text-stone-500 text-xs font-normal p-1 bg-stone-200 rounded-lg border"> {book?.category}</h1>
                                  <h1 className={`${book?.copies> 0 ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"} border text-xs p-1 rounded-lg`}>{book?.copies> 0 ? "Available" : "Not Available"}</h1>
                                  </div>
                                  
                                </div>
                                  
                              </div>
                              
                            </div>

                            <div className="w-full">
                              <h1 className="text-xs text-stone-500">Description:</h1>
                              <h1 className="text-stone-500 text-xs overflow-auto">{book?.description.length > 100 ? `${book?.description.slice(0, 200)}...` : book?.description}</h1>
                            </div>
                            
                    </div>
                    ))
                  )}
                  </div>
              </div>
              )}
              
        </section>
        </>
      )
}
export default Admin_Books_Page;
