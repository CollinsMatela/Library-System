import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'
import { Search } from 'lucide-react'
import axios from 'axios';
import Catalog_TypeOfBooks from './CatalogPage_Component/Catalog_TypeOfBooks';
import Catalog_BookInformation from './CatalogPage_Component/Catalog_BookInformation';

const Lib_Catalog = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [bookResults, setBookResults] = useState([]);

    
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

   
    const SearchBooks = () => {
        if (!searchCategory) {
            alert("Select Searching Category");
            return;
        }

        const query = searchTerm.toLowerCase().trim();


        setBookResults(results); 
    };

    useEffect(() => {
           fetchBooks();
        },[])
    
    const fetchBooks = async () => {
            try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
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
                        </div>
                        
                    </div>

                    {/* FILTERS */}
                    <div className="border-b border-gray-300 pb-6 space-y-6">

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
                            <button className="px-4 py-2 bg-gray-100 rounded-xl">
                                Clear
                            </button>

                            <button className="px-4 py-2 bg-pink-600 text-white rounded-xl cursor-pointer hover:bg-pink-700" onClick={""}>
                                Filter
                            </button>
                        </div>

                    </div>

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

            

        </section>
    )
}

export default Lib_Catalog