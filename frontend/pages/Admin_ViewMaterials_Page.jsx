import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Edit_Question_Modal from "../modals/Edit_Question_Modal";
import AdminSidebar from '../components/Admin_Sidebar';
import Book_Edit from "./BookInformation_Component/Book_Edit";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash } from "lucide-react";

const Admin_ViewMaterials_Page = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  const navigate = useNavigate();

  const informations = [
    // Basic Information
    { label: "Language", value: bookDetails?.language },
    { label: "Publisher", value: bookDetails?.publisher },
    { label: "Publication Year", value: bookDetails?.publication },
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
          }
    } 

  return(
    <>
    <AdminSidebar />
    <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pl-90 pr-10 py-10 gap-10">
    
    <div className="w-full justify-between items-start flex">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Book Information</h2>
               <p className="text-gray-400 text-md">Manage student accounts, monitor learning progress, and keep track of student information and activities.</p>
            </div>
            <button className="bg-gray-200 py-2 px-4 rounded-xl hover:bg-gray-300 cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </button>
    </div>

    <div className="w-full flex gap-4">
        {/* Book Cover Container */}
        <div className="bg-white w-120 flex flex-col gap-4">
            <img src={bookDetails?.cover} className="bg-gray-100 h-100 object-cover shadow-xl mb-5" />
            <h1 className="text-gray-800">Book Status: {" "}
                <span className={`${bookDetails?.availability ? "text-green-500" : "text-red-500"}`}>
                  {bookDetails?.availability ? "Available" : "Not Available"}
                </span>
            </h1>
            <h1 className="text-xs text-gray-500">{id || "Book Id —"}</h1>
        </div>
        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-gray-300 border-b-1">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-gray-800 text-4xl font-md">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-sm text-gray-500">Authored by: {bookDetails?.author || "—"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full uppercase"><Book size={20}/>{bookDetails?.type}</div>
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full"><Book size={20}/>{bookDetails?.category}</div>
                        <div className="justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full"><BookOpenText size={20}/>{bookDetails?.pages.length} Pages</div>
                    </div>

                    <div className="flex gap-2">
                        <button className="justify-center items-center flex gap-2 bg-yellow-600 py-2 px-3 text-sm text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer">
                            <Pen size={20}/> Edit
                        </button>
                        <button className="justify-center items-center flex gap-2 bg-red-600 py-2 px-3 text-sm text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer">
                            <Trash size={20}/> Remove
                        </button>
                    </div>
                </div>

            </div>

           <div className="w-full py-4 rounded-xl">
                 <h1 className="text-gray-500 text-sm font-md">{bookDetails?.description || "—"}</h1>
           </div>
           

           <div className="w-full flex flex-col gap-2">

            {informations.filter(info =>
                info.value !== null &&
                info.value !== undefined &&
                info.value !== "" &&
                info.value !== "—"
            ).map((info, index) => (
                <div key={index}
                className="w-full border-b-1 border-gray-300 justify-between items-center flex p-2">
                <h1 className="text-xs font-bold text-gray-500">{info.label}</h1>
                <h1 className="text-sm font-bold uppercase">{info.value}</h1>
                </div>
            ))}

            </div>
        </div>
    </div>

    <Book_Edit bookDetails={bookDetails} />

    </section>
    </>
      )
}
export default Admin_ViewMaterials_Page;