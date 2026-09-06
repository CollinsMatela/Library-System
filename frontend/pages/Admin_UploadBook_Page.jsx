import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import BookInformation from "./UploadPage_Components/BookInformation";
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";
import PreviewBook from "./UploadPage_Components/PreviewBook"
import {  X, Plus, Image, Save, AudioLines, FilePlay, Pencil, ImageOff, Info, ArrowUp, Pen } from "lucide-react";
import { toast } from "react-toastify";

const Admin_UploadBook_Page = () => {

        const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const [errorMessage, setErrorMessage] = useState("");
        const [showConfirmation, setShowConfirmation] = useState(false);

        

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
        const [receivedDate, setReceivedDate] = useState(new Date()); // Default to today's date
        const [illustrator, setIllustrator] = useState("");
        const [moral, setMoral] = useState("");
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
            setReceivedDate(
                new Date().toISOString().split("T")[0]
            );

            setIllustrator("");
            setMoral("");
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
        if 
        (
            selectedCategoryOfBook.toLowerCase() === "philosophy/psychology" ||
            selectedCategoryOfBook.toLowerCase() === "social sciences" ||
            selectedCategoryOfBook.toLowerCase() === "technology / applied sciences" ||
            selectedCategoryOfBook.toLowerCase() === "the arts"
        )
         {
            if (!field) {
                toast.warning("Select Field.");
                return;
            }
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

   const uploadStory = async () => {

    try {

        const bookData = {
            // Category
            category: selectedCategoryOfBook,

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
            moral,
            series,

            // Non-Fiction
            field,
            subject,
            gradeLevel,
        };


        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/upload-manually`,
            bookData
        );

        if (res.data.success) {
            toast.success(res.data.message);
            resetForm();
            uploadNotification();
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
    }
};
      return(
        <>
        <Admin_SideBar/>
        {showConfirmation && (<Confirmation_Popup errorMessage={errorMessage} onConfirm={uploadStory} onCancel={() => {setShowConfirmation(false); setErrorMessage("")}}/>)}
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60 pb-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border border-stone-300 p-3 px-4 md:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Upload Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage uploading books to the library</h1>                   
              </header>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`w-full flex flex-col bg-white rounded-xl gap-10 px-4 md:px-10`}>
                    
                        {/* Story Details */}
                        <div className="bg-white w-full flex flex-col">

                        <div className="flex items-center justify-start gap-2 mb-4">
                            <div className="bg-stone-800 h-9 w-9 text-white justify-center items-center flex">
                            <Pen size={15} className="text-white"/>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Upload Book</h1>
                                <p className="text-stone-400 text-xs">Fill in the book details below to upload it.</p>
                            </div>
                            
                        </div>

                       <TypeOfBooks
                       selectedCategoryOfBook={selectedCategoryOfBook}
                       setSelectedCategoryOfBook={setSelectedCategoryOfBook}
                       field={field}
                       setField={setField}
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

                        moral={moral}
                        setMoral={setMoral}

                        series={series}
                        setSeries={setSeries}
                    />

                    <div className="justify-end items-center flex">
                        <button className="bg-green-200 text-xs text-green-500 justify-center items-center flex gap-2 p-2 rounded-lg border border-green-500 hover:bg-green-300 transition"
                        onClick={handleConfirmation}>
                            <Plus size={15}/>
                            <h1>Upload Book</h1>
                        </button>
                    </div>
                   
                </div>

                         </div>
                    
        </section>
        </>
      )
}
export default Admin_UploadBook_Page;