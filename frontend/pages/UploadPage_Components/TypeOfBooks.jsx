
const TypeOfBooks = ({selectedTypeOfBooks, setSelectedTypeOfBooks, selectedCategoryOfBook, setSelectedCategoryOfBook}) => {
    return(
        <div className="w-full">
            <h2 className="text-lg font-bold text-gray-500 rounded-full">Select Type of Books</h2>
            <p className="text-gray-400 text-sm">Choose Kind of Books you wanted to upload</p>
            <select className="bg-gray-100 h-12 w-full rounded-md text-gray-500 mt-4" value={selectedTypeOfBooks} onChange={(e) => setSelectedTypeOfBooks(e.target.value)}>
                <option value="">Type of Books</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
            </select>
            {/* Fiction */}
            <select className={`${selectedTypeOfBooks.toLowerCase() === 'fiction' ? "" : "hidden"} bg-gray-100 h-12 w-full rounded-md text-gray-500 mt-4`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
                <option value="">Type of {selectedTypeOfBooks}</option>
                <option value="fiction">Fantasy</option>
                <option value="non-fiction">Science Fiction</option>
                <option value="non-fiction">Mystery</option>
                <option value="workbook">Thriller</option>
                <option value="childrensbook">Horror</option>
                <option value="storybook">Romance</option>
                <option value="referencebook">Historical Fiction</option>
                <option value="educationalbook">Adventure</option>
                <option value="educationalbook">Action</option>
                <option value="educationalbook">Drama</option>
                <option value="educationalbook">Humor</option>
                <option value="educationalbook">Fairy Tales</option>
                <option value="educationalbook">Myth</option>
                <option value="educationalbook">Legends</option>
                <option value="educationalbook">Fables</option>
                <option value="educationalbook">Folk Tales</option>
                <option value="educationalbook">Young Adult</option>
                <option value="educationalbook">Children's Fiction</option>
                <option value="educationalbook">Literary Fiction</option>
                <option value="educationalbook">Contemporary Fiction</option>
                <option value="educationalbook">Crime Fiction</option>
                <option value="educationalbook">Graphic Novels</option>
                <option value="educationalbook">Short Stories</option>
            </select>

            {/* Non-Fiction */}
            <select className={`${selectedTypeOfBooks.toLowerCase() === 'non-fiction' ? "" : "hidden"} bg-gray-100 h-12 w-full rounded-md text-gray-500 mt-4`} value={selectedCategoryOfBook} onChange={(e) => setSelectedCategoryOfBook(e.target.value)}>
                <option value="">Type of {selectedTypeOfBooks}</option>
                <option value="fiction">Biography</option>
                <option value="non-fiction">Autobiography</option>
                <option value="non-fiction">Memoir</option>
                <option value="workbook">History</option>
                <option value="childrensbook">Science</option>
                <option value="storybook">Reference</option>
                <option value="referencebook">Essay</option>
                <option value="educationalbook">Text Books</option>
                <option value="educationalbook">Research</option>
            </select>
        </div>
    )
}
export default TypeOfBooks