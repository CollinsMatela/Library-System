import { useEffect, useState } from 'react'
import Lib_Navigation from '../library_components/Lib_Navigation'
import { Search } from 'lucide-react'

const Lib_Catalog = () => {

    const [storyBook, setStoryBook] = useState([]);
    const [referenceBook, setReferenceBook] = useState([]);
    const [educationalBook, setEducationalBook] = useState([]);
    const [childrensBook, setChildrensBook] = useState([]);
    const [workBooks, setWorkBooks] = useState([]);

    useEffect(() => {
           fetchStoryBooks();
           fetchReferenceBooks();
           fetchEducationalBooks();
           fetchChildrensBooks();
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

    const [selectedType, setSelectedType] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')



    return (
        <section className="min-h-screen w-full bg-black/80 p-4">

            <div className="bg-white min-h-screen shadow-2xl w-full flex flex-col items-center rounded-2xl pb-4">

                <Lib_Navigation />

                <div className="max-w-5xl w-full mt-10 space-y-6">

                    {/* SEARCH */}
                    <div>
                        <label className="block text-lg font-bold text-gray-600">
                            Search Books
                        </label>

                        <div className="relative mt-2">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="search"
                                placeholder="Search title, type, genre, edition..."
                                className="w-full pl-10 pr-4 py-3 border rounded-lg
                                focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    {/* SEARCH RESULTS */}
                    <div className="h-20 w-full bg-gray-100 rounded-xl">

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
                                Select Book Details
                            </p>

                            {/* CHILDREN BOOK */}
                            {selectedType === 'childrensbook' && (
                                <div className="flex gap-2">
                                    <select className="bg-gray-100 px-4 py-2 rounded-xl">
                                        <option>Story Type</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>

                                    <select className="bg-gray-100 px-4 py-2 rounded-xl">
                                        <option>Reading Level</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                            )}

                            {/* STORYBOOK */}
                            {selectedType === 'storybook' && (
                                <div className="grid grid-cols-3 gap-2">

                                    <input
                                        className="border rounded-xl px-2 h-10"
                                        placeholder="Story Series"
                                    />

                                    <input
                                        className="border rounded-xl px-2 h-10"
                                        placeholder="Volume No."
                                    />

                                    <select className="bg-gray-100 px-2 rounded-xl">
                                        <option>Genre</option>
                                        <option>Horror</option>
                                        <option>Fantasy</option>
                                        <option>Adventure</option>
                                        <option>Mystery</option>
                                    </select>

                                </div>
                            )}

                            {/* REFERENCE BOOK */}
                            {selectedType === 'referencebook' && (
                                <div className="grid grid-cols-4 gap-2">

                                    <input className="border rounded-xl px-2 h-10" placeholder="Reference Type" />
                                    <input className="border rounded-xl px-2 h-10" placeholder="Subject Area" />
                                    <input className="border rounded-xl px-2 h-10" placeholder="Edition" />
                                    <input className="border rounded-xl px-2 h-10" placeholder="Volume" />

                                </div>
                            )}

                            {/* EDUCATIONAL BOOK */}
                            {selectedType === 'educationalbook' && (
                                <div className="grid grid-cols-2 gap-2">

                                    <input className="border rounded-xl px-2 h-10" placeholder="Subject" />
                                    <input className="border rounded-xl px-2 h-10" placeholder="Edition" />

                                </div>
                            )}

                        </div>

                        {/* LANGUAGE */}
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">
                                Select Language
                            </p>

                            <div className="flex gap-2">

                                <div
                                    onClick={() => setSelectedLanguage('english')}
                                    className="bg-gray-100 px-4 py-2 rounded-xl cursor-pointer"
                                >
                                    English
                                </div>

                                <div
                                    onClick={() => setSelectedLanguage('filipino')}
                                    className="bg-gray-100 px-4 py-2 rounded-xl cursor-pointer"
                                >
                                    Filipino
                                </div>

                            </div>
                        </div>

                        {/* YEAR */}
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-2">
                                Publication Year
                            </p>

                            <input
                                type="number"
                                maxLength={4}
                                className="border rounded-xl px-2 h-10 w-24"
                                placeholder="2026"
                            />
                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-100 rounded-xl">
                                Clear
                            </button>

                            <button className="px-4 py-2 bg-pink-600 text-white rounded-xl">
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