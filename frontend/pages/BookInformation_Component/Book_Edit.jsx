import { useState, useEffect, useRef } from "react";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, Image, Sparkle, Sparkles, Repeat, PenBox, FilePlay, FileText } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import Confirmation_Popup from "../../popup/Confirmation_Popup";
const Book_Edit = ({bookDetails, fetchBookById}) => {

    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const [errorMessage, setErrorMessage] = useState("");
    const [isBookInformationUpdate, setIsBookInformationUpdate] = useState(false);
    const [isBookPageUpdate, setIsBookPageUpdate] = useState(false);

    const [selectedPageIndex, setSelectedPageIndex] = useState(null);
    const [selectedNewImage, setSelectedNewImage] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const imageRef = useRef(null);

    const [audio, setAudio] = useState(null);
    const [audioPreview, setAudioPreview] = useState('');
    const audioRef = useRef(null);

    // Book Type
    const [type, setType] = useState(bookDetails?.type || "");
    const [category, setCategory] = useState(bookDetails?.category || "");

    // Basic Book Information
    const [title, setTitle] = useState(bookDetails?.title || "");
    const [author, setAuthor] = useState(bookDetails?.author || "");
    const [description, setDescription] = useState(bookDetails?.description || "");
    const [language, setLanguage] = useState(bookDetails?.language || "");
    const [publication, setPublication] = useState(bookDetails?.publication || "");
    const [publisher, setPublisher] = useState(bookDetails?.publisher || "");
    const [copies, setCopies] = useState(bookDetails?.copies || "");
    const [isbn, setIsbn] = useState(bookDetails?.isbn || "");

    const [illustrator, setIllustrator] = useState(bookDetails?.illustrator || "");
    const [moral, setMoral] = useState(bookDetails?.moral || "No summary yet");

    //Fiction Series
    const [fictionSeries, setFictionSeries] = useState(bookDetails?.fictionSeries || "");

    // Science, Technology, Engineering, Mathematics & Medicine
    const [scientificField, setScientificField] = useState(bookDetails?.scientificField || "");
    const [mathBranch, setMathBranch] = useState(bookDetails?.mathBranch || "");
    const [technologyField, setTechnologyField] = useState(bookDetails?.technologyField || "");
    const [engineeringDiscipline, setEngineeringDiscipline] = useState(bookDetails?.engineeringDiscipline || "");
    const [medicalField, setMedicalField] = useState(bookDetails?.medicalField || "");

    // Reference Books
    const [referenceType, setReferenceType] = useState(bookDetails?.referenceType || "");
    const [dictionaryType, setDictionaryType] = useState(bookDetails?.dictionaryType || "");
    const [geographicCoverage, setGeographicCoverage] = useState(bookDetails?.geographicCoverage || "");

    // Educational Books
    const [subject, setSubject] = useState(bookDetails?.subject || "");
    const [gradeLevel, setGradeLevel] = useState(bookDetails?.gradeLevel || "");

    // Research & Academic
    const [researchField, setResearchField] = useState(bookDetails?.researchField || "");
    const [institution, setInstitution] = useState(bookDetails?.institution || "");
    const [doi, setDoi] = useState(bookDetails?.doi || "");

    // Business & Economics
    const [businessArea, setBusinessArea] = useState(bookDetails?.businessArea || "");
    const [economicsBranch, setEconomicsBranch] = useState(bookDetails?.economicsBranch || "");

    // Book Content
    const [pages, setPages] = useState(
        bookDetails?.pages || [
            {
                pageText: "",
                pageImage: "",
                pageAudio: ""
            },
        ]
    );

    useEffect(() => {
    if (!bookDetails) return;

    setPages(bookDetails.pages);
}, [bookDetails]);

    // Cover & Availability
    const [cover, setCover] = useState(bookDetails?.cover || null);
    const [availability, setAvailability] = useState(
        bookDetails?.availability ?? true
    );

    // Additional Information
    const [edition, setEdition] = useState(bookDetails?.edition || "");
    const [volume, setVolume] = useState(bookDetails?.volume || "");


useEffect(() => {
   setImageFile(null);
},[selectedPageIndex])

useEffect(() => {
    if (!bookDetails) return;

    // Book Type
    setType(bookDetails.type || "");
    setCategory(bookDetails.category || "");

    // Basic Book Information
    setTitle(bookDetails.title || "");
    setAuthor(bookDetails.author || "");
    setDescription(bookDetails.description || "");
    setLanguage(bookDetails.language || "");
    setPublication(bookDetails.publication || "");
    setPublisher(bookDetails.publisher || "");
    setCopies(bookDetails.copies || 0);
    setIsbn(bookDetails.isbn || "");
    setPages(bookDetails.pages || []);

    // Fiction
    setFictionSeries(bookDetails.fictionSeries || "");
    setIllustrator(bookDetails.illustrator || "");
    setMoral(bookDetails.moral || "");

    // Science, Technology, Engineering, Mathematics & Medicine
    setScientificField(bookDetails.scientificField || "");
    setMathBranch(bookDetails.mathBranch || "");
    setTechnologyField(bookDetails.technologyField || "");
    setEngineeringDiscipline(bookDetails.engineeringDiscipline || "");
    setMedicalField(bookDetails.medicalField || "—");

    // Reference Books
    setReferenceType(bookDetails.referenceType || "");
    setDictionaryType(bookDetails.dictionaryType || "");
    setGeographicCoverage(bookDetails.geographicCoverage || "");

    // Educational Books
    setSubject(bookDetails.subject || "");
    setGradeLevel(bookDetails.gradeLevel || "");

    // Research & Academic
    setResearchField(bookDetails.researchField || "");
    setInstitution(bookDetails.institution || "");
    setDoi(bookDetails.doi || "");

    // Business & Economics
    setBusinessArea(bookDetails.businessArea || "");
    setEconomicsBranch(bookDetails.economicsBranch || "");

    // Book Content
    setPages(
        bookDetails.pages || [
            {
                pageText: "",
                pageImage: [],
            },
        ]
    );

    // Cover & Availability
    setCover(bookDetails.cover || null);
    setAvailability(bookDetails.availability ?? true);

    // Additional Information
    setEdition(bookDetails.edition || "");
    setVolume(bookDetails.volume || "");

    }, [bookDetails]);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const image = await uploadToCloudinary(file, "image");

            setPages(prev => {
                const updated = [...prev];

                updated[selectedPageIndex] = {
                    ...updated[selectedPageIndex],
                    pageImage: image,
                };

                return updated;
            });

        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleAudioChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            const audio = await uploadToCloudinary(file, "video");

            setPages(prev => {
                const updated = [...prev];

                updated[selectedPageIndex] = {
                    ...updated[selectedPageIndex],
                    pageAudio: audio,
                };

                return updated;
            });

            setAudioPreview(URL.createObjectURL(file));

        } catch (error) {
            console.error("Audio upload failed:", error);
        }
    };

    const updateBookInformation = async () => {

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-book/${bookDetails._id}`, {
                title,
                author,
                description,
                language,
                publication,
                publisher,
                copies,
                isbn,
                type,
                category,
                edition,
                volume,
                illustrator,
                moral,
                fictionSeries,
                scientificField,
                mathBranch,
                technologyField,
                engineeringDiscipline,
                medicalField,
                referenceType,
                dictionaryType,
                geographicCoverage,
                subject,
                gradeLevel,
                researchField,
                institution,
                doi,
                businessArea,
                economicsBranch,
            });
            console.log(res.data.message);
            setErrorMessage("");
            toast.success(res.data.message);
            fetchBookById(bookDetails._id);
            setIsBookInformationUpdate(false);
        } catch (error) {
            console.error("Error updating book information:", error);
            setErrorMessage(error?.response?.data?.message || "An error occurred while updating the book information.");
            toast.error(error?.response?.data?.message || "An error occurred while updating the book information.");
        }
    }

    const updatePage = async () => {
        
            const currentPage = pages[selectedPageIndex];

            const bookPageData = {
                bookId: bookDetails._id,
                pageId: currentPage._id,
                pageText: currentPage.pageText,
                pageImage: currentPage.pageImage,
                pageAudio: currentPage.pageAudio
            };

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-page`, bookPageData);
            console.log("Page updated successfully:", res.data.message);
            toast.success(res.data.message);
            setErrorMessage("");
            fetchBookById(bookDetails._id);
            setIsBookPageUpdate(false);
            
          } catch (error) {
            console.error("Error updating page:", error);
            setErrorMessage(error?.response?.data?.message || "An error occurred while updating the page.");
            toast.error(error?.response?.data?.message || "An error occurred while updating the page.");
          }
    }

    const UpdateInformationConfirmation = () => {
          setIsBookInformationUpdate(true)
    }
    const UpdatePageConformation = () => {
          setErrorMessage('');
          setIsBookPageUpdate(true)
    }

    const basicFields = [
    { label: "Title", value: title, set: setTitle, placeholder: "Enter title", type: "text" },
    { label: "Author", value: author, set: setAuthor, placeholder: "Enter author", type: "text" },
    { label: "Language", value: language, set: setLanguage, placeholder: "Select language", type: "select", options: ["English", "Filipino"] },
    { label: "Publication", value: publication, set: setPublication, placeholder: "Enter publication year", type: "number" },
    { label: "Publisher", value: publisher, set: setPublisher, placeholder: "Enter publisher", type: "text" },
    { label: "Copies", value: copies, set: setCopies, placeholder: "Enter copies", type: "number" },
    { label: "ISBN", value: isbn, set: setIsbn, placeholder: "Enter ISBN", type: "text" },
    { label: "Edition", value: edition, set: setEdition, placeholder: "Enter edition", type: "text" },
    { label: "Volume", value: volume, set: setVolume, placeholder: "Enter volume", type: "text" },
    ];
    // for Fiction
    const fictionFields = [
        { label: "Illustrator", value: illustrator, set: setIllustrator, placeholder: "Enter Illustrator", type: "text" },
        { label: "Series", value: fictionSeries, set: setFictionSeries, placeholder: "Enter series", type: "text" },
    ];
    // for Non-Fiction
    const scienceFields = [
    {
        label: "Scientific Field",
        value: scientificField,
        set: setScientificField,
        placeholder: "Select scientific field",
        type: "select",
        options: [
            "Biology", "Chemistry", "Physics", "Earth Science",
            "Environmental Science", "Astronomy", "Geology", "Ecology",
            "Marine Science", "Botany", "Zoology", "Microbiology",
            "Biotechnology", "Genetics", "Neuroscience", "Forensic Science", "Other"
        ],
    },
];

