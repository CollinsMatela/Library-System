import { TextAlignCenter, User } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { categories, gradeLevels, subjects } from "../../mockdata";
const TypeOfBooks = ({selectedCategoryOfBook, setSelectedCategoryOfBook, field, setField,
                      subject, setSubject, gradeLevel, setGradeLevel
}) => {

    const renderCategoryFields = () => {
    
    if (selectedCategoryOfBook.toLowerCase() === "philosophy/psychology") {
        return (
            <select
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
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
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
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

    if (selectedCategoryOfBook.toLowerCase() === "technology / applied sciences") {
        return (
            <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
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
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
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
if (selectedCategoryOfBook.toLowerCase() === "textbooks") {
    return (
        <>
            <select
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            >
                <option value="">Subjects</option>
                {subjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                        {subject.label}
                    </option>
                ))}
            </select>

            <select
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
            >
                <option value="">Grade Level</option>
                {gradeLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                        {level.label}
                    </option>
                ))}
            </select>
        </>
    );
}


    return null;
};

    return(
        <div className="w-full grid my-4 md:p-6 border-0 md:border border-stone-300 md:rounded-xl gap-2">
            
            <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-stone-500 bg-stone-200 justify-center items-center flex"><TextAlignCenter size={20}/></div>
                                        <div>
                                            <h1 className="text-stone-600 text-sm font-bold">Select required information</h1>
                                            <h1 className="text-stone-600 text-xs">Select the appropriate fields for your book.</h1>
                                        </div>
                                    </div>
                                    
                                </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">


            {/* Non-Fiction */}
            <select className={` bg-white border border-stone-300 p-2 rounded-lg text-gray-500 text-xs mt-2`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
                <option value="">Select book categories</option>
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
            {renderCategoryFields()}
            </div>
        </div>
    )
}
export default TypeOfBooks

