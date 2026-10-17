import { TextAlignCenter, User } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { categories, gradeLevels, subjects } from "../../mockdata";
const TypeOfBooks = ({selectedCategoryOfBook, setSelectedCategoryOfBook,
                      subject, setSubject, gradeLevel, setGradeLevel
}) => {

    const renderCategoryFields = () => {
    
if (selectedCategoryOfBook.toLowerCase() === "textbook") {
    return (
        <>
            <div className="w-full">
            <h1 className="text-[10px] font-medium text-stone-500">Subject <span className="text-red-500">*</span></h1>
            <select
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-[10px] outline-none w-full"
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
            </div>
            <div className="w-full">
            <h1 className="text-[10px] font-medium text-stone-500">Grade Level <span className="text-red-500">*</span></h1>
            <select
                className="bg-white border border-stone-300 p-2 rounded-lg text-stone-500 text-[10px] w-full outline-none"
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
            </div>
        </>
    );
}


    return null;
};

    return(
        <div className="bg-white w-full flex flex-col">

            <header className="mb-2">
                    <h1 className="text-stone-800 text-xs font-medium">Category Details</h1>
                    <h1 className="text-stone-500 text-[10px]">Provide the category detail of the book.</h1>
            </header>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">

            <div className="w-full">
            <h1 className="text-[10px] font-medium text-stone-500">Category <span className="text-red-500">*</span></h1>
            <select className={` bg-white border border-stone-300 p-2 rounded-lg text-gray-500 text-[10px] w-full outline-none`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
                <option value="">Select book categories</option>
                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>
            </div>

            {renderCategoryFields()}
            </div>
        </div>
    )
}
export default TypeOfBooks

