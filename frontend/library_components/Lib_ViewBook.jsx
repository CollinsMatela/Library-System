import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lib_Navigation from "./Lib_Navigation";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Sparkles, Sparkle, Hourglass } from "lucide-react";
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
    <section className="min-h-screen w-full justify-start items-center flex flex-col pb-10">
  
    <Lib_Navigation />

    <header className="w-7xl justify-between items-start flex my-10">
        <div>
            <h1 className="text-3xl font-bold">Book Information</h1>
            <p className="mt-2 text-gray-600">Browse educational resources, fiction, and non-fiction books available in the library.</p>
        </div>
        <button className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full cursor-pointer" onClick={() => navigate(-1)}>
            <ArrowLeft />
        </button>
    </header>

    <div className="w-7xl flex gap-4">
        {/* Book Cover Container */}
        <div className="bg-white w-120 flex flex-col gap-4">
            <img src={bookDetails?.cover} className="bg-gray-100 object-center shadow-xl mb-5" />
            <div className="justify-between items-center flex">
                 <h1 className="text-gray-500 font-semibold text-sm">Book Status</h1>
                 <h1 className={`${bookDetails?.copies > 0 ? "text-green-500" : "text-red-500"} font-bold`}>{bookDetails?.copies > 0 ? "Available" : "Not Available"}</h1>
            </div>
           
            {!isRequestExisting && bookDetails?.copies > 0 && (
               <button className="justify-center items-center flex gap-2 bg-black py-2 w-full rounded-lg cursor-pointer text-white text-sm font-bold" onClick={() => setShowBorrowModal(true)}>
                <HandHelping size={20}/>Request Borrow
               </button>
            )}
            {isRequestExisting && (
                <div className="justify-center items-center flex gap-2 bg-yellow-100 border border-yellow-500 py-2 w-full rounded-lg text-yellow-500">
                <span className="font-semibold text-sm">Request Status: {isRequestExisting.status}</span>
                <Hourglass size={15}/>
               </div>
            )}
        </div>
        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col">

            <div className="w-full justify-between items-start flex flex-col border-gray-300 border-b-1">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-black text-4xl font-bold italic">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-sm text-gray-500">Authored by: {bookDetails?.author || "—"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full"><Book size={20}/>{bookDetails?.category}</div>
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full"><BookOpenText size={20}/>{bookDetails?.pages.length} Pages</div>
                    </div>

                    <div className="flex gap-2">

                        <button className={`${generatedSummary ? "hidden" : ""} justify-center items-center flex gap-2 bg-white py-2 px-3 text-sm text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer`}
                        onClick={() => AISummarization()}>
                            <Sparkle size={20}/> Summary
                        </button>


                        <button className="justify-center items-center flex gap-2 bg-white py-2 px-3 text-sm text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer">
                            <Sparkle size={20}/> AI Video
                        </button>

                        <button className="justify-center items-center flex gap-2 bg-black py-2 px-3 text-sm text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer"
                        onClick={() => setShowReadModal(true)}>
                            <BookOpenText size={20}/> Read
                        </button>
                    </div>
                </div>

            </div>

           {generatedSummary && (
            <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm">
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
                    {generatedSummary}
                </p>
                </div>
            </div>
            )}

           <div className="w-full py-4 rounded-xl my-6">
                 <h1 className="text-gray-500 text-sm font-md">{bookDetails?.description || "No Description"}</h1>
           </div>

           <div className="w-full flex flex-col gap-2">

           <h1 className="text-md font-semibold text-gray-800">Book Details —</h1>

            {informations.filter(info =>
                info.value !== null &&
                info.value !== undefined &&
                info.value !== "" &&
                info.value !== "—"
            ).map((info, index) => (
                <div key={index}
                className="w-full border-b-1 border-gray-300 justify-between items-center flex py-2">
                <h1 className="text-xs font-bold text-gray-500">{info.label}</h1>
                <h1 className="text-sm">{info.value}</h1>
                </div>
            ))}

            </div>
            
            

           

           

        </div>
    </div>

    </section>
    </>
    )
}
export default Lib_ViewBook;