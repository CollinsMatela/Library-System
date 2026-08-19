import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'
import { Search, Book, BookCopy } from 'lucide-react'
import axios from 'axios';
import { BrushCleaning, ListFilter, MoveRight, LayoutGrid } from 'lucide-react';
import Catalog_TypeOfBooks from './CatalogPage_Component/Catalog_TypeOfBooks';
import Catalog_BookInformation from './CatalogPage_Component/Catalog_BookInformation';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'

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
    const [illustrator, setIllustrator] = useState("");
    const [isbn, setIsbn] = useState("");
    const [field, setField] = useState("");
    const [ddc, setDdc] = useState("");
    const [callNumber, setCallNumber] = useState("");
    const [gradeLevel, setGradeLevel] = useState("");
    const [subject, setSubject] = useState("");
    const [edition, setEdition] = useState("");
    const [volume, setVolume] = useState("");
    const [series, setSeries] = useState("");
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
    setField("")

    setLanguage("");
    setPublication("");
    setPublisher("");
    setIllustrator("");
    setIsbn("");

    setEdition("");
    setVolume("");
    
    setSeries("")
    setDdc("")
    setCallNumber("")

    setGradeLevel("");
    setSubject("");
    setSortBy("");

    setBookResults(books);

}
    const filterBooks = () => {

    let filtered = [...books];

    // Search title or author
    if (searchTerm.trim() !== "") {

        const query = searchTerm.toLowerCase();

        filtered = filtered.filter(book =>
            book.title?.toLowerCase().includes(query) ||
            book.author?.toLowerCase().includes(query)
        );
    }

    // Type
    if (type !== "") {
        filtered = filtered.filter(book =>
            book.type?.toLowerCase() === type.toLowerCase()
        );
    }

    // Category
    if (category !== "") {
        filtered = filtered.filter(book =>
            book.category?.toLowerCase() === category.toLowerCase()
        );
    }

    if (field !== "") {
        filtered = filtered.filter(book =>
            book.field?.toLowerCase() === field.toLowerCase()
        );
    }

    // Language
    if (language !== "") {
        filtered = filtered.filter(book =>
            book.language?.toLowerCase() === language.toLowerCase()
        );
    }

    // Publication
    if (publication !== "") {
        filtered = filtered.filter(book =>
            Number(book.publication) === Number(publication)
        );
    }

    // Publisher
    if (publisher !== "") {
        filtered = filtered.filter(book =>
            book.publisher?.toLowerCase().includes(publisher.toLowerCase())
        );
    }
    // Illustrator
    if (illustrator !== "") {
        filtered = filtered.filter(book =>
            book.illustrator?.toLowerCase().includes(illustrator.toLowerCase())
        );
    }

    // ISBN
    if (isbn !== "") {
        filtered = filtered.filter(book =>
            book.isbn?.toLowerCase().includes(isbn.toLowerCase())
        );
    }

    // Edition
    if (edition !== "") {
        filtered = filtered.filter(book =>
            book.edition?.toLowerCase().includes(edition.toLowerCase())
        );
    }

    // Volume
    if (volume !== "") {
        filtered = filtered.filter(book =>
            book.volume?.toLowerCase().includes(volume.toLowerCase())
        );
    }

    if (series !== "") {
        filtered = filtered.filter(book =>
            book.series?.toLowerCase().includes(series.toLowerCase())
        );
    }
    if (ddc !== "") {
        filtered = filtered.filter(book =>
            book.ddc?.toLowerCase().includes(ddc.toLowerCase())
        );
    }

    if (callNumber !== "") {
        filtered = filtered.filter(book =>
            book.callNumber?.toLowerCase().includes(callNumber.toLowerCase())
        );
    }

    if (gradeLevel !== "") {
        filtered = filtered.filter(book =>
            book.gradeLevel?.toLowerCase().includes(gradeLevel.toLowerCase())
        );
    }

    if (subject !== "") {
        filtered = filtered.filter(book =>
            book.subject?.toLowerCase().includes(subject.toLowerCase())
        );
    }

    setBookResults(filtered);
}

    const displayedBooks = [...bookResults].sort((a, b) => {
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
        <>
       <Lib_Navigation />
        <section className="min-h-screen w-full">

            <div className="bg-stone-50 w-full flex flex-col items-center rounded-2xl pb-4">

                

                <div className="w-full justify-center items-center flex flex-col space-y-4 px-10 gap-2">

                    <header className="w-5xl mt-20">
                        <h1 className="text-xl font-bold">Search & Catalog</h1>
                        <p className="text-stone-600 mt-2 text-xs">
                            Browse and search our collection of books by title, author, category, or other filters.
                        </p>
                    </header>

                    {/* FILTERS */}
                    <div className="bg-white rounded-xl border border-stone-300 w-5xl">

                         <header className='w-full justify-start items-center flex gap-2 border-b border-stone-300 p-4'>
                            <div className='p-2 bg-stone-800'><ListFilter size={15} className='text-white'/></div>
                            <div>
                                <h1 className="text-sm font-semibold">Find Your Next Book</h1>
                                <p className="text-xs text-stone-500">Filter books by category, title, language, and more.</p>
                            </div>
                         </header>

                        <div className='flex flex-col p-6'>
                            <label className="block text-xs text-stone-600">Search Books</label>

                            <div className="border border-stone-300 p-2 rounded-lg justify-start items-center flex py-4 px-4">

                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search title or author..."
                                    className="w-full text-xs outline-none"
                                />

                                <Search size={15} className=" text-stone-800"/>
                            </div>
                            
                        </div>

                        {/* 1st Container */}
                        <Catalog_TypeOfBooks 
                        type={type}
                        setType={setType}
                        category={category}
                        setCategory={setCategory}
                        field={field}
                        setField={setField}
                        gradeLevel={gradeLevel}
                        setGradeLevel={setGradeLevel}
                        subject={subject}
                        setSubject={setSubject}
                        />

                        <Catalog_BookInformation

                            language={language}
                            setLanguage={setLanguage}
                            publication={publication}
                            setPublication={setPublication}
                            publisher={publisher}
                            setPublisher={setPublisher}
                            illustrator={illustrator}
                            setIllustrator={setIllustrator}
                            isbn={isbn}
                            setIsbn={setIsbn}
                            ddc={ddc}
                            setDdc={setDdc}

                            callNumber={callNumber}
                            setCallNumber={setCallNumber}
                            series={series}
                            setSeries={setSeries}

                            edition={edition}
                            setEdition={setEdition}
                            volume={volume}
                            setVolume={setVolume}
                            
                        />

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-2 border-t border-stone-300 p-6">
                            <button className="p-2 justfify-center items-center flex gap-2 text-xs cursor-pointer hover:bg-stone-200 transition" onClick={clearFilters}>
                                <BrushCleaning size={15}/> Clear
                            </button>

                            <button className="p-2 bg-stone-800 text-white justfify-center items-center text-xs flex gap-2 cursor-pointer hover:bg-stone-900 transition" onClick={filterBooks}>
                               <Search size={15}/> Find
                            </button>
                        </div>

                    </div>

               

                <div className="w-5xl bg-white border border-stone-300 rounded-xl">
                        <div className='justify-between items-center flex border-b border-stone-300 p-6'>
                            <div className='justify-start items-center flex gap-2'>
                               <div className='p-2 bg-stone-800'>
                                <BookCopy size={15} className='text-white'/>
                               </div>

                               <div className='justify-start items-start flex flex-col'>
                                <h1 className="text-sm font-bold text-stone-800"> Search Results ({bookResults.length})</h1>
                               <h1 className="text-xs text-stone-500"> Books matching your search</h1> 
                               </div>
                               
                            </div>
                            

                            <div className='flex gap-2'>
                            <button className={`${resultGrid ? "text-stone-800" : "text-stone-300"} cursor-pointer`} onClick={() => setResultGrid((prev) => !prev)}><LayoutGrid size={15}/></button>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                                    className='w-fit p-2 text-xs bg-stone-100 rounded-xl outline-none'>
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
                            <div className={`p-6 grid ${resultGrid ? "grid-cols-4 gap-2" : "grid-cols-1"}`}>
                                {displayedBooks.map((book, index) => (
                                    <div key={book._id} 
                                    className={`bg-white ${resultGrid ? "hover:-translate-y-1" : "hover:bg-stone-100"} justify-between items-center flex transition-all duration-300 ease-in-out cursor-pointer mb-2 gap-2`}
                                        onClick={() => handleViewBook(book._id)}
                                        >
                                        
                                        <div className={`h-full flex ${resultGrid ? "flex-col" : ""} gap-2`}>
                                            <img src={book?.cover} className={`${resultGrid ? "h-full w-full" : "h-30 w-25"} object-cover`} />
                                            <div className="h-full flex flex-col w-full p-2">

                                                <div className="w-full flex gap-2 justify-center items-center mb-2">
                                                <div className="bg-stone-200 shadow-sm p-2 rounded-full">
                                                    <Book size={15} className='text-stone-500'/>
                                                </div>
                                                

                                                <div className="w-full flex flex-col">
                                                    <div className="flex justify-between items-center w-full">
                                                    <h1 className="text-stone-800 font-semibold text-sm">{book?.title} <span className="text-stone-400 text-xs"> • {book?.category}</span></h1>
                                                    <h1 className={`${book?.copies> 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"} text-xs p-1 rounded-full`}>{book?.copies> 0 ? "Available" : "Not Available"}</h1>
                                                    </div>
                                                    <h1 className="text-stone-400 text-xs">{book?.author}</h1>
                                                </div>
                                                
                                                </div>
                                                
                                                
                                                
                                                <h1 className="text-stone-400 text-xs">{book?.description.length > 100 ? `${book?.description.slice(0, 200)}...` : book?.description}</h1>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-40 text-stone-400">
                                No results found
                            </div>
                        )}

                    </div>

                     </div>

            </div>

            

        </section>
        <Footer/>
         </>
    )
}

export default Lib_Catalog