const mathematicsFields = [
    {
        label: "Math Branch",
        value: mathBranch,
        set: setMathBranch,
        placeholder: "Select math branch",
        type: "select",
        options: [
            "Algebra", "Geometry", "Trigonometry", "Calculus",
            "Statistics", "Probability", "Discrete Mathematics",
            "Linear Algebra", "Number Theory", "Differential Equations",
            "Topology", "Mathematical Logic", "Applied Mathematics",
            "Pure Mathematics", "Other"
        ],
    },
];

const technologyFields = [
    {
        label: "Technology Field",
        value: technologyField,
        set: setTechnologyField,
        placeholder: "Select technology field",
        type: "select",
        options: [
            "Information Technology", "Computer Science", "Software Development",
            "Web Development", "Mobile Development", "Networking",
            "Cybersecurity", "Cloud Computing", "Database Management",
            "Artificial Intelligence", "Machine Learning", "Data Science",
            "Internet of Things", "Blockchain", "Other"
        ],
    },
];

const engineeringFields = [
    {
        label: "Engineering Discipline",
        value: engineeringDiscipline,
        set: setEngineeringDiscipline,
        placeholder: "Select engineering discipline",
        type: "select",
        options: [
            "Civil Engineering", "Mechanical Engineering", "Electrical Engineering",
            "Computer Engineering", "Chemical Engineering", "Industrial Engineering",
            "Environmental Engineering", "Biomedical Engineering",
            "Aerospace Engineering", "Other"
        ],
    },
];

