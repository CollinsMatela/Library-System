
const TypeOfBooks = ({selectedTypeOfBooks, setSelectedTypeOfBooks, selectedCategoryOfBook, setSelectedCategoryOfBook}) => {
    return(
        <div className="w-full">
            <h2 className="text-lg font-bold text-gray-500 rounded-full">Select Type of Books</h2>
            <p className="text-gray-400 text-sm">Choose Kind of Books you wanted to upload</p>

            <div className="w-full flex gap-2">
            <select className="bg-white border-1 border-gray-300 h-12 w-fit rounded-md text-gray-500 mt-4 px-2" value={selectedTypeOfBooks} onChange={(e) => setSelectedTypeOfBooks(e.target.value)}>
                <option value="">Type of Books</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
            </select>
            {/* Fiction */}
            {/* Fiction */}
            <select
                className={`${selectedTypeOfBooks.toLowerCase() === 'fiction' ? "" : "hidden"} bg-white border-1 border-gray-300 h-12 w-fit rounded-md text-gray-500 mt-4 px-2`}
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
                <option value="Short Stories">Short Stories</option>
            </select>

            {/* Non-Fiction */}
            <select className={`${selectedTypeOfBooks.toLowerCase() === 'non-fiction' ? "" : "hidden"} bg-white border-1 border-gray-300 h-12 w-fit rounded-md text-gray-500 mt-4 px-2`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
                <option value="">Type of Non-Fiction</option>
                <option value="Biography">Biography</option>
                <option value="Autobiography">Autobiography</option>
                <option value="Memoir">Memoir</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Technology">Technology</option>
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
                <option value="Philosophy">Philosophy</option>
                <option value="Politics">Politics</option>
                <option value="Economics">Economics</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
            </select>
            </div>
        </div>
    )
}
export default TypeOfBooks