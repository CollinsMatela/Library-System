
const Catalog_TypeOfBooks = ({type, setType, category, setCategory, field, setField, gradeLevel, setGradeLevel, subject, setSubject}) => {

    const renderCategoryFields = () => {
    const selectClass =
            "w-full px-4 py-2 bg-white border border-gray-300 rounded-xl outline-none";

        if (category.toLowerCase() === "philosophy & psychology") {
            return (
                <div>
                    <p className="text-xs font-medium text-gray-500">
                        Philosophy & Psychology Field
                    </p>
                    <select
                        className={selectClass}
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                    >
                        <option value="">Select Field</option>
                        <option value="Logic">Logic</option>
                        <option value="Ethics">Ethics</option>
                    </select>
                </div>
            );
        }

        if (category.toLowerCase() === "social sciences") {
            return (
                <div>
                    <p className="text-xs font-medium text-gray-500">
                        Social Science Field
                    </p>
                    <select
                        className={selectClass}
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                    >
                        <option value="">Select Field</option>
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
                </div>
            );
        }

        if (category.toLowerCase() === "technology") {
            return (
                <div>
                    <p className="text-xs font-medium text-gray-500">
                        Technology Field
                    </p>
                    <select
                        className={selectClass}
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                    >
                        <option value="">Select Field</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Home Economics">Home Economics</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            );
        }

        if (category.toLowerCase() === "the arts") {
            return (
                <div>
                    <p className="text-xs font-medium text-gray-500">
                        Arts Field
                    </p>
                    <select
                        className={selectClass}
                        value={field}
                        onChange={(e) => setField(e.target.value)}
                    >
                        <option value="">Select Field</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Sculpture">Sculpture</option>
                        <option value="Drawing">Drawing</option>
                        <option value="Printing & Paintings">Printing & Paintings</option>
                        <option value="Photography">Photography</option>
                        <option value="Music">Music</option>
                        <option value="Recreational & Performing Arts">
                            Recreational & Performing Arts
                        </option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            );
        }

        if (category.toLowerCase() === "textbook") {
            return (
                <>
                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            Subject
                        </p>
                        <input
                            type="text"
                            value={subject}
                            placeholder="Enter subject"
                            onChange={(e) => setSubject(e.target.value)}
                            className={selectClass}
                        />
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            Grade Level
                        </p>
                        <select
                            className={selectClass}
                            value={gradeLevel}
                            onChange={(e) => setGradeLevel(e.target.value)}
                        >
                            <option value="">Select Grade Level</option>
                            <option value="Grade 1">Grade 1</option>
                            <option value="Grade 2">Grade 2</option>
                            <option value="Grade 3">Grade 3</option>
                            <option value="Grade 4">Grade 4</option>
                            <option value="Grade 5">Grade 5</option>
                            <option value="Grade 6">Grade 6</option>
                            <option value="Secondary / Tertiary">
                                Secondary / Tertiary
                            </option>
                        </select>
                    </div>
                </>
            );
        }

        return null;
    };

    return(
    <div className='w-full grid grid-cols-3 gap-2'>
            <div>
                <p className="text-xs font-medium text-gray-500">Type</p>
                <select className='w-full px-4 py-2 bg-white border border-gray-300 rounded-xl outline-none'
                value={type}
                onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                </select> 
            </div>
            <div className={`${type.toLowerCase() === 'fiction' ? "" : "hidden"}`}>
                <p className="text-xs font-medium text-gray-500">Category</p>
                <select
                    className='w-full px-4 py-2 bg-white bg-white border border-gray-300 rounded-xl outline-none'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Type of Fiction Category</option>
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
            </div>

            <div className={`${type.toLowerCase() === 'non-fiction' ? "" : "hidden"}`}>
                <p className="text-xs font-medium text-gray-500">Category</p>
                <select className='w-full px-4 py-2 bg-white bg-white border border-gray-300 rounded-xl outline-none'
                value={category} 
                onChange={(e) => setCategory(e.target.value)}>
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
            </div>

            {type.toLowerCase() === 'non-fiction' && (renderCategoryFields())}
            
            
        </div>
    )
}
export default Catalog_TypeOfBooks