const medicalFields = [
    {
        label: "Medical Field",
        value: medicalField,
        set: setMedicalField,
        placeholder: "Select medical field",
        type: "select",
        options: [
            "General Medicine", "Anatomy", "Physiology", "Pathology",
            "Pharmacology", "Microbiology", "Immunology", "Biochemistry",
            "Nursing", "Dentistry", "Pharmacy", "Public Health",
            "Pediatrics", "Cardiology", "Neurology", "Oncology",
            "Psychiatry", "Radiology", "Surgery", "Veterinary Medicine", "Other"
        ],
    },
];

const referenceFields = [
    {
        label: "Reference Type",
        value: referenceType,
        set: setReferenceType,
        placeholder: "Select reference type",
        type: "select",
        options: [
            "Handbook", "Manual", "Guide", "Directory",
            "Companion", "Yearbook", "Almanac", "Other"
        ],
    },
];

const atlasFields = [
    {
        label: "Geographic Coverage",
        value: geographicCoverage,
        set: setGeographicCoverage,
        placeholder: "Enter geographic coverage",
        type: "text",
    },
]

const dictionaryFields = [
    {
        label: "Dictionary Type",
        value: dictionaryType,
        set: setDictionaryType,
        placeholder: "Select dictionary type",
        type: "select",
        options: [
            "General", "Bilingual", "Multilingual", "Technical",
            "Medical", "Legal", "Business", "Science", "Other"
        ],
    },
]

