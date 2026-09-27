import AdminSidebar from "./Admin_Sidebar"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import InventoryModal from "../modals/InventoryModal";
import { LibraryBig, LoaderCircle, Plus, ScrollText, Search, Trash, Eye } from "lucide-react";
import Admin_Header from "./Admin_Header";
import useAuthStore from "../store/useAuthStore";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import InventoryViewModal from "../modals/InventoryViewModal";
const Admin_Inventory = () => {
    const user = useAuthStore((state) => state.user)
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInventoryModal, setIsInventoryModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedBook, setSelectedBook] = useState(null);
    const [members, setMembers] = useState([]);
    const [showView, setShowView] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredBook, setFilteredBook] = useState([])

    const SearchBook = () => {
          const result = books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
          return setFilteredBook(result)
    }

    useEffect(() => {
       setFilteredBook(books)
    }, [books])

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            try {
                await Promise.all([fetchBooks(), FetchMembersRequest()])
            } catch(error) {
                console.log(error);
                toast.error('Failed to load data');
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    },[])
    
    const responsiblePerson = (id) => {
          const person = members.find((member) => member._id === id);
          return `${person.firstname} ${person.lastname}`;
    }
    const handleView = (book) => {
          setSelectedBook(book)
          setShowView(true)
    }

    const FetchMembersRequest = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-members`)
        setMembers(res.data.members);
        console.log(res.data.message);
      } catch (error) {
        toast.error('Failed to fetch data');
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message)
      }
    }

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
    const deleteBook = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-book/${id}`);
            console.log(res.data.message);
            toast.success(res.data.message);
            setDeleteConfirmation(false);
            fetchBooks();
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
        }
    }
    const handleDelete = (book) => {
          setSelectedBook(book)
          setDeleteConfirmation(true)
    }

    return(
        <>
        {deleteConfirmation && (
            <Confirmation_Popup
            errorMessage={errorMessage}
            message={'Are you sure to delete this book?'}
            onConfirm={() => deleteBook(selectedBook._id)}
            onCancel={() => setDeleteConfirmation(false)}
            />
        )}
        {showView && (
           <InventoryViewModal
           onClose = {() => setShowView(false)}
           book = {selectedBook}
           responsiblePerson = {() => responsiblePerson(selectedBook.addedById)}
           />
        )}
            {isInventoryModal && <InventoryModal onClose={() => setIsInventoryModal(false)} />}
            <AdminSidebar />
            <section className="bg-stone-50 min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
              <Admin_Header mainText={'Inventory Management'} subText={'Oversee the record of books'}/>

              <div className="w-full justify-start items-start flex flex-col rounded-t-xl px-4 gap-2 mb-4 lg:px-10">

                        <div className="flex flex-col sm:flex-row items-center justify-start gap-2 w-full mb-2">
                            <div className="w-full justify-start items-start flex gap-2">
                               <div className="bg-stone-800 rounded-lg p-2 text-white justify-center items-center flex">
                                <ScrollText size={20}/>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800 rounded-full">Inventory Record</h1>
                                <p className="text-stone-400 text-[10px]">Manage book inventory records</p>
                            </div> 
                            </div>

                            <div className="justify-between items-center flex border border-stone-300 rounded-lg px-2 w-full sm:w-fit">
                            
                            <input type="search"
                                   name="title"
                                   placeholder="Search book title" 
                                   className="bg-white py-2 outline-none text-[10px] w-full"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="h-full py-1 px-2 border-l border-stone-300" onClick={SearchBook}>
                              <Search size={15} className="text-stone-800 hover:text-stone-900 cursor-pointer transition"/> 
                            </div>
                            
                             </div>
                            
                        </div>
                        
                        <div className="min-h-120 w-full bg-white border border-stone-300 p-2 rounded-lg flex flex-col gap-2">
                        <div className="w-full grid grid-cols-5 sm:grid-cols-10 p-3 bg-stone-100 rounded-lg border border-stone-300 gap-2">
                            
                            <h1 className="text-stone-500 text-[10px]">Title</h1>
                            <h1 className="text-stone-500 text-[10px]">Author</h1>
                            <h1 className="text-stone-500 text-[10px]">Category</h1>
                            <h1 className="hidden sm:block text-stone-500 text-[10px]">ISBN</h1>
                            <h1 className="hidden sm:block text-stone-500 text-[10px]">When</h1>
                            <h1 className="hidden sm:block text-stone-500 text-[10px]">From</h1>
                            <h1 className="hidden sm:block text-stone-500 text-[10px]">Added By</h1>
                            <h1 className="hidden sm:block text-stone-500 text-[10px]" title="Published Date">Pub. Date</h1>
                            <h1 className="text-stone-500 text-[10px]">Status</h1>
                            <h1 className="text-stone-500 text-[10px]">Action</h1>
                        </div>

                        <div className="w-full justify-start items-start flex">
                                {isLoading ? (
                                    <div className="flex justify-center items-center gap-2 w-full">
                                        <LoaderCircle size={20} className="animate-spin"/>
                                    </div>
                                ) : (

                                    filteredBook.length === 0 ? (
                                        <div className="flex w-full flex-col items-center justify-center rounded-lg border border-stone-300 bg-stone-50 p-6 text-center">

                                            <h2 className="text-[10px] font-medium text-stone-700">
                                            No books found
                                            </h2>

                                            <p className="mt-1 text-[10px] text-stone-500">
                                            Try uploading books to be able to store to inventory.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="min-h-100 w-full justify-start items-start flex flex-col sm:overflow-x-auto">
                                            {filteredBook.map((book, index) => (
                                                <div key={book._id} className="w-full bg-stone-50 grid grid-cols-5 sm:grid-cols-10 justify-center items-center mb-2 border border-stone-300 rounded-lg p-2 hover:bg-blue-50 hover:border-blue-600">
                                                    
                                                    <h1 className="text-[10px] text-stone-500 flex wrap-break-word">{index + 1} {book.title}</h1>
                                                    <h1 className="text-[10px] text-stone-500 wrap-break-word">{book.author || "N/A"}</h1>
                                                    <h1 className="text-[10px] text-stone-500 wrap-break-word">{book.category || "N/A"}</h1>
                                                    <h1 className="hidden sm:block text-[10px] text-stone-500 wrap-break-word">{book.isbn || "N/A"}</h1>
                                                    <h1 className="hidden sm:block text-[10px] text-stone-500 wrap-break-word">{new Date(book.receivedDate).toDateString()}</h1>
                                                    <h1 className="hidden sm:block text-[10px] text-stone-500 wrap-break-word">{book.donatedFrom || "N/A"}</h1>
                                                    <h1 className="hidden sm:block text-[10px] text-stone-500 wrap-break-word">{responsiblePerson(book.addedById) || "N/A"}</h1>
                                                    <h1 className="hidden sm:block text-[10px] text-stone-500 wrap-break-word">{new Date(book.createdAt).toDateString()}</h1>
                                                    <h1
                                                    className={`text-[10px] border ${
                                                        book.copies > 0
                                                        ? "text-white bg-green-600"
                                                        : "text-white bg-red-600"
                                                    } rounded-lg p-1 text-center w-fit`}
                                                    >
                                                    {book.copies > 0 ? "Available" : "Not Available"}
                                                    </h1>

                                                    <div className="w-full justify-center items-center flex gap-1">
                                                        <button className="p-2 hover:bg-stone-200 rounded-lg transition cursor-pointer"
                                                    onClick={() => handleView(book)}>
                                                        <Eye size={15} className="text-stone-500"/>
                                                    </button>
                                                    <button className="bg-red-600 p-2 rounded-lg justify-center items-center flex gap-1 w-fit cursor-pointer hover:bg-red-700"
                                                    onClick={() => handleDelete(book)}>
                                                        <Trash size={15} className="text-white"/>
                                                    </button>
                                                    </div>
                                                    
                            
                                                    
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                            </div>
                </div>
            </section>
        </>
    )
}
export default Admin_Inventory