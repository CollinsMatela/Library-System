import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'
import { Search } from 'lucide-react'
import axios from 'axios';
import Lib_FilterWorkBooks from './Lib_FilterWorkBooks';
import Lib_FilterChildrensBooks from './Lib_FilterChildrensBooks';
import Lib_FilterStoryBooks from './Lib_FilterStoryBooks';
import Lib_FilterReferenceBooks from './Lib_FilterReferenceBooks';
import Lib_FilterEducationalBooks from './Lib_FilterEducationalBooks';

const Lib_Catalog = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [bookResults, setBookResults] = useState([]);

    const [storyBook, setStoryBook] = useState([]);
    const [referenceBook, setReferenceBook] = useState([]);
    const [educationalBook, setEducationalBook] = useState([]);
    const [childrensBook, setChildrensBook] = useState([]);
    const [workBooks, setWorkBooks] = useState([]);

    // Searching States
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    const [selectedType, setSelectedType] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')

    // Filter States

    // Children Property
    const [childrensStoryType, setChildrensStoryType] = useState("");
    const [childrensReadingLevel, setChildrensReadingLevel] = useState("");

    // Workbook Property
    const [workbookTopic, setWorkbookTopic] = useState("");
    const [workbookSubject, setWorkbookSubject] = useState("");
    const [workbookType, setWorkbookType] = useState("");
    const [workbookEdition, setWorkbookEdition] = useState("");

    // Story Property
    const [storySeries, setStorySeries] = useState("");
    const [storyVolume, setStoryVolume] = useState("");
    const [storyGenre, setStoryGenre] = useState("");

    // Reference Property
    const [referenceType, setReferenceType] = useState("");
    const [referenceSubjectArea, setReferenceSubjectArea] = useState("");
    const [referenceEdition, setReferenceEdition] = useState("");
    const [referenceVolume, setReferenceVolume] = useState("");

    // Educational Property
    const [educationalSubject, setEducationalSubject] = useState("");
    const [educationalEdition, setEducationalEdition] = useState("");

    const [language, setLanguage] = useState("");
    const [publishYear, setPublishYear] = useState("");

    const filterChildrensBook = childrensBook.filter((book) => {
        return (
        (childrensStoryType === "" || book.storyType?.toLowerCase().includes(childrensStoryType.toLowerCase())) &&
        (childrensReadingLevel === "" || book.readingLevel?.toLowerCase().includes(childrensReadingLevel.toLowerCase())) &&
        (language === "" || book.language?.toLowerCase().includes(language.toLowerCase())) &&
        (publishYear === "" || String(book.publication).includes(String(publishYear)))
        );
    });
    const filterStoryBook = storyBook.filter((book) => {
        return (
        (storySeries === "" || book.storySeries?.toLowerCase().includes(storySeries.toLowerCase())) &&
        (storyVolume === "" || book.storyVolume?.toLowerCase().includes(storyVolume.toLowerCase())) &&
        (storyGenre === "" || book.genre?.toLowerCase().includes(storyGenre.toLowerCase())) &&
        (language === "" || book.language?.toLowerCase().includes(language.toLowerCase())) &&
        (publishYear === "" || String(book.publication).includes(String(publishYear)))
        );
    });
    const filterWorkBook = workBooks.filter((book) => {
        return (
        (workbookTopic === "" || book.workbookTopic?.toLowerCase().includes(workbookTopic.toLowerCase())) &&
        (workbookSubject === "" || book.workbookSubject?.toLowerCase().includes(workbookSubject.toLowerCase())) &&
        (workbookType === "" || book.workbookType?.toLowerCase().includes(workbookType.toLowerCase())) &&
        (workbookEdition === "" || book.workbookEdition?.toLowerCase().includes(workbookEdition.toLowerCase())) &&
        (language === "" || book.language?.toLowerCase().includes(language.toLowerCase())) &&
        (publishYear === "" || String(book.publication).includes(String(publishYear)))
        );
    });
    const filterEducationalBook = educationalBook.filter((book) => {
        return (
        (educationalSubject === "" || book.subject?.toLowerCase().includes(educationalSubject.toLowerCase())) &&
        (educationalEdition === "" || book.educationalEdition?.toLowerCase().includes(educationalEdition.toLowerCase())) &&
        (language === "" || book.language?.toLowerCase().includes(language.toLowerCase())) &&
        (publishYear === "" || String(book.publication).includes(String(publishYear)))
        );
    });
    const filterReferenceBook = referenceBook.filter((book) => {
        return (
        (referenceType === "" || book.referenceType?.toLowerCase().includes(referenceType.toLowerCase())) &&
        (referenceSubjectArea === "" || book.subjectArea?.toLowerCase().includes(referenceSubjectArea.toLowerCase())) &&
        (referenceEdition === "" || book.referenceEdition?.toLowerCase().includes(referenceEdition.toLowerCase())) &&
        (referenceVolume === "" || book.referenceVolume?.toLowerCase().includes(referenceVolume.toLowerCase())) &&
        (language === "" || book.language?.toLowerCase().includes(language.toLowerCase())) &&
        (publishYear === "" || String(book.publication).includes(String(publishYear)))
        );
    });
    

   const FilterBooks = () => {
        if (selectedType === "") {
            alert("Select Book Category.")
            return
        }

        setBookResults([])

        const type = selectedType.toLowerCase()

        if (type === "childrensbook") {
            setBookResults(filterChildrensBook)
        } 
        else if (type === "storybook") {
            setBookResults(filterStoryBook)
        } 
        else if (type === "workbook") {
            setBookResults(filterWorkBook)
        } 
        else if (type === "referencebook") {
            setBookResults(filterReferenceBook)
        } 
        else if (type === "educationalbook") {
            setBookResults(filterEducationalBook)
        }
    }
    const SearchBooks = () => {
        if (!searchCategory) {
            alert("Select Searching Category");
            return;
        }

        const query = searchTerm.toLowerCase().trim();

        const allBooks = [
            ...workBooks.map(b => ({ ...b, type: "workbook" })),
            ...storyBook.map(b => ({ ...b, type: "storybook" })),
            ...childrensBook.map(b => ({ ...b, type: "childrensbook" })),
            ...referenceBook.map(b => ({ ...b, type: "referencebook" })),
            ...educationalBook.map(b => ({ ...b, type: "educationalbook" })),
        ];

        const results = allBooks.filter((book) => {
            switch (searchCategory) {

                case "title":
                    return book.title?.toLowerCase().includes(query);

                case "author":
                    return book.author?.toLowerCase().includes(query);

                case "isbn":
                    return book.isbn?.toLowerCase().includes(query);

                case "publisher":
                    return book.publisher?.toLowerCase().includes(query);

                case "publicationyear":
                    return String(book.publicationYear).includes(query);

                case "childrensbook":
                case "storybook":
                case "workbook":
                case "referencebook":
                case "educationalbook":
                    return book.type === searchCategory;

                default:
                    return false;
            }
        });

        setBookResults(results); 
    };

    useEffect(() => {
           fetchStoryBooks();
           fetchReferenceBooks();
           fetchEducationalBooks();
           fetchChildrensBooks();
           fetchWorkBooks();
        },[])
    
    const fetchStoryBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-storybooks`);
            setStoryBook(res.data.books);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchWorkBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-workbooks`);
            setWorkBooks(res.data.books);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchReferenceBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-referencebooks`);
            setReferenceBook(res.data.referenceBooks);
            console.log("No. of Reference books: ",res.data.referenceBooks.length);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchEducationalBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-educationalbooks`);
            setEducationalBook(res.data.educationalBooks);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }
    const fetchChildrensBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-childrensbooks`);
            setChildrensBook(res.data.childrensBooks);
            console.log(res.data.message);

            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }



    return (
        <section className="min-h-screen w-full bg-black/80 p-4">

            <div className="bg-white min-h-screen shadow-2xl w-full flex flex-col items-center rounded-2xl pb-4">

                <Lib_Navigation />

                <div className="max-w-5xl w-full mt-10 space-y-6">

                    {/* SEARCH */}
                    <div className=''>
                        <label className="block text-lg font-bold text-gray-600">
                            Search Books
                        </label>

                        <div className="mt-2 border border-gray-300 p-2 rounded-2xl justify-start items-center flex">
                            <Search
                                size={32}
                                className=" text-gray-400"
                            />

                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search title, type, genre, edition..."
                                className="w-full pl-4 pr-4 py-3 rounded-lg outline-none"
                            />
                            <select className='w-fit px-4 py-2 bg-gray-100 rounded-xl outline-none'
                            onChange={(e) => setSearchCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="childrensbook">Childrens Book</option>
                                <option value="storybook">Story Book</option>
                                <option value="workbook">Work Book</option>
                                <option value="referencebook">Reference Book</option>
                                <option value="educationalbook">Educational Book</option>
                                <option value="isbn">ISBN</option>
                                <option value="publisher">Publisher</option>
                                <option value="publicationyear">Publication Year</option>
                            </select>
                        </div>
                        <div className="flex justify-end mt-6 gap-2">
                            <button className="px-4 py-2 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200" onClick={() => {setSearchTerm('');setBookResults([]);}}>Clear Result</button>
                             <button className="px-4 py-2 bg-pink-600 text-white rounded-xl cursor-pointer hover:bg-pink-700" onClick={SearchBooks}>Search</button>
                        </div>

                        <div className="max-h-100 w-full overflow-y-auto border border-gray-200 rounded-xl p-4 bg-white mt-5">

                        <h1 className="text-lg font-bold text-gray-700 mb-3">
                            Search Results ({bookResults.length})
                        </h1>

                        {bookResults.length > 0 ? (
                            <div className="space-y-2">
                                {bookResults.map((book, index) => (
                                    <div
                                        key={book._id}
                                        className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                                    >
                                        <p className="text-sm text-gray-500">
                                            #{index + 1}
                                        </p>

                                        <h2 className="text-base font-semibold text-gray-800">
                                            {book.title}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-40 text-gray-400">
                                No results found
                            </div>
                        )}

                    </div>
                        
                    </div>

                    {/* FILTERS */}
                    <div className="border-b border-gray-300 pb-6 space-y-6">

                        <h2 className="text-lg font-bold text-gray-600">
                            Filtering Books
                        </h2>

                        {/* CATEGORY */}
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">
                                Select Category
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {[
                                    ['childrensbook', "Children's Book"],
                                    ['workbook', "Work Book"],
                                    ['storybook', "Story Book"],
                                    ['referencebook', "Reference Book"],
                                    ['educationalbook', "Educational Book"]
                                ].map(([key, label]) => (
                                    <div
                                        key={key}
                                        onClick={() => setSelectedType(key)}
                                        className="bg-gray-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-200"
                                    >
                                        {label}
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* TYPE DETAILS */}
                        <div>

                            <p className="text-sm font-medium text-gray-600 mb-2">
                                Fill-Up Information to filter the books
                            </p>

                            {/* CHILDREN BOOK */}
                            {selectedType === 'childrensbook' && (
                               <Lib_FilterChildrensBooks
                               childrensStoryType={childrensStoryType}
                               setChildrensStoryType={setChildrensStoryType}
                               childrensReadingLevel={childrensReadingLevel}
                               setChildrensReadingLevel={setChildrensReadingLevel}

                               />
                            )}

                            {/* WORK BOOK */}
                            {selectedType === 'workbook' && (
                                <Lib_FilterWorkBooks
                                workbookTopic={workbookTopic}
                                setWorkbookTopic={setWorkbookTopic}
                                workbookSubject={workbookSubject}
                                setWorkbookSubject={setWorkbookSubject}
                                workbookType={workbookType}
                                setWorkbookType={setWorkbookType}
                                workbookEdition={workbookEdition}
                                setWorkbookEdition={setWorkbookEdition}

                                />
                            )}

                            {/* STORYBOOK */}
                            {selectedType === 'storybook' && (
                                <Lib_FilterStoryBooks
                                storyGenre={storyGenre}
                                setStoryGenre={setStoryGenre}
                                storySeries={storySeries}
                                setStorySeries={setStorySeries}
                                storyVolume={storyVolume}
                                setStoryVolume={setStoryVolume}

                                
                                />
                            )}

                            {/* REFERENCE BOOK */}
                            {selectedType === 'referencebook' && (
                                <Lib_FilterReferenceBooks
                                
                                referenceType={referenceType}
                                setReferenceType={setReferenceType}
                                referenceSubjectArea={referenceSubjectArea}
                                setReferenceSubjectArea={setReferenceSubjectArea}
                                referenceEdition={referenceEdition}
                                setReferenceEdition={setReferenceEdition}
                                referenceVolume={referenceVolume}
                                setReferenceVolume={setReferenceVolume}

                                />
                            )}

                            {/* EDUCATIONAL BOOK */}
                            {selectedType === 'educationalbook' && (
                                <Lib_FilterEducationalBooks
                                educationalSubject={educationalSubject}
                                setEducationalSubject={setEducationalSubject}
                                educationalEdition={educationalEdition}
                                setEducationalEdition={setEducationalEdition}

                                />
                            )}

                        </div>

                        <div className="w-full flex gap-2">
                            {/* Language */}
                            <select
                                className="bg-gray-100 px-4 py-2 rounded-xl"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="">Select Language</option>
                                <option value="english">English</option>
                                <option value="filipino">Filipino</option>
                            </select>
                        
                            {/* Publish Year */}
                            <input
                                type="number"
                                maxLength={4}
                                className="border border-gray-300 rounded-xl px-2 h-10"
                                placeholder="Publish Year"
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                            />
                        </div>
                        


                        {/* BUTTONS */}
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-100 rounded-xl">
                                Clear
                            </button>

                            <button className="px-4 py-2 bg-pink-600 text-white rounded-xl cursor-pointer hover:bg-pink-700" onClick={FilterBooks}>
                                Filter
                            </button>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default Lib_Catalog