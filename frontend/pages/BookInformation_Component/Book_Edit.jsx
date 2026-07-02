import { useState, useEffect, useRef } from "react";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, Image } from "lucide-react";
import axios from "axios";
const Book_Edit = ({bookDetails, fetchBookById}) => {

    const [errorMessage, setErrorMessage] = useState("");

    const [selectedPageIndex, setSelectedPageIndex] = useState(null);
    const [selectedNewImage, setSelectedNewImage] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const imageRef = useRef(null);

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
    const [isbn, setIsbn] = useState(bookDetails?.isbn || "");


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
                pageImage: [],
            },
        ]
    );

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
    setIsbn(bookDetails.isbn || "");

    // Fiction
    setFictionSeries(bookDetails.fictionSeries || "");

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

    const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    }

    const updatePage = async () => {
          const currentPage = pages[selectedPageIndex];

          setPages(prev => (
            prev.map((page, index) => index === selectedPageIndex ? {...page, pageImage: imageFile} : page)
          ))

          const formData = new FormData();
          formData.append("bookId", bookDetails._id);
          formData.append("pageId", pages[selectedPageIndex]._id);
          formData.append("pageText", pages[selectedPageIndex].pageText);
          formData.append("pageImage", imageFile || currentPage.pageImage);
          console.log("Frontend -", pages[selectedPageIndex].pageText);
          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-page`, formData);
            console.log("Page updated successfully:", res.data.message);
            setErrorMessage("");
            fetchBookById(bookDetails._id);
          } catch (error) {
            console.error("Error updating page:", error);
            setErrorMessage(error?.response?.data?.message || "An error occurred while updating the page.");
          }
    }

    const basicFields = [
    { label: "Title", value: title, set: setTitle, placeholder: "Enter title", type: "text" },
    { label: "Author", value: author, set: setAuthor, placeholder: "Enter author", type: "text" },
    { label: "Language", value: language, set: setLanguage, placeholder: "Select language", type: "select", options: ["English", "Filipino"] },
    { label: "Publication", value: publication, set: setPublication, placeholder: "Enter publication year", type: "number" },
    { label: "Publisher", value: publisher, set: setPublisher, placeholder: "Enter publisher", type: "text" },
    { label: "ISBN", value: isbn, set: setIsbn, placeholder: "Enter ISBN", type: "text" },
    { label: "Edition", value: edition, set: setEdition, placeholder: "Enter edition", type: "text" },
    { label: "Volume", value: volume, set: setVolume, placeholder: "Enter volume", type: "text" },
    ];
    // for Fiction
    const fictionFields = [
        { label: "Fiction Series", value: fictionSeries, set: setFictionSeries, placeholder: "Enter fiction series", type: "text" },
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
        <div className="w-full border-t-1 border-gray-300 pt-10 flex flex-col">
            <div className="w-full justify-between items-start flex">
                    <div>
                    <h2 className="text-3xl font-bold text-gray-800">Edit {bookDetails?.title || "Book"}</h2>
                    <p className="text-gray-400 text-md">Manage student accounts, monitor learning progress, and keep track of student information and activities.</p>
                    </div>
            </div>
            <div className="w-full grid grid-cols-3 gap-4 mt-10">
                    {fields.map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">
                        {field.label}
                    </label>

                    {field.type === "select" ? (
                        <select
                            value={field.value}
                            onChange={(e) => field.set(e.target.value)}
                            className='w-full px-4 py-2 bg-white bg-white border border-gray-300 rounded-xl outline-none'
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
                            className='w-full px-4 py-2 bg-white bg-white border border-gray-300 rounded-xl outline-none'
                        />
                    )}
                </div>
            ))}
                </div>

            <div className="w-full mt-4 flex flex-col gap-1">
            <label className="text-xs text-gray-500">Description</label>
             <textarea className="w-full border border-gray-300 outline-none p-4 rounded-xl"
            placeholder="Enter book description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>   
            </div>
            
            <div className="flex flex-col w-full gap-2 border-t-1 border-gray-300 mt-10 py-10 gap-4">

            <div className="w-full justify-between items-start flex">
                <div>
                <h2 className="text-3xl font-bold text-gray-800">Edit {bookDetails?.title || "Book"} Pages</h2>
                <p className="text-gray-400 text-md">Manage student accounts, monitor learning progress, and keep track of student information and activities.</p>
                </div>
            </div>

            <div className="flex gap-2">
            <select className='w-fit px-4 py-2 bg-white border border-gray-300 rounded-xl outline-none'
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

            {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
            <div className="flex flex-col gap-1">
                <button className='w-fit justify-center items-center flex gap-2 px-4 py-2 bg-black text-white cursor-pointer rounded-xl outline-none hover:-translate-y-1'
                onClick={() => imageRef.current.click()}
                >
                <input
                    type="file"
                    ref={imageRef}
                    onChange={handleImageChange}
                    className="hidden"
                />
                <Image size={20} />
                Change Page Image
                </button>
                </div>  
            )}

            </div>
                
                {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                <div className="w-full flex flex-col gap-1">
                    <label className="text-xs text-gray-500">Page Text</label>
                    <textarea className="h-100 w-full bg-gray-100 outline-none p-4 rounded-xl leading-loose whitespace-pre-line"
                        placeholder="Enter book page text"
                        value={pages[selectedPageIndex]?.pageText || ""}
                        onChange={(e) => {
                            const newPages = [...pages];
                            newPages[selectedPageIndex].pageText = e.target.value;
                            setPages(newPages);
                        }}
                    ></textarea>
                    <div className="w-full flex flex-col">
                       <img src={
                                imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : pages[selectedPageIndex]?.pageImage
                                } 
                                alt="Page Image" 
                                className="mt-4 object-cover shadow-xl mb-5"
                        />
                    </div>

                    <div className="w-full justify-end items-center flex">
                    <button className="justify-center items-center flex gap-2 bg-green-600 py-2 px-3 text-sm text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer"
                    onClick={updatePage}
                    >
                        <Pen size={20}/> Save Page No. {selectedPageIndex + 1}
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