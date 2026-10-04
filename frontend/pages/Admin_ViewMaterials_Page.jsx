import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import AdminSidebar from '../components/Admin_Sidebar';
import { BookOpenText, Book, ArrowLeft, ImageOff } from "lucide-react";
import { toast } from "react-toastify";

const Admin_ViewMaterials_Page = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');


  const informations = [
    // Basic Information
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

    // Declared before the effect below that calls it.
    const fetchBookById = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-book/${id}`);
            setBookDetails(res.data.book);
          } catch (error) {
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
    }

    useEffect(() => {
         // Wrapped so the loading runs after the effect has finished.
         const loadData = async () => {
           try {
             await fetchBookById();
           } catch {
             toast.error("Failed to load the book.");
           }
         };
         loadData();
    },[])

  return(
    <>
    <AdminSidebar />
    
    <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pb-15 md:pl-20 lg:pl-60">
              
    <header className="bg-white w-full justify-between items-start flex flex-col border-0 lg:border-b border-stone-300 p-3 px-4 lg:px-10">
        {/* Goes to the catalog page by name, so it still works even if
            someone opens this page directly from a link. */}
        <button type="button" onClick={() => navigate("/admin/catalog")}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 mb-2 self-start cursor-pointer">
          <ArrowLeft size={14} />
          Back to catalog
        </button>

        <h1 className="text-sm font-bold text-stone-800">Book Information</h1>
        <h1 className="text-stone-400 text-xs">Manage the selected book</h1>                   
    </header>

    <div className="w-full flex flex-col md:flex-row gap-4 px-4 lg:px-10 mt-6">
        {/* Without this, a failed request just shows "Book name" and a
            column of dashes with no explanation. */}
        {errorMessage && (
        <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs text-red-600">{errorMessage}</p>
        </div>
        )}
        {/* Book Cover Container */}
        <div className="border border-stone-200 bg-stone-100 w-full md:w-120 justify-center items-center flex flex-col gap-4">
            {!bookDetails?.cover ?
            (
                <div className="w-fit justify-center items-center flex flex-col gap-1">
                    <ImageOff size={50} className="text-stone-300"/>
                   <h1 className="text-xs text-stone-500">Not Available</h1> 
                </div>
                
            )
            :
            (
                <img src={bookDetails?.cover} className="bg-stone-100 h-100 w-120 object-cover" />
            )}
            

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

                        {/* Only show the page count when the book actually has
                            one. bookDetails?.pages still crashes if pages is
                            missing, because ?. stops at bookDetails. */}
                        {bookDetails?.pages?.length > 0 && (
                        <div className="justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full"><BookOpenText size={15}/>{bookDetails.pages.length} Pages</div>
                        )}
                    </div>

                    
                </div>

            </div>

           <div className="w-full py-4 rounded-xl flex flex-col gap-2">
            <div className="flex flex-col gap-2">
                <h1 className="text-sm text-stone-800 font-bold">Description</h1>
                <h1 className="text-stone-500 text-xs font-md">{bookDetails?.description || "No description"}</h1>
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


    </section>
    </>
      )
}
export default Admin_ViewMaterials_Page;