const NonFictionBookInformation = ({
    // Basic Information
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    language,
    setLanguage,
    publication,
    setPublication,
    publisher,
    setPublisher,
    isbn,
    setIsbn,

    // Non-Fiction Information
    edition,
    setEdition,
    volume,
    setVolume,
    ddc,
    setDdc,
    copies,
    setCopies,
    callNumber,
    setCallNumber,
    availableAt,
    setAvailableAt,
}) => {
    return (
        <div className="w-full flex flex-col gap-4">

            <div>
                <h2 className="text-lg font-bold text-gray-500">
                    Non-Fiction Book Information
                </h2>
                <p className="text-sm text-gray-400">
                    Fill in the book information below.
                </p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-3 gap-2">

                <input
                    type="text"
                    placeholder="Title"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <select
                    className="h-12 border border-gray-300 bg-white outline-none text-gray-500 p-2 rounded-lg"
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
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />

                <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Publication Year (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="ISBN (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />

            </div>

            <textarea
                placeholder="Description (Optional)"
                className="h-24 border border-gray-300 outline-none p-2 rounded-lg resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Additional Information */}
            <div className="grid grid-cols-3 gap-2">

                <input
                    type="text"
                    placeholder="Edition (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Volume (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="DDC Classification (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={ddc}
                    onChange={(e) => setDdc(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Number of Copies (Optional)"
                    min={0}
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Call Number (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={callNumber}
                    onChange={(e) => setCallNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Available At (Optional)"
                    className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                    value={availableAt}
                    onChange={(e) => setAvailableAt(e.target.value)}
                />

            </div>

        </div>
    );
};

export default NonFictionBookInformation;