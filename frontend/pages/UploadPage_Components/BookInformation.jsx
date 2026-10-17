
const BookInformation = ({
    // Basic Information
    title,
    setTitle,
    author,
    setAuthor,
    language,
    setLanguage,

    // Publication
    publication,
    setPublication,
    publisher,
    setPublisher,
    isbn,
    setIsbn,
    edition,
    setEdition,
    volume,
    setVolume,

    // Inventory
    copies,
    setCopies,
    callNumber,
    setCallNumber,
    donatedFrom,
    setDonatedFrom,
    receivedDate,
    setReceivedDate,

    // Classification
    ddc,
    setDdc,

    // Fiction
    illustrator,
    setIllustrator,
    series,
    setSeries,
}) => {
    
    const textFieldClass = "w-full outline-none bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-[10px]";
    const textField = (label, type, placeholder, className = textFieldClass, value, onChange, isRequired = false) => {
          return(
            <div className="w-full">
                <h1 className="text-[10px] font-medium text-stone-500">{label}  <span className="text-red-500">{isRequired && ("*")}</span></h1>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={className}
                    value={value}
                    onChange={onChange}
                />
            </div>
          )
    }
    return (
        <div className="w-full grid grid-cols-1 gap-4 my-4">

            {/* ================= BASIC INFORMATION ================= */}
            <div className="bg-white w-full flex flex-col gap-2">

                <div>
                    <h2 className="text-stone-800 text-xs font-medium">
                        Book Information
                    </h2>

                    <p className="text-stone-500 text-[10px]">
                        Provide the title and other information of the book.
                    </p>
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* Title */}
                    {textField('Title','text', 'e.g Harry Potter', textFieldClass, title, (e) => setTitle(e.target.value), true)}
                    {textField('Author','text', 'e.g J.K Rowling (if applicable)', textFieldClass, author, (e) => setAuthor(e.target.value))}
                    {textField('Illustrator','text', 'e.g Quentin Blake (if applicable)', textFieldClass, illustrator, (e) => setIllustrator(e.target.value))}
                    

                    {/* Language */}
                    <div className="w-full">
                    <h1 className="text-[10px] font-medium text-stone-500">Language <span className="text-red-500">*</span></h1>
                    <select
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-[10px] w-full outline-none"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="">
                            Select Language
                        </option>

                        <option value="english">
                            English
                        </option>

                        <option value="filipino">
                            Filipino
                        </option>

                        <option value="english & filipino">
                            English & Filipino
                        </option>
                    </select>
                    </div>

                    {textField('Series','text', 'e.g J.K Rowling (if applicable)', textFieldClass, series, (e) => setSeries(e.target.value))}
                    {textField('Publisher','text', 'e.g Quentin Blake (if applicable)', textFieldClass, publisher, (e) => setPublisher(e.target.value))}
                    
                    <div className="w-full">
                    <h1 className="text-[10px] font-medium text-stone-500">Publication Year</h1>
                    <input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Publication Year (if applicable)"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-[10px] w-full outline-none"
                        value={publication}
                        onChange={(e) => setPublication(e.target.value)}
                    />
                    </div>
                    
                    {textField('ISBN','text', 'e.g 971-XXX-XXX (if applicable)', textFieldClass, isbn, (e) => setIsbn(e.target.value))}
                    {textField('Edition','text', 'e.g First Edition (if applicable)', textFieldClass, edition, (e) => setEdition(e.target.value))}
                    {textField('Volume','text', 'e.g Volume I, Ver 1 (if applicable)', textFieldClass, volume, (e) => setVolume(e.target.value))}

                </div>
            </div>


            {/* ================= CLASSIFICATION & INVENTORY ================= */}
            <div className="bg-white w-full flex flex-col gap-2">

                <div>
                    <h2 className="text-stone-800 text-xs font-medium">
                        Classification & Inventory
                    </h2>

                    <p className="text-stone-500 text-[10px]">
                        Provide the classification and inventory details.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {textField('DDC','text', 'e.g 005', textFieldClass, ddc, (e) => setDdc(e.target.value))}
                    {textField('Call Number','text', 'PL 005 AR 1', textFieldClass, callNumber, (e) => setCallNumber(e.target.value))}

                    {/* Copies */}

                    <div className="w-full">
                    <h1 className="text-[10px] font-medium text-stone-500">No. of Copies<span className="text-red-500">*</span></h1>
                    <input
                        type="number"
                        min={1}
                        placeholder="Number of Copies"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-[10px] w-full outline-none"
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                    />
                    </div>

                    {/* Donated From */}
                    {textField('Donated From','text', 'e.g National Library (if applicable)', textFieldClass, donatedFrom, (e) => setDonatedFrom(e.target.value))}

                    {/* Received Date */}
                    <div className="w-full">
                    <h1 className="text-[10px] font-medium text-stone-500">Received Date</h1>
                     <input
                        type="date"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-[10px] w-full outline-none"
                        value={receivedDate || ""}
                        onChange={(e) => setReceivedDate(e.target.value)}
                    />   
                    </div>
                    

                </div>
            </div>

        </div>
    );
};

export default BookInformation;

