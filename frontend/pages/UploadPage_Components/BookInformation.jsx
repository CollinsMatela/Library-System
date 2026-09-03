
import { TextAlignCenter } from "lucide-react";

const BookInformation = ({
    // Basic Information
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
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
    return (
        <div className="w-full flex flex-col gap-4 my-4">

            {/* Header */}
            <div className="flex gap-2 items-center">
                <div className="p-2 rounded-full text-stone-500 bg-stone-200 flex justify-center items-center">
                    <TextAlignCenter size={20} />
                </div>

                <div>
                    <h1 className="text-stone-600 text-sm font-bold">
                        Book Information
                    </h1>

                    <p className="text-stone-500 text-xs">
                        Input the applicable information about the book.
                    </p>
                </div>
            </div>


            {/* ================= BASIC INFORMATION ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Basic Information
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Provide the basic details of the book.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Title"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Author */}
                    <input
                        type="text"
                        placeholder="Author"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    {/* Language */}
                    <select
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
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

                    {/* Publisher */}
                    <input
                        type="text"
                        placeholder="Publisher"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    />

                    {/* ISBN */}
                    <input
                        type="text"
                        placeholder="ISBN"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />

                </div>
            </div>


            {/* ================= PUBLICATION DETAILS ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Publication Details
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Provide the publication information of the book.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* Publication Year */}
                    <input
                        type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        placeholder="Publication Year"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={publication}
                        onChange={(e) => setPublication(e.target.value)}
                    />

                    {/* Edition */}
                    <input
                        type="text"
                        placeholder="Edition"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                    />

                    {/* Volume */}
                    <input
                        type="text"
                        placeholder="Volume"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                    />

                </div>
            </div>


            {/* ================= CLASSIFICATION & INVENTORY ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Classification & Inventory
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Provide the classification and inventory details.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* DDC */}
                    <input
                        type="text"
                        placeholder="DDC Classification"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={ddc}
                        onChange={(e) => setDdc(e.target.value)}
                    />

                    {/* Call Number */}
                    <input
                        type="text"
                        placeholder="Call Number"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={callNumber}
                        onChange={(e) => setCallNumber(e.target.value)}
                    />

                    {/* Copies */}
                    <input
                        type="number"
                        min={1}
                        placeholder="Number of Copies"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                    />

                    {/* Donated From */}
                    <input
                        type="text"
                        placeholder="Donated From"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={donatedFrom}
                        onChange={(e) => setDonatedFrom(e.target.value)}
                    />

                    {/* Received Date */}
                    <input
                        type="date"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={receivedDate}
                        onChange={(e) => setReceivedDate(e.target.value)}
                    />

                </div>
            </div>


            {/* ================= FICTION DETAILS ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Literature Details
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Provide additional information for literature books.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* Illustrator */}
                    <input
                        type="text"
                        placeholder="Illustrator"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={illustrator}
                        onChange={(e) => setIllustrator(e.target.value)}
                    />

                    {/* Series */}
                    <input
                        type="text"
                        placeholder="Series"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                    />

                </div>
            </div>


            {/* ================= DESCRIPTION ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Description
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Provide a short description of the book.
                    </p>
                </div>

                <textarea
                    placeholder="Description"
                    className="w-full bg-white border border-stone-300 p-3 rounded-lg text-stone-600 text-xs resize-none min-h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

        </div>
    );
};

export default BookInformation;

