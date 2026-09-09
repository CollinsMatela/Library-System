import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { Pen } from "lucide-react";
import AdvancedSearch from "./BookPage_Component/AdvancedSearch";
import { toast } from "react-toastify";
import Edit_BookInformation from "./BookInformation_Component/Edit_BookInformation";
import Edit_BookPage from "./BookInformation_Component/Edit_BookPage";
import Preview_BookInformation from "./BookInformation_Component/Preview_BookInformation";
import AddPage_Modal from "../modals/AddPage_Modal";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import { categories } from "../mockdata";

const Admin_Edit = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInformationUpdate, setIsInformationUpdate] = useState(false);
    const [isAddPageModal, setIsAddPageModal] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);
    
    const [books, setBooks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPageIndex, setSelectedPageIndex] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBook, setSelectedBook] = useState('');
    const [bookDetails, setBookDetails] = useState('')

    useEffect(() => {
        fetchBookById(selectedBook)
    },[selectedBook])

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

  const AISummarization = async () => {
            const texts = bookDetails.pages.map((p) => p.pageText);
  
            const bookData = {
              bookId: bookDetails._id,
              title: bookDetails.title,
              language: bookDetails.language,
              texts: texts
            }
  
            try {
              const res = await axios.post(`${import.meta.env.VITE_API_URL}/ai-summarization`, bookData)
              setMoral(res.data.summary)
              toast.success(res.data.message);
              fetchBookById();
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message);
            }
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
            fetchBookById(bookDetails._id);
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

    const fetchBookById = async (id) => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-book/${id}`);
            setBookDetails(res.data.book);
            console.log(res.data.message);
          } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
    }
    const deleteBook = async (bookId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-book/${bookId}`);
            console.log(res.data.message);
            toast.success(res.data.message);
            navigate(-1); // Navigate back to the previous page after deletion
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
              
        <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 lg:px-10">
            <div>
               <h1 className="text-sm font-bold text-stone-800">Editing Management</h1>
               <h1 className="text-stone-400 text-xs">Update the information of book.</h1>  
            </div>                
        </header>
    
        <div className="w-full px-4 lg:px-10">
    <div className="w-full bg-stone-200 border border-stone-300 rounded-lg p-6">
        
        <div className="mb-4">
            <h1 className="text-xs font-semibold text-stone-800">
                Find a Book to Edit
            </h1>
            <p className="text-xs text-stone-500">
                Select a category and choose the book you want to edit.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

            {/* Category */}
            <div className="flex flex-col gap-1.5">
                
                <select
                    value={selectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setSelectedBook("")
                    }}
                    className="w-full bg-white text-xs text-stone-700 p-2.5 rounded-lg border outline-none border-stone-300 transition"
                >
                    <option value="">Select category</option>

                    {categories.map((category, index) => (
                        <option
                            key={index}
                            value={category.value}
                        >
                            {category.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Book */}
            <div className="flex flex-col gap-1.5">
                

                <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    disabled={!selectedCategory}
                    className="w-full bg-white text-xs text-stone-700 p-2.5 rounded-lg border outline-none border-stone-300 outline-none transition disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed"
                >
                    <option value="">
                        {selectedCategory
                            ? "Select book to edit"
                            : "Select a category first"}
                    </option>

                    {books
                        .filter((book) => book.category === selectedCategory)
                        .map((book) => (
                            <option
                                key={book._id}
                                value={book._id}
                            >
                                {book.title}
                            </option>
                        ))}
                </select>
            </div>

        </div>
    </div>
</div>

    <Edit_BookInformation 
            bookDetails={bookDetails}
            setBookDetails={setBookDetails}
            fetchBookById={fetchBookById}
            Summarization={AISummarization}
            updateBookInformation={updateBookInformation}
    />
    <Edit_BookPage bookDetails={bookDetails}
               setBookDetails={setBookDetails}
               fetchBookById={fetchBookById}
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
    <div className="w-full justify-end items-center flex px-4 lg:px-10 mt-4 mb-10">
    <button className="justify-center items-center flex gap-2 bg-green-200 p-2 rounded-lg border border-green-500 text-xs text-green-500 hover:bg-green-300 cursor-pointer"
    onClick={() => {setIsInformationUpdate(true); setErrorMessage("")}}
    >
        <Pen size={15}/> Save Changes 
    </button>
    </div>

             
              
              
        </section>
        </>
      )
}
export default Admin_Edit;
