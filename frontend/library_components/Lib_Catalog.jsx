import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'
import { Search, Book, BookCopy, LoaderCircle, ChevronDown, ChevronUp, Info, BookSearch } from 'lucide-react'
import axios from 'axios';
import { BrushCleaning, ListFilter, MoveRight, LayoutGrid } from 'lucide-react';
import Catalog_TypeOfBooks from './CatalogPage_Component/Catalog_TypeOfBooks';
import Catalog_BookInformation from './CatalogPage_Component/Catalog_BookInformation';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'
import AdvancedSearch from "../pages/BookPage_Component/AdvancedSearch";
import { toast } from 'react-toastify';

const Lib_Catalog = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);


    const handleViewBook = (id) => {
        //   setSelectedStory(id)
          navigate(`/library/view-book/${id}`)
    }

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
   const clearAdvancedSearch = () => {
      setAdvancedSearch({
        title: "", category: "", field: "", gradeLevel: "", subject: "", author: "",
        language: "", publisher: "", isbn: "", publication: "", edition: "",
        volume: "", ddc: "", callNumber: "", copies: "", donatedFrom: "",
        receivedDate: "", illustrator: "", series: "",
      });
      setFiltered([])
    };

    const handleAdvancedSearchChange = (e) => {
      const { name, value } = e.target;
      setAdvancedSearch((currentFilters) => ({
        ...currentFilters,
        [name]: value,
      }));
    };


    useEffect(() => {
        setIsLoading(false)
        
        const loadData = async () => {
            try {
                await fetchBooks();
                
            } catch (error) {
                console.log(error)
                toast.error('Failed to load data.')
            } finally {
                setIsLoading(true)
            }
        }    
        loadData()
    },[])
    
    const fetchBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }



    return (
        <>
       <Lib_Navigation />
        <section className="min-h-screen bg-white w-full justify-center items-center flex">

                

                <div className="w-full lg:w-5xl justify-center items-center flex flex-col space-y-4 gap-2">

                    <header className="mt-20 w-full px-4 lg:px-0 justify-between items-start sm:items-end flex flex-col sm:flex-row gap-2">
                            <div className="w-fit p-2 bg-white rounded-lg justify-center items-center flex border border-stone-300 shadow-sm gap-2">
                              <div className="border border-stone-800 bg-stone-800 p-2 rounded-lg">
                                <BookSearch size={15} className="text-white"/>
                              </div>
                              <div>
                                  <h1 className="text-sm text-stone-800 font-bold">Search & Catalog</h1>
                                  <p className=" text-stone-500 text-[10px]">
                                      Fill and find your desired book
                                  </p>
                              </div>
                            </div>
                            
                            <div className="justify-between items-center flex border bg-white border-stone-300 rounded-lg px-2 w-full sm:w-fit">
                            
                            <input type="search"
                                   name="title"
                                   placeholder="Search book title" 
                                   className="bg-white w-full py-2 outline-none text-xs"
                                   value={advancedSearch.title}
                                   onChange={handleAdvancedSearchChange}
                            />
                            <div className="h-full py-1 px-2 border-l border-stone-300" onClick={FindBook}>
                              <Search size={15} className="text-stone-300 hover:text-stone-900 cursor-pointer transition"/> 
                            </div>
                            
                            </div>
                        
                        
                        

                        
                    </header>

                    <AdvancedSearch
                  filters={advancedSearch}
                  onFilterChange={handleAdvancedSearchChange}
                  onClear={clearAdvancedSearch}
                  onSubmit={(event) => event.preventDefault()}
                  FindBook={FindBook}
                />

               

                
                        

            
                <div className="w-full mb-10">
                  
                  <div className="w-full border border-stone-300 rounded-lg p-2">

                    <div className="mb-2 w-full">
                      <div className="flex items-center justify-between rounded-lg bg-stone-200 px-4 py-3">
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

                  {isLoading ?
                  (
                    <>
                   
                    {filtered.length === 0 && (
                        <div className="flex w-full flex-col items-center justify-center rounded-lg border border-stone-200 bg-stone-50 px-4 py-10 text-center">

                        <h2 className="text-xs font-medium text-stone-800">
                        No books found
                        </h2>

                        <p className="mt-1 text-xs text-stone-500">
                        Try changing or clearing your search filters.
                        </p>
                    </div>
                    )}

                    {filtered.length > 0 && (
                    filtered.map((book) => (
                      <div
                        key={book._id}
                        className="group flex flex-row items-center gap-4 p-3 mb-2 bg-white rounded-xl border border-stone-200/60 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        onClick={() => handleViewBook(book._id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleViewBook(book._id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`View book: ${book?.title || "Untitled"}`}
                      >
                        {/* Cover Thumbnail */}
                        <div className="relative w-12 h-16 sm:w-14 sm:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shrink-0 shadow-sm">
                          {book?.cover ? (
                            <img
                              src={book.cover}
                              alt={book.title}
                              className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`${book?.cover ? "hidden" : "flex"} absolute inset-0 flex items-center justify-center`}
                            style={{ display: book?.cover ? "none" : "flex" }}
                          >
                            <Book size={18} className="text-stone-400" />
                          </div>
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 min-w-0">
                          <h1 className="text-sm font-bold text-stone-800 line-clamp-1 group-hover:text-stone-900 transition-colors">
                            {book?.title || "Untitled"}
                          </h1>
                          <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                            {book?.author || "Unknown Author"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            {book?.category && (
                              <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] font-semibold rounded-md uppercase tracking-wider">
                                {book.category}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5 text-[11px] font-medium">
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  book?.copies > 0 ? "bg-stone-800" : "bg-stone-300"
                                }`}
                              />
                              <span
                                className={
                                  book?.copies > 0 ? "text-stone-700" : "text-stone-400"
                                }
                              >
                                {book?.copies > 0 ? "Available" : "Not Available"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  </>
                  )
                  :
                  (
                  <div className='w-full justify-center items-center flex'>
                    <LoaderCircle size={20} className='animate-spin'/>
                  </div>
                  )}

                  

                  
                  </div>
              </div>
              

                    </div>

                     

            

            

        </section>
         </>
    )
}

export default Lib_Catalog