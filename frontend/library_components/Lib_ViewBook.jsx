import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lib_Navigation from "./Lib_Navigation";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Sparkles, Sparkle, Hourglass, BookOpen, Info, LoaderCircle } from "lucide-react";
import Lib_BookLayout from "./Lib_BookLayout";
import { toast } from "react-toastify";
import BorrowModal from '../modals/BorrowModal'

const Lib_ViewBook = () => {

    const { id } = useParams();
    const user = useAuthStore((state) => state.user); 
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showReadModal, setShowReadModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [bookDetails, setBookDetails] = useState(null);

    const [generatedSummary, setgeneratedSummary] = useState('');
    const [showBorrowModal, setShowBorrowModal] = useState(false);

    const [borrows, setBorrows] = useState([]);
    const isRequestExisting = borrows.find((b) => b.bookId === id && b.userId === user._id && (b.status === 'Pending' || b.status === 'Approved'))

    const informations = [
    // Classification
    { label: "Type", value: bookDetails?.type },
    { label: "Category", value: bookDetails?.category },
    { label: "Field", value: bookDetails?.field },

    // Basic Information
    { label: "Illustrator", value: bookDetails?.illustrator },
    { label: "Language", value: bookDetails?.language },
    { label: "Publisher", value: bookDetails?.publisher },
    { label: "Publication Year", value: bookDetails?.publication },
    { label: "ISBN", value: bookDetails?.isbn },

    // Textbook Information
    { label: "Subject", value: bookDetails?.subject },
    { label: "Grade Level", value: bookDetails?.gradeLevel },

    // Bibliographic Information
    { label: "Edition", value: bookDetails?.edition },
    { label: "Volume", value: bookDetails?.volume },
    { label: "DDC", value: bookDetails?.ddc },
    { label: "Call Number", value: bookDetails?.callNumber },

    // Library Information
    { label: "Copies", value: bookDetails?.copies },
    { label: "Available At", value: bookDetails?.availableAt },
    { label: "ID", value: bookDetails?._id },
];

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            try {
            await Promise.all([fetchBookById(), fetchAllBorrow()])
            } catch (error) {
                toast.error('Failed to load the page.')
            } finally {
            setIsLoading(false);
            }
        }
        loadData();
    },[])

    const fetchBookById = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-book/${id}`);
            setBookDetails(res.data.book);
            console.log(res.data.message);
          } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
          }
    } 

    const handleBorrowModal = (id) => {
          setSelectedBook(id)
          setShowBorrowModal(true);
    }

    const requestBorrow = async (bookId) => {

        const requestData = {
            userId: user._id,
            name: `${user.firstname, user.lastname}`,
            bookId: bookId,
        }

         try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/request-borrow`, requestData);
            toast.success(res.data.message);
            fetchAllBorrow();
            fetchBookById();
            setShowBorrowModal(false);

         } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
         }
    }

    const fetchAllBorrow = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrows(res.data.borrows);

         } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message)
         }
    }

    
        useEffect(() => {
        if (showReadModal || showBorrowModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    
        return () => {
            document.body.style.overflow = '';
        };
    }, [showReadModal, showBorrowModal]);
    

    return(
    <>
    {showReadModal && (<Lib_BookLayout book={bookDetails} onClose={() => setShowReadModal(false)}/>)}
    {showBorrowModal && (<BorrowModal 
    book={bookDetails} 
    onClose={() => setShowBorrowModal(false)}
    requestBorrow={requestBorrow}
    />)}
    <Lib_Navigation />
    <section className="min-h-screen w-full bg-stone-50 justify-start items-center flex flex-col pb-10">
    {isLoading ? 
    (
    <div className="justify-center items-center flex mt-20">
        <LoaderCircle size={20} className="animate-spin text-black"/>
    </div>
    )
    :
    (
       <div className="w-full bg-stone-50 lg:w-5xl justify-center items-start lg:items-start flex flex-col md:flex-row mt-20">
        {/* Book Cover Container */}
        <div className=" w-full md:w-100 flex flex-col px-4 sm:px-0 gap-2">

            <div className="w-full bg-stone-200 justify-center items-center flex">
              <img src={bookDetails?.cover} className="bg-stone-100 h-100 object-center shadow-xl" />  
            </div>
            
           
            {!isRequestExisting && bookDetails?.copies > 0 && (
               <button className="justify-center items-center flex gap-2 bg-stone-800 border hover:bg-stone-900 transition py-2 w-full cursor-pointer text-white text-xs font-bold" onClick={() => setShowBorrowModal(true)}>
                <HandHelping size={15}/>Request
               </button>
            )}
            {isRequestExisting && (
                <div className="justify-start items-center flex gap-2 bg-white border border-stone-300 p-2 w-full rounded-lg">
                
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-500">
                    <Hourglass size={12}/>
                </div>

                <div className="flex flex-col">
                   <h1 className="font-semibold text-xs">Your Request</h1>
                   <h1 className="text-xs text-stone-500">Please keep wait.
                     <span className="text-blue-600 italic text-xs cursor-pointer hover:underline" onClick={() => navigate("/library/borrow-status")}>view</span>
                   </h1>
                </div>
               
               </div>
            )}
        </div>

        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col">

            <div className="w-full justify-between items-start flex flex-col border-stone-300 border-b">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-black text-2xl md:text-4xl font-bold italic">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-sm text-stone-500">By: {bookDetails?.author || "—"}</h1>
                </div>

                <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 my-4">

                    <div className="flex gap-2 w-full">
                        <div className="justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full"><Book size={15} className="hidden sm:block"/>{bookDetails?.category}</div>
                        <div className="justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full"><BookOpenText size={15} className="hidden sm:block"/>{bookDetails?.pages.length} Pages</div>
                        <div
                        className={`justify-center items-center flex gap-2 py-2 px-3 text-xs font-bold rounded-full ${
                            bookDetails?.copies > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        >
                        <Info size={15} className="hidden sm:block"/>
                        {bookDetails?.copies > 0 ? "Available" : "Not Available"}
                        </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-fit">

                        <button className="justify-center items-center flex gap-2 bg-stone-800 w-full p-2 text-xs text-white font-bold hover:bg-stone-900 cursor-pointer"
                        onClick={() => setShowReadModal(true)}>
                            <BookOpenText size={15}/> Read
                        </button>
                    </div>
                </div>

            </div>
            
           <div className="mt-6 rounded-2xl bg-white border border-stone-300 p-6 shadow-sm w-full">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200">
                <BookOpen size={20} className="text-black" />
                </div>

                <div>
                <h2 className="text-lg font-semibold text-stone-900">
                    Description
                </h2>
                <p className="text-sm text-stone-500">
                    A brief overview of this book.
                </p>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 border border-stone-100">
                <p className="leading-8 text-stone-700 whitespace-pre-line">
                {bookDetails?.description || "No description available for this book."}
                </p>
            </div>
            </div>

            {/**AI Summary */}
            {bookDetails?.type.toLowerCase() === 'fiction' && bookDetails?.category.toLowerCase() === 'story book' && (
                <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm w-full">
                    <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
                        <Sparkles size={20} className="text-stone-800" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-stone-900">
                        AI Generated Summary
                        </h2>
                        <p className="text-sm text-stone-500">
                        Generated using AI to provide a concise overview of the story.
                        </p>
                    </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-white p-5 border border-stone-100">
                    <p className="leading-8 text-stone-700 whitespace-pre-line">
                        {bookDetails?.moral || "No summary available for this book."}
                    </p>
                    </div>
                </div>
            )}

           <div className="mt-6 rounded-2xl bg-white border border-stone-300 p-6 shadow-sm w-full">

            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200">
                <BookOpen size={20} className="text-black" />
                </div>

                <div>
                <h2 className="text-lg font-semibold text-stone-900">
                    Book Details
                </h2>
                <p className="text-sm text-stone-500">
                    Information and details about this book.
                </p>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 border border-stone-100">
                {informations
                .filter(
                    (info) =>
                    info.value !== null &&
                    info.value !== undefined &&
                    info.value !== "" &&
                    info.value !== "—"
                )
                .map((info, index) => (
                    <div
                    key={index}
                    className="w-full border-b border-stone-200 last:border-b-0 flex justify-between items-center py-3"
                    >
                    <h1 className="text-xs font-bold text-stone-500">
                        {info.label}
                    </h1>

                    <h1 className="text-sm text-stone-800 text-right">
                        {info.value}
                    </h1>
                    </div>
                ))}
            </div>

            </div>
            
            

           

           

        </div>
    </div> 
    )}
    

    </section>
    </>
    )
}
export default Lib_ViewBook;