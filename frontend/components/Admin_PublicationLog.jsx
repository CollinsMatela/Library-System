import AdminSidebar from "../components/Admin_Sidebar"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { LibraryBig, LoaderCircle, ScrollText } from "lucide-react";
const Admin_PublicationLog = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            try {
                await fetchBooks();
            } catch(error) {
                console.log(error);
                toast.error('Failed to load data');
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
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
        <>
            <AdminSidebar />
            <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Publication Log</h1>
                    <h1 className="text-stone-400 text-xs">Manage publication records</h1>                   
              </header>

              <div className="w-full justify-start items-start flex flex-col rounded-t-xl px-4 gap-2 mb-4 lg:px-10">

                        <div className="flex items-center justify-start gap-2 w-full mb-4">
                            <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                                <ScrollText size={20}/>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800 rounded-full">Publication Record</h1>
                                <p className="text-stone-400 text-xs">List of book publication dates.</p>
                            </div>
                        </div>
                        
                        <div className="w-full border border-stone-300 p-2 rounded-lg flex flex-col gap-2">
                        <div className="w-full grid grid-cols-9 p-3 bg-stone-100 rounded-t-lg gap-2">
                            <h1 className="text-stone-500 text-xs">No.</h1>
                            <h1 className="text-stone-500 text-xs">Title</h1>
                            <h1 className="text-stone-500 text-xs">Author</h1>
                            <h1 className="text-stone-500 text-xs">Category</h1>
                            <h1 className="text-stone-500 text-xs">Arrival Date</h1>
                            <h1 className="text-stone-500 text-xs">Published Date</h1>
                            <h1 className="text-stone-500 text-xs">Published By</h1>
                            <h1 className="text-stone-500 text-xs">Status</h1>
                            <h1 className="text-stone-500 text-xs">Action</h1>
                        </div>

                        <div className="w-full justify-start items-start flex">
                                {isLoading ? (
                                    <div className="flex justify-center items-center gap-2 w-full">
                                        <LoaderCircle size={20} className="animate-spin"/>
                                    </div>
                                ) : (

                                    books.length === 0 ? (
                                        <div className="justify-center items-center flex p-2 bg-stone-200">
                                            <p className="text-stone-400 text-xs">No publication records found.</p>
                                        </div>
                                    ) : (
                                        <div className="w-full justify-start items-start flex flex-col gap-2">
                                            {books.map((book, index) => (
                                                <div key={book._id} className="w-full grid grid-cols-9 border-b border-stone-300 p-3 hover:bg-blue-50 hover:border-blue-600">
                                                    <h1 className="text-xs text-stone-500">{index + 1}</h1>
                                                    <h1 className="text-xs text-stone-500">{book.title}</h1>
                                                    <h1 className="text-xs text-stone-500">{book.author}</h1>
                                                    <h1 className="text-xs text-stone-500">{book.category}</h1>
                                                    <h1 className="text-xs text-stone-500">Arrival Date</h1>
                                                    <h1 className="text-xs text-stone-500">{new Date(book.createdAt).toLocaleDateString()}</h1>
                                                    <h1 className="text-xs text-stone-500">Admin</h1>
                                                    <h1 className="text-xs text-stone-500">Published</h1>
                                                    <h1 className="text-xs text-stone-500">{book.action}</h1>
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
export default Admin_PublicationLog