const textbookFields = [
    {
        label: "Subject",
        value: subject,
        set: setSubject,
        placeholder: "Enter subject",
        type: "text",
        
    },
    {
        label: "Grade Level",
        value: gradeLevel,
        set: setGradeLevel,
        placeholder: "Select grade level",
        type: "select",
        options: [
            "Elementary",
            "Junior High School",
            "Senior High School",
            "College",
            "Graduate School",
            "Professional"
        ],
    },
];

const researchFields = [
    {
        label: "Research Field",
        value: researchField,
        set: setResearchField,
        placeholder: "Select research field",
        type: "text",
        
    },
    {
        label: "Institution",
        value: institution,
        set: setInstitution,
        placeholder: "Enter institution",
        type: "text",
    },
    {
        label: "DOI",
        value: doi,
        set: setDoi,
        placeholder: "Enter DOI",
        type: "text",
    },
];

const businessFields = [
    {
        label: "Business Area",
        value: businessArea,
        set: setBusinessArea,
        placeholder: "Enter business area",
        type: "text",
        
    },
    {
        label: "Economics Branch",
        value: economicsBranch,
        set: setEconomicsBranch,
        placeholder: "Select economics branch",
        type: "select",
        options: [
            "Microeconomics", "Macroeconomics", "International Economics",
            "Development Economics", "Behavioral Economics",
            "Financial Economics", "Labor Economics",
            "Environmental Economics", "Agricultural Economics", "Other"
        ],
    },
];

let fields = [...basicFields];

if (bookDetails?.type?.toLowerCase() === "fiction") {
    fields.push(...fictionFields);
}

