import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lib_Navigation from "./Lib_Navigation";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { BookOpenText, Play, CheckCheck } from "lucide-react";
import Lib_BookLayout from "./Lib_BookLayout";

const Lib_ViewBook = () => {

    const { id } = useParams();
    const user = useAuthStore((state) => state.user); 
    const navigate = useNavigate();
    const [showReadModal, setShowReadModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
         fetchStoryById();
    },[])

    const fetchStoryById = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-book/${id}`);
            setBookDetails(res.data.book);
            console.log(res.data.message);
          } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
          }
    } 

    

    return(
    <>
    {showReadModal && (<Lib_BookLayout book={bookDetails} onClose={() => setShowReadModal(false)}/>)}
    <section className="min-h-screen w-full bg-black/80 p-4 flex flex-col">
  
    <Lib_Navigation />

    <div className="flex-1 w-full bg-white rounded-b-2xl flex p-10 gap-4">
        {/* Book Cover Container */}
        <div className="bg-white w-120 border-r-2 border-gray-300 flex flex-col p-4 gap-4">
            <img src={bookDetails?.cover} className="bg-gray-100 h-100 object-cover shadow-xl mb-5" />
            <h1 className="text-gray-800">Book Status: {" "}
                <span className={`${bookDetails?.availability ? "text-green-500" : "text-red-500"}`}>
                  {bookDetails?.availability ? "Available" : "Not Available"}
                </span>
            </h1>
            <button className="bg-pink-600 h-15 w-full rounded-md cursor-pointer hover:bg-pink-700">
                <h1 className="text-white font-bold">Borrow</h1>
            </button>
            <h1 className="text-xs text-gray-500">{id || "Book Id —"}</h1>
        </div>
        {/* Book Details Container */}
        <div className="min-h-screen w-full p-4 justify-start items-start flex flex-col gap-5">
            <div className="w-full justify-between items-start flex">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-gray-800 text-6xl font-bold italic font-family: ui-sans-serif, system-ui, sans-serif">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-sm text-gray-500">Authored by: {bookDetails?.author || "—"}</h1>
                </div>

                <div className="w-full flex justify-end items-center gap-3">

                    <button className="flex gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    onClick={() => setShowReadModal(true)}>
                        <BookOpenText/> Read Book
                    </button>

                    <button className="flex gap-2 px-6 py-3 bg-white border border-pink-600 text-pink-600 hover:bg-pink-50 font-semibold rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                        <Play/> AI Video
                    </button>

                </div>

            </div>

           <div className="bg-gray-50 h-50 w-full p-4 rounded-xl">
                 <h1 className="text-gray-500 text-md font-semibold">Description</h1>
                 <h1 className="text-gray-500 text-sm font-semibold">{bookDetails?.description || "—"}</h1>
           </div>
           

           <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Publish Date</p>
                <p className="mt-2 text-lg font-semibold text-gray-800">
                {bookDetails?.publication || "—"}
                </p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Publisher Name</p>
                <p className="mt-2 text-lg font-semibold text-gray-800">
                {bookDetails?.publisher || "—"}
                </p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Language</p>
                <p className="mt-2 text-lg font-semibold text-gray-800">
                {bookDetails?.language || "—"}
                </p>
            </div>

            </div>
            
            {/*More Details Container*/}
            <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

                <h2 className="text-lg font-semibold text-gray-800">
                    More Book Details
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    Additional information about this book.
                </p>

                {bookDetails?.type?.toLowerCase() === "childrensbook" && (
                    <div className="space-y-4">

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.type}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Grade Level</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.gradeCategory}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Reading Level</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.readingLevel}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Illustrator</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.illustrator}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Moral / Theme</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.moralTheme}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Story Type</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.storyType}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ISBN</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.isbn || "—"}
                        </span>
                    </div>

                    </div>
                )}

                {bookDetails?.type?.toLowerCase() === "storybook" && (
                    <div className="space-y-4">

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.type}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Grade Level</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.gradeCategory}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Genre</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.genre}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ISBN</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.isbn || "—"}
                        </span>
                    </div>

                    </div>
                )}

                {bookDetails?.type?.toLowerCase() === "educationalbook" && (
                    <div className="space-y-4">

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.type}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Grade Level</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.gradeCategory}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Subject</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.subject}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Edition</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.educationalEdition}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ISBN</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.isbn || "—"}
                        </span>
                    </div>

                    </div>
                )}

                {bookDetails?.type?.toLowerCase() === "referencebook" && (
                    <div className="space-y-4">

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Type</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.type}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Grade Level</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.gradeCategory}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Reference Type</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.referenceType}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Subject Area</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.subjectArea}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Reference Edition</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.referenceEdition}
                        </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-sm text-gray-500">Reference Volume</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.referenceVolume}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ISBN</span>
                        <span className="font-medium text-gray-800">
                        {bookDetails.isbn || "—"}
                        </span>
                    </div>

                    </div>
                )}

            </div>

           

           

        </div>
    </div>

    </section>
    </>
    )
}
export default Lib_ViewBook;