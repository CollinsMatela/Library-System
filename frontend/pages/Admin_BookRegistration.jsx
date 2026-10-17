import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import BookInformation from "./UploadPage_Components/BookInformation";
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";
import PreviewBook from "./UploadPage_Components/PreviewBook"
import {  X, Plus, Image, Save, AudioLines, FilePlay, Pencil, ImageOff, Info, ArrowUp, Pen, BookPlus, RotateCwIcon, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import Admin_Header from "../components/Admin_Header";
import useAuthStore from "../store/useAuthStore";

const Admin_BookRegistration = () => {
        const user = useAuthStore((state) => state.user);
        const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const [errorMessage, setErrorMessage] = useState("");
        const [showConfirmation, setShowConfirmation] = useState(false);

        const navigate = useNavigate()

        // Book Information
        const [selectedCategoryOfBook, setSelectedCategoryOfBook] = useState("");
        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");
        const [description, setDescription] = useState("");
        const [language, setLanguage] = useState("");
        const [publication, setPublication] = useState("");
        const [publisher, setPublisher] = useState("");
        const [isbn, setIsbn] = useState("");
        const [ddc, setDdc] = useState("");
        const [copies, setCopies] = useState(1);
        const [callNumber, setCallNumber] = useState("");
        const [donatedFrom, setDonatedFrom] = useState("")
        const [receivedDate, setReceivedDate] = useState(null); // Default to today's date
        const [illustrator, setIllustrator] = useState("");
        const [series, setSeries] = useState("");
        const [field, setField] = useState("")
        const [subject, setSubject] = useState(""); 
        const [gradeLevel, setGradeLevel] = useState(""); 
        const [edition, setEdition] = useState("");
        const [volume, setVolume] = useState("");

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


        const resetForm = () => {
            setErrorMessage("");
            setShowConfirmation(false);

            setSelectedCategoryOfBook("");
            
            setTitle("");
            setAuthor("");
            setDescription("");
            setLanguage("");
            setPublication("");
            setPublisher("");
            setIsbn("");

            setEdition("");
            setVolume("");

            setDdc("");
            setField("");
            setSubject("");
            setGradeLevel("");

            setCopies(1);
            setCallNumber("");
            setDonatedFrom("");
            setReceivedDate(null);

            setIllustrator("");
            setSeries("");
        };
        
        const uploadNotification = async () => {
            const data = {bookTitle: title}
              try {
                console.log('Sending Notification...');
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-notification`, data);
                console.log(res.data.message);
              } catch (error) {
                toast.error(error?.response?.data?.message);
              }
        }

    const handleConfirmation = () => {

        if (!selectedCategoryOfBook) {
            toast.warning('Select Category')
            return;
        }
 
        if (!title) {
            toast.warning('Enter Title')
            return;
        }

        if (!language) {
            toast.warning('Select Language')
            return;
        }

        if (!copies || copies < 1) {
            toast.warning('Enter no. of Copies')
            return;
        } 

        if(selectedCategoryOfBook.toLowerCase() === 'textbook') {
            if (!gradeLevel) {
            toast.warning('Select Grade Level')
            return;
            } 
            if (!subject) {
            toast.warning('Select Subject')
            return;
            } 
        }

        setShowConfirmation(true);
    };
   
   const [uploadLoading, setUploadLoading] = useState(false)
   const uploadStory = async () => {
    setUploadLoading(true)
    try {

        const bookData = {
            // Category
            category: selectedCategoryOfBook,

            // Librarian Added
            addedById: user?._id,

            // Basic Book Information
            title,
            author,
            description,
            language,
            publication,
            publisher,
            isbn,

            // Publication Details
            edition,
            volume,

            // Inventory Information
            copies,
            callNumber,
            donatedFrom,
            receivedDate,

            // Classification
            ddc,

            // Literature / Fiction
            illustrator,
            series,

            // Non-Fiction
            subject,
            gradeLevel,
        };

        console.log(bookData)
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/upload-manually`,
            bookData
        );

        if (res.data.success) {
            toast.success(res.data.message);
            resetForm();
            uploadNotification();
            setUploadLoading(false)
        }

    } catch (error) {

        console.log(error);

        setErrorMessage(
            error?.response?.data?.message ||
            "Failed to upload book."
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to upload book."
        );
    } finally {
        setUploadLoading(false)
    }
};
      return(
        <>
        <Admin_SideBar/>
        {showConfirmation && 
        (<Confirmation_Popup 
            errorMessage={errorMessage} 
            onConfirm={uploadStory} 
            onCancel={() => {setShowConfirmation(false); setErrorMessage("");}}
            isLoading={uploadLoading}
        />)}
        <section className="bg-white min-h-[92vh] w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
              
              <Admin_Header mainText={'Book Registration'} subText={'Register the books from library'}/>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`w-full flex flex-col rounded-xl px-4 mt-4`}>
                    
                       <TypeOfBooks
                       selectedCategoryOfBook={selectedCategoryOfBook}
                       setSelectedCategoryOfBook={setSelectedCategoryOfBook}

                       subject={subject}
                       setSubject={setSubject}
                       gradeLevel={gradeLevel}
                       setGradeLevel={setGradeLevel}
                       />
                       
                    <BookInformation
                        // Category
                        selectedCategoryOfBook={selectedCategoryOfBook}

                        // Basic Information
                        title={title}
                        setTitle={setTitle}

                        author={author}
                        setAuthor={setAuthor}

                        description={description}
                        setDescription={setDescription}

                        language={language}
                        setLanguage={setLanguage}

                        // Publication Information
                        publication={publication}
                        setPublication={setPublication}

                        publisher={publisher}
                        setPublisher={setPublisher}

                        isbn={isbn}
                        setIsbn={setIsbn}

                        edition={edition}
                        setEdition={setEdition}

                        volume={volume}
                        setVolume={setVolume}

                        // Inventory Information
                        copies={copies}
                        setCopies={setCopies}

                        callNumber={callNumber}
                        setCallNumber={setCallNumber}

                        donatedFrom={donatedFrom}
                        setDonatedFrom={setDonatedFrom}

                        receivedDate={receivedDate}
                        setReceivedDate={setReceivedDate}

                        // Non-Fiction / Classification
                        ddc={ddc}
                        setDdc={setDdc}

                        field={field}
                        setField={setField}

                        subject={subject}
                        setSubject={setSubject}

                        gradeLevel={gradeLevel}
                        setGradeLevel={setGradeLevel}

                        // Literature / Fiction
                        illustrator={illustrator}
                        setIllustrator={setIllustrator}

                        series={series}
                        setSeries={setSeries}
                    />
          
                </div>
                
                    
        </section>
        <footer className="h-[8vh] w-full justify-start items-center flex border-t border-stone-300 bg-stone-100 md:pl-20 lg:pl-60 mb-10 md:mb-0">
            <div className="w-full justify-between items-center flex px-4">
                <h1 className="text-stone-500 text-[10px]">Book Registration Action</h1>
                
                <div className="w-fit flex gap-1">
                    <button className={`bg-white border border-stone-300 text-[10px] justify-center items-center flex gap-2 p-2 rounded-full hover:bg-stone-100 transition`}
                    disabled={uploadLoading}
                    onClick={resetForm}>
                        <RotateCcw size={15} className="text-stone-500"/>
                        <h1 className="text-stone-500">Reset</h1>
                    </button>
                    <button className={`${uploadLoading ? "bg-stone-200 text-stone-500" : "bg-stone-800 hover:bg-stone-900 text-white"} text-[10px] justify-center items-center flex gap-2 p-2 rounded-full hover:bg-stone-900 transition`}
                    disabled={uploadLoading}
                    onClick={handleConfirmation}>
                        <Plus size={15}/>
                        <h1>{uploadLoading ? "...Uploading" : "Upload book"}</h1>
                    </button>
                </div>
                
            </div>
            
            
        </footer>
        </>
      )
}
export default Admin_BookRegistration;