import { TextAlignCenter, User } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
const TypeOfBooks = ({selectedTypeOfBooks, setSelectedTypeOfBooks, selectedCategoryOfBook, setSelectedCategoryOfBook, field, setField,
                      subject, setSubject, gradeLevel, setGradeLevel
}) => {

    const renderCategoryFields = () => {
    
    if (selectedCategoryOfBook.toLowerCase() === "philosophy & psychology") {
        return (
            <select
                className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                value={field}
                onChange={(e) => setField(e.target.value)}
            >
                <option value="">Select Philisophy & Psychology Field</option>
                <option value="logic">Logic</option>
                <option value="ethics">Ethics</option>
                
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "social sciences") {
        return (
            <select
                className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                value={field}
                onChange={(e) => setField(e.target.value)}
            >
                <option value="">Select Social Science Field</option>
                <option value="Political Science">Political Science</option>
                <option value="Economics">Economics</option>
                <option value="Law">Law</option>
                <option value="Public Administration">Public Administration</option>
                <option value="Education">Education</option>
                <option value="Commerce">Commerce</option>
                <option value="Customs">Customs</option>
                <option value="Etiquette">Etiquette</option>
                <option value="Folklore">Folklore</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "technology") {
        return (
            <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
            >
                <option value="">Select Technology Field</option>
                <option value="medicine">Medicine</option>
                <option value="engineering">Engineering</option>
                <option value="agriculture">Agriculture</option>
                <option value="home economics">Home Economics</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "the arts") {
        return (
            <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
            >
                <option value="">Select The Arts Field</option>
                <option value="architecture">Architecture</option>
                <option value="sculpture">Sculpture</option>
                <option value="drawing">Drawing</option>
                <option value="printing & paintings">Printing & Paintings</option>
                <option value="photography">Photography</option>
                <option value="music">Music</option>
                <option value="recreational & Performming Arts">Recreational & Performing Arts</option>
                <option value="Other">Other</option>
            </select>
        );
    }
if (selectedCategoryOfBook.toLowerCase() === "textbook") {
    return (
        <>
            <input
                type="text"
                placeholder="Subject"
               className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <select
                className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
            >
                <option value="">Grade Level</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Secondary / Tertiary">Secondary / Tertiary</option>
            </select>
        </>
    );
}


    return null;
};

    return(
        <div className="w-full grid my-4 p-6 border border-gray-300 rounded-xl gap-2">
            
            <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-gray-500 bg-gray-200 justify-center items-center flex"><TextAlignCenter size={20}/></div>
                                        <div>
                                            <h1 className="text-gray-600 text-sm font-bold">Select required information</h1>
                                            <h1 className="text-gray-600 text-xs">Select the appropriate fields for your book.</h1>
                                        </div>
                                    </div>
                                    
                                </div>

            <div className="w-full grid grid-cols-4 gap-2">
            <select className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2" value={selectedTypeOfBooks} onChange={(e) => setSelectedTypeOfBooks(e.target.value)}>
                <option value="">Type of Books</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
            </select>

            {/* Fiction */}
            <select
                className={`${selectedTypeOfBooks.toLowerCase() === 'fiction' ? "" : "hidden"} bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2`}
                value={selectedCategoryOfBook}
                onChange={(e) => setSelectedCategoryOfBook(e.target.value)}
            >
                <option value="">Type of Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Adventure">Adventure</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Humor">Humor</option>
                <option value="Fairy Tale">Fairy Tale</option>
                <option value="Myth">Myth</option>
                <option value="Legend">Legend</option>
                <option value="Fable">Fable</option>
                <option value="Folk Tale">Folk Tale</option>
                <option value="Young Adult">Young Adult</option>
                <option value="Children's Fiction">Children's Fiction</option>
                <option value="Literary Fiction">Literary Fiction</option>
                <option value="Contemporary Fiction">Contemporary Fiction</option>
                <option value="Crime Fiction">Crime Fiction</option>
                <option value="Graphic Novel">Graphic Novel</option>
                <option value="Story Book">Story Book</option>
            </select>

            {/* Non-Fiction */}
            <select className={`${selectedTypeOfBooks.toLowerCase() === 'non-fiction' ? "" : "hidden"} bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
                <option value="">Type of Non-Fiction</option>
                <option value="Generalities">Generalities</option>
                <option value="Philosophy & Psychology">Philosophy & Psychology</option>
                <option value="Religion">Religion</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Language">Language</option>
                <option value="Natural Science & Mathematics">Natural Science & Mathematics</option>
                <option value="Technology">Technology</option>
                <option value="The Arts">The Arts</option>
                <option value="Literature and Rhetoric">Literature and Rhetoric</option>
                <option value="Geography and History">Geography and History</option>
                <option value="Biography">Biography</option>
                <option value="Autobiography">Autobiography</option>
                <option value="Memoir">Memoir</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Reference">Reference</option>
                <option value="Encyclopedia">Encyclopedia</option>
                <option value="Dictionary">Dictionary</option>
                <option value="Atlas">Atlas</option>
                <option value="Essay">Essay</option>
                <option value="Textbook">Textbook</option>
                <option value="Workbook">Workbook</option>
                <option value="Research">Research</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Politics">Politics</option>
                <option value="Economics">Economics</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
            </select>
            {selectedTypeOfBooks.toLowerCase() === 'non-fiction' && (renderCategoryFields())}
            </div>
        </div>
    )
}
export default TypeOfBooks

