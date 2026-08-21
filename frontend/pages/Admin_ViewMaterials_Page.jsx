import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Edit_Question_Modal from "../modals/Edit_Question_Modal";
import AdminSidebar from '../components/Admin_Sidebar';
import Book_Edit from "./BookInformation_Component/Book_Edit";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import ConfirmationPopup from "../popup/Confirmation_Popup"

const Admin_ViewMaterials_Page = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  const navigate = useNavigate();

  const [isConfirmation, setIsConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [moral, setMoral] = useState('');

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

  const informations = [
    // Basic Information
    { label: "Type", value: bookDetails?.type },
    { label: "Category", value: bookDetails?.category },
    { label: "Illustrator", value: bookDetails?.illustrator },
    { label: "Language", value: bookDetails?.language },
    { label: "Publisher", value: bookDetails?.publisher },
    { label: "Publication Year", value: bookDetails?.publication },
    { label: "Copies", value: bookDetails?.copies },
    { label: "ISBN", value: bookDetails?.isbn },
    { label: "Edition", value: bookDetails?.edition },
    { label: "Volume", value: bookDetails?.volume },

    // Science & Technology
    { label: "Scientific Field", value: bookDetails?.scientificField },
    { label: "Mathematics Branch", value: bookDetails?.mathBranch },
    { label: "Technology Field", value: bookDetails?.technologyField },
    { label: "Engineering Discipline", value: bookDetails?.engineeringDiscipline },
    { label: "Medical Field", value: bookDetails?.medicalField },

    // Reference
    { label: "Reference Type", value: bookDetails?.referenceType },
    { label: "Subject Area", value: bookDetails?.subjectArea },
    { label: "Dictionary Type", value: bookDetails?.dictionaryType },
    { label: "Geographic Coverage", value: bookDetails?.geographicCoverage },

    // Education
    { label: "Subject", value: bookDetails?.subject },
    { label: "Grade Level", value: bookDetails?.gradeLevel },

    // Research
    { label: "Research Field", value: bookDetails?.researchField },
    { label: "Institution", value: bookDetails?.institution },
    { label: "DOI", value: bookDetails?.doi },

    // Business & Economics
    { label: "Business Area", value: bookDetails?.businessArea },
    { label: "Economics Branch", value: bookDetails?.economicsBranch },
    { label: "Status", value: bookDetails?.copies > 0 ? "Available" : "Not Available" },
    { label: "ID", value: bookDetails?._id },
    
];

    useEffect(() => {
         fetchBookById();
    },[])

    const fetchBookById = async () => {
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
    const handleDeleteConfirmation = () => {
          setIsConfirmation(true);
    }
  return(
    <>
    <AdminSidebar />
    {isConfirmation && (<ConfirmationPopup 
    errorMessage={errorMessage}
    message={'Are you sure to delete this book?'}
    onConfirm={() => deleteBook(bookDetails._id)} 
    onCancel={() => setIsConfirmation(false)}/>)}
    <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pl-70">
              
    <header className="w-full justify-between items-start flex flex-col border-b border-stone-300 p-3 px-10">
        <h1 className="text-sm font-bold text-stone-800">Book Information</h1>
        <h1 className="text-stone-400 text-xs">Manage the selected book</h1>                   
    </header>

    <div className="w-full flex gap-4 p-10">
        {/* Book Cover Container */}
        <div className="bg-white w-120 flex flex-col gap-4">
            <img src={bookDetails?.cover} className="bg-stone-100 h-100 object-cover shadow-xl mb-5" />

        </div>
        
        {/* Book Details Container */}
        <div className=" w-full justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-stone-300 border-b">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-stone-800 text-xl font-bold italic">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-xs text-stone-500">By: {bookDetails?.author || "—"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className="justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full"><Book size={15}/>{bookDetails?.category}</div>
                        <div className="justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full"><BookOpenText size={15}/>{bookDetails?.pages.length} Pages</div>
                    </div>

                    <div className="flex gap-2">
                        <button className="justify-center items-center flex gap-2 bg-red-600 py-2 px-3 text-xs text-white font-bold hover:-translate-y-1 cursor-pointer"
                        onClick={handleDeleteConfirmation}>
                            <Trash size={15}/> Remove
                        </button>
                    </div>
                </div>

            </div>

           <div className="w-full py-4 rounded-xl flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-sm text-stone-800 font-bold">Description</h1>
                <h1 className="text-stone-500 text-xs font-md">{bookDetails?.description || "No description"}</h1>
            </div>

            <div className="flex flex-col gap-2">
                <div className="justify-between items-center flex">
                  <h1 className="text-sm text-stone-800 font-bold">AI Summarization</h1>
                </div>
                
                <h1 className="text-stone-500 text-xs font-md">{bookDetails?.moral || "No summarized story yet"}</h1>
            </div>
                 
           </div>
           

           <div className="w-full flex flex-col gap-2">
            <h1 className="text-sm text-stone-800 font-bold">Book Details</h1>
            {informations.filter(info =>
                info.value !== null &&
                info.value !== undefined &&
                info.value !== "" &&
                info.value !== "—"
            ).map((info, index) => (
                <div key={index}
                className="w-full border-b border-stone-300 justify-between items-center flex py-1">
                <h1 className="text-xs text-stone-500">{info.label}</h1>
                <h1 className="text-xs">{info.value}</h1>
                </div>
            ))}

            </div>
        </div>
    </div>

    <Book_Edit bookDetails={bookDetails}
               fetchBookById={fetchBookById}
    />

    </section>
    </>
      )
}
export default Admin_ViewMaterials_Page;