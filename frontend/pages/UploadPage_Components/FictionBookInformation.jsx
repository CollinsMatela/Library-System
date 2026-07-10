
const FictionBookInformation = ({
    selectedCategoryOfBook,
    title,
    setTitle,

    author,
    setAuthor,

    description,
    setDescription,

    gradeCategory,
    setGradeCategory,

    language,
    setLanguage,

    publication,
    setPublication,

    publisher,
    setPublisher,

    isbn,
    setIsbn,

    availability,
    setAvailability,

    // Library Information
    series,
    setSeries,

    copies,
    setCopies,

    callNumber,
    setCallNumber,

    availableAt,
    setAvailableAt,

    edition,
    setEdition,

    volume,
    setVolume,
}) => {
    return(
                <div className="w-full flex flex-col gap-4">
            <div>
                <h2 className="text-lg font-bold text-gray-500">
                    Fiction Book Information
                </h2>
                <p className="text-sm text-gray-400">
                    Fill up the required information for the book.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

                <input
                    type="text"
                    placeholder="Title "
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <select
                    className="h-12 border border-gray-300 text-gray-500 rounded-lg p-2 bg-white outline-none"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">Select Language (Optional)</option>
                    <option value="english">English</option>
                    <option value="filipino">Filipino</option>
                </select>

                <input
                    type="text"
                    placeholder="Publisher (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />

                <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Publication Year (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="ISBN (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Series Name (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Edition (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Volume (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Number of Copies (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Call Number (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={callNumber}
                    onChange={(e) => setCallNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Available At (Optional)"
                    className="h-12 border border-gray-300 rounded-lg p-2 outline-none"
                    value={availableAt}
                    onChange={(e) => setAvailableAt(e.target.value)}
                />
            </div>

            <textarea
                placeholder="Description (Optional)"
                className="h-28 border border-gray-300 rounded-lg p-2 outline-none resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    )
}
export default FictionBookInformation