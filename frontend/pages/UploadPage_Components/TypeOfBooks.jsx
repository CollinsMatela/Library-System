import { TextAlignCenter, User } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { categories, gradeLevels, subjects } from "../../mockdata";
const TypeOfBooks = ({selectedCategoryOfBook, setSelectedCategoryOfBook,
                      subject, setSubject, gradeLevel, setGradeLevel
}) => {

    const renderCategoryFields = () => {
    
if (selectedCategoryOfBook.toLowerCase() === "textbooks") {
    return (
        <>
            <select
                className="bg-white border border-stone-200 p-2 rounded-lg text-stone-500 text-[10px] mt-2"
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
                className="bg-white border border-stone-200 p-2 rounded-lg text-stone-500 text-[10px] mt-2"
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
        <div className="bg-white w-full shadow-sm grid md:p-6 border-0 md:border border-stone-200 md:rounded-xl gap-2">

            <header>
                    <h1 className="text-stone-700 text-sm font-bold">Category Details</h1>
                    <h1 className="text-stone-500 text-[10px]">Provide the category detail of the book.</h1>
            </header>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
            <select className={` bg-white border border-stone-300 p-2 rounded-lg text-gray-500 text-[10px] mt-2`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
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

