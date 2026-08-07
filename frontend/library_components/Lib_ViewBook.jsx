import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lib_Navigation from "./Lib_Navigation";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Sparkles, Sparkle, Hourglass, BookOpen, Info } from "lucide-react";
import Lib_BookLayout from "./Lib_BookLayout";
import { toast } from "react-toastify";
import BorrowModal from '../modals/BorrowModal'

const Lib_ViewBook = () => {

    const { id } = useParams();
    const user = useAuthStore((state) => state.user); 
    const navigate = useNavigate();
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
         fetchBookById();
         fetchAllBorrow();
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

    
    const AISummarization = async () => {

          const texts = bookDetails.pages.map((p) => p.pageText);

          const bookData = {
            title: bookDetails.title,
            texts: texts
          }
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/ai-summarization`, bookData)
            setgeneratedSummary(res.data.summary);
            toast.success(res.data.message);
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
    }

    

    return(
    <>
    {showReadModal && (<Lib_BookLayout book={bookDetails} onClose={() => setShowReadModal(false)}/>)}
    {showBorrowModal && (<BorrowModal 
    book={bookDetails} 
    onClose={() => setShowBorrowModal(false)}
    requestBorrow={requestBorrow}
    />)}
    <section className="min-h-screen w-full bg-stone-50 justify-start items-center flex flex-col pb-10">
  
    <Lib_Navigation />

    <div className="w-5xl flex gap-4 mt-20">
        {/* Book Cover Container */}
        <div className="bg-gray-50 w-120 flex flex-col">
            <img src={bookDetails?.cover} className="bg-gray-100 h-100 object-center shadow-xl mb-5" />
           
            {!isRequestExisting && bookDetails?.copies > 0 && (
               <button className="justify-center items-center flex gap-2 bg-black py-2 w-full rounded-lg cursor-pointer text-white text-xs font-bold" onClick={() => setShowBorrowModal(true)}>
                <HandHelping size={15}/>Request Borrow
               </button>
            )}
            {isRequestExisting && (
                <div className="justify-start items-center flex gap-2 bg-white border border-gray-300 p-2 w-full rounded-lg">
                
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-500">
                    <Hourglass size={12}/>
                </div>

                <div className="flex flex-col">
                   <h1 className="font-semibold text-xs">Your Request</h1>
                   <h1 className="text-xs text-gray-500">Please keep wait.
                     <span className="text-blue-600 italic text-xs cursor-pointer hover:underline" onClick={() => navigate("/library/borrow-status")}>view</span>
                   </h1>
                </div>
               
               </div>
            )}
        </div>

        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col">

            <div className="w-full justify-between items-start flex flex-col border-gray-300 border-b">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-black text-4xl font-bold italic">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-sm text-gray-500">By: {bookDetails?.author || "—"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-xs font-bold rounded-full"><Book size={15}/>{bookDetails?.category}</div>
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-xs font-bold rounded-full"><BookOpenText size={15}/>{bookDetails?.pages.length} Pages</div>
                        <div
                        className={`justify-center items-center flex gap-2 py-2 px-3 text-xs font-bold rounded-full ${
                            bookDetails?.copies > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        >
                        <Info size={15} />
                        {bookDetails?.copies > 0 ? "Available" : "Not Available"}
                        </div>
                    </div>

                    <div className="flex gap-2">

                        <button className="justify-center items-center flex gap-2 bg-black py-2 px-3 text-xs text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer"
                        onClick={() => setShowReadModal(true)}>
                            <BookOpenText size={15}/> Read
                        </button>
                    </div>
                </div>

            </div>
            
           <div className="mt-6 rounded-2xl bg-white border border-gray-300 p-6 shadow-sm w-full">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <BookOpen size={20} className="text-black" />
                </div>

                <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Description
                </h2>
                <p className="text-sm text-gray-500">
                    A brief overview of this book.
                </p>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 border border-gray-100">
                <p className="leading-8 text-gray-700 whitespace-pre-line">
                {bookDetails?.description || "No description available for this book."}
                </p>
            </div>
            </div>

            {/**AI Summary */}
            {bookDetails?.type.toLowerCase() === 'fiction' && bookDetails?.category.toLowerCase() === 'story book' && (
                <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm w-full">
                    <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
                        <Sparkles size={20} className="text-violet-600" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                        AI Generated Summary
                        </h2>
                        <p className="text-sm text-gray-500">
                        Generated using AI to provide a concise overview of the story.
                        </p>
                    </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-white p-5 border border-gray-100">
                    <p className="leading-8 text-gray-700 whitespace-pre-line">
                        {bookDetails?.summary || "No summary available for this book."}
                    </p>
                    </div>
                </div>
            )}

           <div className="mt-6 rounded-2xl bg-white border border-gray-300 p-6 shadow-sm w-full">

            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <BookOpen size={20} className="text-black" />
                </div>

                <div>
                <h2 className="text-lg font-semibold text-gray-900">
                    Book Details
                </h2>
                <p className="text-sm text-gray-500">
                    Information and details about this book.
                </p>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 border border-gray-100">
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
                    className="w-full border-b border-gray-200 last:border-b-0 flex justify-between items-center py-3"
                    >
                    <h1 className="text-xs font-bold text-gray-500">
                        {info.label}
                    </h1>

                    <h1 className="text-sm text-gray-800 text-right">
                        {info.value}
                    </h1>
                    </div>
                ))}
            </div>

            </div>
            
            

           

           

        </div>
    </div>

    </section>
    </>
    )
}
export default Lib_ViewBook;