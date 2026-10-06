import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { Pen, Search, SquarePen } from "lucide-react";
import AdvancedSearch from "./BookPage_Component/AdvancedSearch";
import { toast } from "react-toastify";
import Edit_BookInformation from "./BookInformation_Component/Edit_BookInformation";
import Edit_BookPage from "./BookInformation_Component/Edit_BookPage";
import Preview_BookInformation from "./BookInformation_Component/Preview_BookInformation";
import AddPage_Modal from "../modals/AddPage_Modal";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import { categories } from "../mockdata";
import Admin_Header from "../components/Admin_Header";

const Admin_Edit = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInformationUpdate, setIsInformationUpdate] = useState(false);
    const [isAddPageModal, setIsAddPageModal] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);
    
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSearch, setFilteredSearch] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedPageIndex, setSelectedPageIndex] = useState(null);

    const [bookDetails, setBookDetails] = useState('')

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredSearch([]);
            return;
        }
        const filtered = books.filter((book) => {
              const title = book.title.toLowerCase().includes(searchQuery.toLowerCase())
              const author = book.author.toLowerCase().includes(searchQuery.toLowerCase())
              return title || author
        })
        setFilteredSearch(filtered)
    },[searchQuery])

    useEffect(() => {
        if(!selectedBook) return
       fetchBookById(selectedBook); // will pass data on bookDeatails
    }, [selectedBook])

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

    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const uploadToCloudinary = async (file, resourceType = "image") => {
                if (!file) return "";
    
                const formData = new FormData();
    
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                    formData
                );
    
                return response.data.secure_url;
    };
  
  const [summaryLoading, setSummaryLoading] = useState(false);
  const AISummarization = async () => {
            setSummaryLoading(true)
            try {
                let texts = bookDetails.pages.map((p) => p.pageText);
                if(texts.length === 0){
                    toast.warning('No page texts found')
                    return
                }
                const bookData = {
                bookId: bookDetails._id,
                title: bookDetails.title,
                language: bookDetails.language,
                texts: texts
                }
              const res = await axios.post(`${import.meta.env.VITE_API_URL}/ai-summarization`, bookData)
              setBookDetails((bookDetails) => ({...bookDetails, moral: res.data.summary}))
              toast.success(res.data.message);
              setSummaryLoading(false)

            } catch (error) {
              console.log(error);
              toast.error(
                    error?.response?.data?.message ||
                    `Request failed with status ${error?.response?.status || "unknown"}`
                );
            } finally {
                setSummaryLoading(false)
            }
            // fetchBookById();
      }
  
  const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const image = await uploadToCloudinary(file, "image");

            setBookDetails((bookDetails) => ({
            ...bookDetails,
            pages: bookDetails.pages.map((page, index) =>
                index === selectedPageIndex
                ? { ...page, pageImage: image }
                : page
            ),
            }));

        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleAudioChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const audio = await uploadToCloudinary(file, "video");

            setBookDetails({...bookDetails, pages: bookDetails.pages.map((page, index) => {
                if (index === selectedPageIndex) {
                    return { ...page, pageAudio: audio };
                }
                return page;
            })});

            setAudioPreview(URL.createObjectURL(file));

        } catch (error) {
            console.error("Audio upload failed:", error);
        }
    };

    const updateBookInformation = async () => {

        try {
            
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-book/${bookDetails._id}`, {bookDetails});
            console.log(res.data.message);
            setErrorMessage("");
            toast.success(res.data.message);
            // fetchBookById(bookDetails._id);
            setIsInformationUpdate(false);
        } catch (error) {
            console.error("Error updating book information:", error);
            setErrorMessage(error?.response?.data?.message || "An error occurred while updating the book information.");
            toast.error(error?.response?.data?.message || "An error occurred while updating the book information.");
        }
    }

    const updatePage = async () => {
        
            const currentPage = bookDetails.pages[selectedPageIndex];

            const bookPageData = {
                bookId: bookDetails._id,
                pageId: currentPage._id,
                pageText: currentPage.pageText,
                pageImage: currentPage.pageImage,
                pageAudio: currentPage.pageAudio
            };

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-page`, bookPageData);
            console.log("Page updated successfully:", res.data.message);
            toast.success(res.data.message);
            setErrorMessage("");
            fetchBookById(bookDetails._id);
            setIsBookPageUpdate(false);
            
          } catch (error) {
            console.error("Error updating page:", error);
            setErrorMessage(error?.response?.data?.message || "An error occurred while updating the page.");
            toast.error(error?.response?.data?.message || "An error occurred while updating the page.");
          }
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

    const fetchBookById = async (selectedBook) => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-book/${selectedBook._id}`);
            setBookDetails(res.data.book);
            console.log(res.data.message);
          } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
    }
    

      return(
        <>
        <Admin_Sidebar/>

        {isConfirmation && (<Confirmation_Popup 
        errorMessage={errorMessage}
        message={'Are you sure to delete this book?'}
        onConfirm={() => deleteBook(bookDetails._id)} 
        onCancel={() => setIsConfirmation(false)}/>)}

        {isInformationUpdate && (
        <Confirmation_Popup
        errorMessage={errorMessage}
        message={'Are you sure to update the book information?'}
        onConfirm={updateBookInformation}
        onCancel={() => setIsInformationUpdate(false)}
        />)}

        {isAddPageModal && (
        <AddPage_Modal
        onClose={() => setIsAddPageModal(false)}
        bookDetails={bookDetails}
        setBookDetails={setBookDetails}
        />
        )}

        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
              
        <Admin_Header mainText={'Editing Management'} subText={'Update the information of book'}/>
    
        <div className="w-full justify-between items-center flex flex-col sm:flex-row px-4 lg:px-10">

            <div className="flex items-center justify-start gap-2 w-full mb-4">
                            <div className="w-full justify-start items-start flex gap-2">
                               <div className="bg-stone-800 rounded-lg p-2 text-white justify-center items-center flex">
                                <SquarePen size={20}/>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800 rounded-full">Choose Book</h1>
                                <p className="text-stone-400 text-[10px]">Manage to edit your selectede book</p>
                            </div> 
                            </div>
                            
            </div>

            <div className="relative w-full sm:w-100 bg-white border border-stone-200 rounded-xl flex justify-start items-center p-2 gap-2">

                    <Search size={15} className="text-stone-500" />

                    <input
                        type="search"
                        placeholder="Search title or author"
                        className="w-full outline-none text-xs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {filteredSearch.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-50">

                            {filteredSearch.slice(0,5).map((book) => (
                                <div
                                    key={book._id}
                                    onClick={() => {setSelectedBook(book); setSearchQuery('')}}
                                    className="p-3 border-b border-stone-100 last:border-none hover:bg-stone-50 cursor-pointer"
                                >
                                    {/* Title & Author */}
                                    <div className="mb-2">
                                        <h1 className="text-xs font-semibold text-stone-800">
                                            {book.title}
                                        </h1>

                                        <p className="text-[10px] text-stone-500">
                                            {book.author}
                                        </p>
                                    </div>

                                    {/* Book Details */}
                                    <div className="flex flex-wrap gap-2">
                                        {book.category && (<span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                                            {book.category}
                                        </span>)}

                                        {book.field && (<span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                                            {book.field}
                                        </span>)}

                                        {book.edition && (<span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                                            Edition: {book.edition}
                                        </span>)}

                                        {book.edition && (<span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded-md">
                                            Volume: {book.volume}
                                        </span>)}
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </div>

        
        </div>

    <div className="relative w-full">
        {!bookDetails && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex flex-col justify-start items-center text-center">
                    <div className="flex flex-col items-center gap-2 mt-40">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center">
                            <Search size={18} className="text-stone-500" />
                        </div>

                        <h1 className="text-sm font-semibold text-stone-800">
                            No book selected
                        </h1>

                        <p className="text-xs text-stone-500 max-w-55">
                            Search and select a book to start editing its details.
                        </p>
                    </div>
                </div>
            )}
       <Edit_BookInformation 
            bookDetails={bookDetails}
            setBookDetails={setBookDetails}
            // fetchBookById={fetchBookById}
            Summarization={AISummarization}
            summaryLoading={summaryLoading}
            updateBookInformation={updateBookInformation}
    />
    <Edit_BookPage bookDetails={bookDetails}
               setBookDetails={setBookDetails}
            //    fetchBookById={fetchBookById}
               handleImageChange={handleImageChange}
               handleAudioChange={handleAudioChange}
               updatePage={updatePage}
               showPageUpdateConfirmation={() => {setIsBookPageUpdate(true); setErrorMessage("")}}
               selectedPageIndex={selectedPageIndex}
               setSelectedPageIndex={setSelectedPageIndex}
               isAddPageModal={() => setIsAddPageModal(true)}
    />
    {bookDetails && (<Preview_BookInformation
               bookDetails={bookDetails}
               setBookDetails={setBookDetails}
    />)}
    
    

    {/* // Save Button */}
    <div className="w-full justify-end items-center flex px-4 lg:px-10 mb-10">
    <button className="justify-center items-center flex gap-2 bg-stone-800 p-2 rounded-lg text-[10px] text-white hover:bg-stone-900 cursor-pointer"
    onClick={() => {setIsInformationUpdate(true); setErrorMessage("")}}
    >
        <Pen size={15}/> Save Changes 
    </button>
    </div>     
    </div>
    

             
              
              
        </section>
        </>
      )
}
export default Admin_Edit;
