
const Catalog_TypeOfBooks = ({type, setType, category, setCategory}) => {
    return(
    <div className='w-full grid grid-cols-3 gap-2'>
            <div>
                <p className="text-xs font-medium text-gray-500">Type</p>
                <select className='w-full px-4 py-2 bg-gray-100 rounded-xl outline-none'
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
                    className='w-full px-4 py-2 bg-gray-100 rounded-xl outline-none'
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
                    <option value="Short Stories">Short Stories</option>
                </select>
            </div>

            <div className={`${type.toLowerCase() === 'non-fiction' ? "" : "hidden"}`}>
                <p className="text-sm font-medium text-gray-600">Category</p>
                <select className='w-fit px-4 py-2 bg-gray-100 rounded-xl outline-none' 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Type of Non-Fiction Category</option>
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
export default Catalog_TypeOfBooks