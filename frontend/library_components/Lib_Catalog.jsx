import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'
import { Search } from 'lucide-react'
import axios from 'axios';
import { BrushCleaning, ListFilter, MoveRight, LayoutGrid } from 'lucide-react';
import Catalog_TypeOfBooks from './CatalogPage_Component/Catalog_TypeOfBooks';
import Catalog_BookInformation from './CatalogPage_Component/Catalog_BookInformation';
import { useNavigate } from 'react-router-dom';

const Lib_Catalog = () => {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [books, setBooks] = useState([]);
    const [bookResults, setBookResults] = useState([]);

    //UI
    const [resultGrid, setResultGrid] = useState(false);

    
    // Searching States
    const [searchTerm, setSearchTerm] = useState("");

    const [language, setLanguage] = useState("");
    const [publication, setPublication] = useState("");
    const [publisher, setPublisher] = useState("");
    const [isbn, setIsbn] = useState("");

    const [edition, setEdition] = useState("");
    const [volume, setVolume] = useState("");
    const [fictionSeries, setFictionSeries] = useState("");

    const [scientificField, setScientificField] = useState("");
    const [mathBranch, setMathBranch] = useState("");
    const [technologyField, setTechnologyField] = useState("");
    const [engineeringDiscipline, setEngineeringDiscipline] = useState("");
    const [medicalField, setMedicalField] = useState("");

    const [referenceType, setReferenceType] = useState("");
    const [dictionaryType, setDictionaryType] = useState("");
    const [geographicCoverage, setGeographicCoverage] = useState("");

    const [subject, setSubject] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");

    const [researchField, setResearchField] = useState("");
    const [institution, setInstitution] = useState("");
    const [doi, setDoi] = useState("");

    const [businessArea, setBusinessArea] = useState("");
    const [economicsBranch, setEconomicsBranch] = useState("");

    // Filter States
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');

    const [sortBy, setSortBy] = useState('');

    const handleViewBook = (id) => {
        //   setSelectedStory(id)
          navigate(`/library/view-book/${id}`)
    }

   const clearFilters = () => {

    setSearchTerm("");

    setType("");
    setCategory("");

    setLanguage("");
    setPublication("");
    setPublisher("");
    setIsbn("");

    setEdition("");
    setVolume("");
    setFictionSeries("");

    setScientificField("");
    setMathBranch("");
    setTechnologyField("");
    setEngineeringDiscipline("");
    setMedicalField("");

    setReferenceType("");
    setDictionaryType("");
    setGeographicCoverage("");

    setSubject("");
    setGradeLevel("");

    setResearchField("");
    setInstitution("");
    setDoi("");

    setBusinessArea("");
    setEconomicsBranch("");

    setBookResults(books);

}
    const filterBooks = () => {

    let filtered = [...books];

    // Search title or author
    if(searchTerm.trim() !== ""){

        const query = searchTerm.toLowerCase();

        filtered = filtered.filter(book =>
            book.title?.toLowerCase().includes(query) ||
            book.author?.toLowerCase().includes(query)
        );
    }

        // Type
        if(type !== ""){

            filtered = filtered.filter(book =>
                book.type === type
            );

        }

        // Category
        if(category !== ""){

            filtered = filtered.filter(book =>
                book.category === category
            );

        }

        // Language
        if(language !== ""){

            filtered = filtered.filter(book =>
                book.language.toLowerCase() === language.toLowerCase()
            );

        }

        // Publication
        if(publication !== ""){

            filtered = filtered.filter(book =>
                book.publication === publication
            );

        }

        // Publisher
        if(publisher !== ""){

            filtered = filtered.filter(book =>
                book.publisher === publisher
            );

        }

        // ISBN
        if(isbn !== ""){

            filtered = filtered.filter(book =>
                book.isbn.includes(isbn)
            );

        }

        // Edition
        if(edition !== ""){

            filtered = filtered.filter(book =>
                book.edition === edition
            );

        }

        // Volume
        if(volume !== ""){

            filtered = filtered.filter(book =>
                book.volume === volume
            );

        }

        // Fiction Series
        if(fictionSeries !== ""){

            filtered = filtered.filter(book =>
                book.fictionSeries === fictionSeries
            );

        }

        // Scientific Field
        if(scientificField !== ""){

            filtered = filtered.filter(book =>
                book.scientificField === scientificField
            );

        }

        // Math Branch
        if(mathBranch !== ""){

            filtered = filtered.filter(book =>
                book.mathBranch === mathBranch
            );

        }

        // Technology Field
        if(technologyField !== ""){

            filtered = filtered.filter(book =>
                book.technologyField === technologyField
            );

        }

        // Engineering
        if(engineeringDiscipline !== ""){

            filtered = filtered.filter(book =>
                book.engineeringDiscipline === engineeringDiscipline
            );

        }

        // Medical
        if(medicalField !== ""){

            filtered = filtered.filter(book =>
                book.medicalField === medicalField
            );

        }

        // Reference
        if(referenceType !== ""){

            filtered = filtered.filter(book =>
                book.referenceType === referenceType
            );

        }

        // Dictionary
        if(dictionaryType !== ""){

            filtered = filtered.filter(book =>
                book.dictionaryType === dictionaryType
            );

        }

        // Geography
        if(geographicCoverage !== ""){

            filtered = filtered.filter(book =>
                book.geographicCoverage === geographicCoverage
            );

        }

        // Subject
        if(subject !== ""){

            filtered = filtered.filter(book =>
                book.subject === subject
            );

        }

        // Grade
        if(gradeLevel !== ""){

            filtered = filtered.filter(book =>
                book.gradeLevel === gradeLevel
            );

        }

        // Research
        if(researchField !== ""){

            filtered = filtered.filter(book =>
                book.researchField === researchField
            );

        }

        // Institution
        if(institution !== ""){

            filtered = filtered.filter(book =>
                book.institution === institution
            );

        }

        // DOI
        if(doi !== ""){

            filtered = filtered.filter(book =>
                book.doi === doi
            );

        }

        // Business
        if(businessArea !== ""){

            filtered = filtered.filter(book =>
                book.businessArea === businessArea
            );

        }

        // Economics
        if(economicsBranch !== ""){

            filtered = filtered.filter(book =>
                book.economicsBranch === economicsBranch
            );

        }

        setBookResults(filtered);

    }
    const sortedBooks = [...bookResults].sort((a, b) => {
    switch (sortBy) {
        case "titleAsc":
            return a.title.localeCompare(b.title);

        case "titleDesc":
            return b.title.localeCompare(a.title);

        case "authorAsc":
            return a.author.localeCompare(b.author);

        case "authorDesc":
            return b.author.localeCompare(a.author);

        case "newest":
            return b.publication - a.publication;

        case "oldest":
            return a.publication - b.publication;

        default:
            return 0;
    }
});

    useEffect(() => {
           fetchBooks();
        },[])

        useEffect(() => {
           setBookResults(sortedBooks)
        },[sortBy])
    
    const fetchBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
            setBookResults(res.data.books);
            console.log(res.data.message);
            console.log(res.data.books.length)
            } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            }
    }



    return (
        <section className="min-h-screen w-full">

            <div className="bg-white min-h-screen shadow-2xl w-full flex flex-col items-center rounded-2xl pb-4">

                <Lib_Navigation />

                <div className="w-full justify-center items-center flex flex-col mt-10 space-y-6 px-10 gap-2">

                    {/* FILTERS */}
                    <div className="bg-white w-1/2 space-y-4 ">

                        <div className=''>
                            <label className="block text-xs text-gray-600">
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
                                    placeholder="Search title or author..."
                                    className="w-full pl-4 pr-4 py-3 rounded-lg outline-none"
                                />
                            </div>
                            
                        </div>

                        {/* 1st Container */}
                        <Catalog_TypeOfBooks 
                        type={type}
                        setType={setType}
                        category={category}
                        setCategory={setCategory}
                        />

                        {type !== null && category !== null && (
                        <Catalog_BookInformation
                            type={type}
                            category={category}

                            language={language}
                            setLanguage={setLanguage}
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
                            fictionSeries={fictionSeries}
                            setFictionSeries={setFictionSeries}

                            scientificField={scientificField}
                            setScientificField={setScientificField}
                            mathBranch={mathBranch}
                            setMathBranch={setMathBranch}
                            technologyField={technologyField}
                            setTechnologyField={setTechnologyField}
                            engineeringDiscipline={engineeringDiscipline}
                            setEngineeringDiscipline={setEngineeringDiscipline}
                            medicalField={medicalField}
                            setMedicalField={setMedicalField}

                            referenceType={referenceType}
                            setReferenceType={setReferenceType}
                            dictionaryType={dictionaryType}
                            setDictionaryType={setDictionaryType}
                            geographicCoverage={geographicCoverage}
                            setGeographicCoverage={setGeographicCoverage}

                            subject={subject}
                            setSubject={setSubject}
                            gradeLevel={gradeLevel}
                            setGradeLevel={setGradeLevel}

                            researchField={researchField}
                            setResearchField={setResearchField}
                            institution={institution}
                            setInstitution={setInstitution}
                            doi={doi}
                            setDoi={setDoi}

                            businessArea={businessArea}
                            setBusinessArea={setBusinessArea}
                            economicsBranch={economicsBranch}
                            setEconomicsBranch={setEconomicsBranch}
                        />
                    )}

                        


                        {/* BUTTONS */}
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 justfify-center items-center flex gap-2 rounded-xl cursor-pointer hover:-translate-y-1" onClick={clearFilters}>
                                <BrushCleaning/> Clear
                            </button>

                            <button className="px-4 py-2 bg-black text-white justfify-center items-center flex gap-2 rounded-xl cursor-pointer hover:-translate-y-1" onClick={filterBooks}>
                               <ListFilter/> Filter
                            </button>
                        </div>

                    </div>

               

                <div className="max-h-100 w-1/2 bg-white border-t-1 py-4 mb-10">
                        <div className='justify-between items-center flex py-2'>
                           <h1 className="text-lg text-black"> Search Results ({bookResults.length})</h1>

                            <div className='flex gap-2'>
                            <button className={`${resultGrid ? "text-black" : "text-gray-300"} cursor-pointer`} onClick={() => setResultGrid((prev) => !prev)}><LayoutGrid/></button>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                                    className='w-fit px-4 py-2 bg-gray-100 rounded-xl outline-none'>
                                    <option value="">Sort By</option>
                                    <option value="titleAsc">Title (A-Z)</option>
                                    <option value="titleDesc">Title (Z-A)</option>
                                    <option value="authorAsc">Author (A-Z)</option>
                                    <option value="authorDesc">Author (Z-A)</option>
                                    <option value="newest">Publication (Newest)</option>
                                    <option value="oldest">Publication (Oldest)</option>
                                </select> 
                            </div>
                           
                        </div>
                        

                        {bookResults.length > 0 ? (
                            <div className={`space-y-2 grid ${resultGrid ? "grid-cols-3 gap-2" : "grid-cols-1"}`}>
                                {bookResults.map((book, index) => (
                                    <div key={book._id} 
                                    className={`bg-white hover:bg-gray-100 justify-between items-center flex transistion-all duration-300 ease-in-out cursor-pointer mb-2 gap-2`}
                                        onClick={() => handleViewBook(book._id)}
                                        >
                                        
                                        <div className={`h-full flex ${resultGrid ? "flex-col" : ""} gap-2`}>
                                            <img src={book?.cover} className={`${resultGrid ? "h-full w-full" : "h-30 w-25"} object-cover rounded-md`} />
                                            <div className="h-full flex flex-col">
                                                <h1 className="text-black text-lg">{book?.title}</h1>
                                                <h1 className="text-gray-500 text-xs">{book?.author}</h1>
                                                <h1 className="text-gray-500 text-xs">{book?.publication}</h1>
                                            </div>
                                        </div>
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

            </div>

            

        </section>
    )
}

export default Lib_Catalog