switch (bookDetails?.category?.toLowerCase()) {
    case "science":
        fields.push(...scienceFields);
        break;

    case "mathematics":
        fields.push(...mathematicsFields);
        break;

    case "technology":
        fields.push(...technologyFields);
        break;

    case "engineering":
        fields.push(...engineeringFields);
        break;

    case "medical":
        fields.push(...medicalFields);
        break;

    case "reference":
        fields.push(...referenceFields);
        break;
    
    case "dictionary":
        fields.push(...dictionaryFields);
        break;

    case "atlas":
        fields.push(...atlasFields);
        break;

    case "textbook":
        fields.push(...textbookFields);
        break;

    case "research":
        fields.push(...researchFields);
        break;

    case "business":
        fields.push(...businessFields);
        break;

    default:
       break;
}

    return(
        <>
        {isBookInformationUpdate && (<Confirmation_Popup
        errorMessage={errorMessage}
        message={'Are you sure to update the book information?'}
        onConfirm={updateBookInformation}
        onCancel={() => setIsBookInformationUpdate(false)}
        />)}

        {isBookPageUpdate && (<Confirmation_Popup
        errorMessage={errorMessage}
        message={'Are you sure to update the book page?'}
        onConfirm={updatePage}
        onCancel={() => setIsBookPageUpdate(false)}
        />)}

        <div className="w-full border-t-1 border-stone-300 pt-10 flex flex-col px-10">
            
            <div className="flex items-center justify-start gap-2">
                          <div className="bg-stone-800 p-2">
                               <PenBox size={20} color="white"/>
                          </div>
                          <div>
                                <h2 className="text-md font-bold text-stone-800">Edit Book</h2>
                                <p className="text-xs text-stone-500">Manage the changing and updating book information.</p>
                          </div>
                      </div>
            
            <div className="w-full grid grid-cols-3 gap-4 mt-10">
                    {fields.map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                    <label className="text-xs text-stone-500">
                        {field.label}
                    </label>

                    {field.type === "select" ? (
                        <select
                            value={field.value}
                            onChange={(e) => field.set(e.target.value)}
                            className='w-full p-2 text-xs bg-white bg-white border border-stone-300 rounded-xl outline-none'
                        >
                            <option value="">
                                {field.placeholder}
                            </option>

                            {field.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={(e) => field.set(e.target.value)}
                            className='w-full p-2 text-xs bg-white border border-stone-300 rounded-xl outline-none'
                        />
                    )}
                </div>
            ))}
                </div>

            <div className="w-full mt-4 flex flex-col gap-1">
                <label className="text-xs text-stone-500">Description</label>
                    <textarea className="w-full h-30 border border-stone-300 outline-none p-2 text-xs rounded-xl"
                placeholder="Enter book description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>   
            </div>

            {category.toLowerCase() === 'story book' && (
            <div className="mt-6 rounded-2xl border border-violet-200 bg-white">
                <div className="flex justify-between items-start gap-2 p-4 border-b border-stone-300">
                    <div className="justify-center items-center flex gap-2">

                        <div>
                            <h2 className="text-sm font-semibold text-stone-900">
                            Generate Summary
                            </h2>
                            <p className="text-xs text-stone-500">
                            An AI feature that automatic generate summary of the story
                            </p>
                        </div>
                    </div>
    
                </div>

                <div className="p-4 border border-stone-100">
                <p className="leading-8 text-xs text-stone-700 whitespace-pre-line">
                    {moral || "Not yet generated summary."}
                </p>
                </div>

                <div className="w-full justify-end items-center flex p-4 border-t border-stone-300">
                    <button className="bg-stone-800 cursor-pointer hover:bg-stone-900 p-2 justify-center items-center flex gap-1" onClick={() => AISummarization()}>
                        <Sparkles size={15} className="text-white" /> <h1 className="text-xs text-white">Generate</h1>
                    </button>
                    
                </div>
            </div>
            )}

            {/* // Save Button */}
            <div className="w-full justify-end items-center flex mt-4">
            <button className="justify-center items-center flex gap-2 bg-green-600 p-2 text-xs text-white font-bold hover:-translate-y-1 cursor-pointer"
            onClick={UpdateInformationConfirmation}
            >
                <Pen size={15}/> Save Information 
            </button>
            </div>
            
            <div className="flex flex-col w-full gap-2 border-t-1 border-stone-300 mt-10 py-10">

            <div className="flex justify-between items-start gap-3 mb-5">
                <div className="justify-center items-center flex gap-2">
                    <div className="bg-stone-800 p-2">
                        <FileText size={20} className="text-white" />
                    </div>

                    <div>
                        <h2 className="text-md font-bold text-stone-800">
                            Edit Page 
                        </h2>
                        <p className="text-xs text-stone-500">
                          Manage to edit and update the book page information.
                        </p>
                    </div>
                </div>

                    <select className='w-fit p-2 text-xs bg-white border border-stone-300 rounded-xl outline-none'
                        onChange={(e) => setSelectedPageIndex(parseInt(e.target.value))}
                    >
                        <option value="">Select Page No.</option>
                        {pages.map((page, index) => (
                            <option 
                            key={index} 
                            value={index}>
                            Page {index + 1}
                            </option>
                        ))}
                    </select> 
                </div>

            <div className="flex gap-2">
             

            </div>
                
                {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                <div className="w-full flex flex-col gap-4">

                <div className="w-full bg-white border border-stone-300 rounded-xl p-4">

                <div className="flex items-center gap-3 mb-5">
                    <div className="bg-stone-200 p-2 rounded-xl">
                        <FileText size={20} className="text-stone-700" />
                    </div>

                    <div>
                        <h2 className="text-md font-bold text-stone-800">
                            Page Text
                        </h2>
                        <p className="text-xs text-stone-500">
                            Edit the narration or story content for this page.
                        </p>
                    </div>
                </div>

                <textarea
                    className="w-full min-h-[400px] resize-none rounded-xl border border-stone-300 bg-stone-50 p-4 text-sm text-stone-700 leading-7 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    placeholder="Enter the page text..."
                    value={pages[selectedPageIndex]?.pageText || ""}
                    onChange={(e) => {
                        const newPages = [...pages];
                        newPages[selectedPageIndex].pageText = e.target.value;
                        setPages(newPages);
                    }}
                />

                <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-stone-400">
                        Write the content that will appear on this page.
                    </span>

                    <span className="text-xs font-medium text-stone-500">
                        {pages[selectedPageIndex]?.pageText?.length || 0} characters
                    </span>
                </div>

            </div>
                    
                    {/**Image Preview */}
                    <div className="w-full bg-white border border-stone-300 rounded-xl p-4">

                        <div className="flex justify-between items-start gap-3 mb-5">
                            <div className="justify-center items-center flex gap-2">
                                    <div className="bg-stone-200 p-2 rounded-xl">
                                    <Image size={20} className="text-stone-700" />
                                    </div>

                                    <div>
                                        <h2 className="text-md font-bold text-stone-800">
                                            Page Image
                                        </h2>
                                        <p className="text-xs text-stone-500">
                                            Update the image displayed on this page.
                                        </p>
                                    </div>
                            </div>
                            
                            {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                            <div className="flex flex-col gap-1">
                                <button className='w-fit justify-center items-center flex gap-2 p-2 text-xs bg-stone text-white cursor-pointer rounded-xl outline-none hover:-translate-y-1'
                                onClick={() => imageRef.current.click()}
                                >
                                <input
                                    type="file"
                                    ref={imageRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Image size={15} />
                                Change Page Image
                                </button>
                            </div>  
                            )}
                        </div>

                        {pages[selectedPageIndex]?.pageImage ? (
                            <div className="w-full flex flex-col items-center">
                                <img
                                    src={
                                        pages[selectedPageIndex].pageImage instanceof File
                                                ? URL.createObjectURL(pages[selectedPageIndex].pageImage)
                                                : pages[selectedPageIndex].pageImage
                                    }
                                    alt="Page Preview"
                                    className="w-full max-h-80 object-contain rounded-lg border border-stone-200 bg-stone-50"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-72 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 flex flex-col justify-center items-center">
                                <Image size={20} className="text-stone-400 mb-3" />

                                <h3 className="font-semibold text-stone-700 text-sm">
                                    No Image Uploaded
                                </h3>

                                <p className="text-xs text-stone-500 text-center mt-1">
                                    Upload an image to preview it here.
                                </p>
                            </div>
                        )}

                    </div>

                    {/**Audio Preview */}
                        {type.toLowerCase() === 'fiction' && category.toLowerCase() === 'story book' && (
                            <div className="w-full justify-start items-start flex flex-col p-4 bg-white border border-stone-300 rounded-xl mb-2">
                                <div className="flex justify-between items-start gap-2 mb-5 w-full">
                                        
                                        <div className="justify-center items-center flex gap-2">
                                            <div className="bg-stone-200 p-2 rounded-xl">
                                                <FilePlay size={20} className="text-stone-700"/>
                                            </div>
                                            <div>
                                                    <h2 className="text-md font-bold text-stone-800">Narration Audio</h2>
                                                    <p className="text-xs text-stone-500">Update the audio narration of this page.</p>
                                            </div>
                                        </div>
                                        

                                        {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                                        <div className="flex flex-col gap-1">
                                            <button className='w-fit justify-center items-center flex gap-2 p-2 text-xs bg-stone text-white cursor-pointer rounded-xl outline-none hover:-translate-y-1'
                                            onClick={() => audioRef.current.click()}
                                            >
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                ref={audioRef}
                                                onChange={handleAudioChange}
                                                className="hidden"
                                            />
                                            <Image size={15} />
                                            Change Page Audio
                                            </button>
                                        </div>  
                                        )}
                                </div>

                                {pages[selectedPageIndex].pageAudio ? 
                                    <audio
                                        className="w-full"
                                        controls
                                        src={
                                            pages[selectedPageIndex].pageAudio instanceof File
                                                ? URL.createObjectURL(pages[selectedPageIndex].pageAudio)
                                                : pages[selectedPageIndex].pageAudio
                                        }
                                    />
                                    :
                                    <div className="w-full rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-6 flex flex-col items-center justify-center text-center">
                                        <div className="p-3 rounded-full bg-stone-200 mb-3">
                                            <FilePlay size={20} className="text-stone-500" />
                                        </div>

                                        <h2 className="text-stone-700 text-sm font-semibold">
                                            No Narration Audio
                                        </h2>

                                        <p className="text-xs text-stone-500 mt-1">
                                            Upload an audio narration to preview it here.
                                        </p>
                                    </div>
                                }
                                    

                                
                            </div>
                            
                        )}

                    <div className="w-full justify-end items-center flex">
                    <button className="justify-center items-center flex gap-2 bg-green-600 py-2 px-3 text-xs text-white font-bold hover:-translate-y-1 cursor-pointer"
                    onClick={UpdatePageConformation}
                    >
                        <Pen size={15}/> Save Page No. {selectedPageIndex + 1}
                    </button>
                    </div>
                </div>
            )}
                
                
                
            </div>
            
            

        </div>
        </>
    )
}
export default Book_Edit