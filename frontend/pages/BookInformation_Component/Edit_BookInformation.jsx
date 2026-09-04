import { useState, useEffect, useRef } from "react";
import { TextAlignCenter, Pen, Trash, Image, Sparkle, Sparkles, Repeat, PenBox, FilePlay, FileText } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import Confirmation_Popup from "../../popup/Confirmation_Popup";
const Edit_BookInformation = ({bookDetails, setBookDetails, fetchBookById, Summarization, updateBookInformation, showBookInformationConfirmation}) => {

    console.log(bookDetails)

    const [errorMessage, setErrorMessage] = useState("");

    const [selectedPageIndex, setSelectedPageIndex] = useState(null);
    const [selectedNewImage, setSelectedNewImage] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const imageRef = useRef(null);

    const [audio, setAudio] = useState(null);
    const [audioPreview, setAudioPreview] = useState('');
    const audioRef = useRef(null);

    useEffect(() => {
    setImageFile(null);
    },[selectedPageIndex])

    useEffect(() => {
    console.log('bookDetails updated:', bookDetails);
    },[bookDetails])

    return(
        <>

        <div className="w-full flex flex-col gap-4 my-4 px-4 lg:px-10">

            {/* Header */}
            <div className="flex gap-2 items-center">
                <div className="p-2 rounded-full text-stone-500 bg-stone-200 flex justify-center items-center">
                    <TextAlignCenter size={20} />
                </div>

                <div>
                    <h1 className="text-stone-600 text-sm font-bold">
                        Edit Information
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
                        value={bookDetails?.title}
                        onChange={(e) => setBookDetails({...bookDetails, title: e.target.value})}
                    />

                    {/* Author */}
                    <input
                        type="text"
                        placeholder="Author"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.author}
                        onChange={(e) => setBookDetails({...bookDetails, author: e.target.value})}
                    />

                    {/* Language */}
                    <select
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.language}
                        onChange={(e) => setBookDetails({...bookDetails, language: e.target.value})}
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
                        value={bookDetails?.publisher}
                        onChange={(e) => setBookDetails({...bookDetails, publisher: e.target.value})}
                    />

                    {/* ISBN */}
                    <input
                        type="text"
                        placeholder="ISBN"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.isbn}
                        onChange={(e) => setBookDetails({...bookDetails, isbn: e.target.value})}
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
                        value={bookDetails?.publication}
                        onChange={(e) => setBookDetails({...bookDetails, publication: e.target.value})}
                    />

                    {/* Edition */}
                    <input
                        type="text"
                        placeholder="Edition"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.edition}
                        onChange={(e) => setBookDetails({...bookDetails, edition: e.target.value})}
                    />

                    {/* Volume */}
                    <input
                        type="text"
                        placeholder="Volume"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.volume}
                        onChange={(e) => setBookDetails({...bookDetails, volume: e.target.value})}
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
                        value={bookDetails?.ddc}
                        onChange={(e) => setBookDetails({...bookDetails, ddc: e.target.value})}
                    />

                    {/* Call Number */}
                    <input
                        type="text"
                        placeholder="Call Number"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.callNumber}
                        onChange={(e) => setBookDetails({...bookDetails, callNumber: e.target.value})}
                    />

                    {/* Copies */}
                    <input
                        type="number"
                        min={1}
                        placeholder="Number of Copies"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.copies}
                        onChange={(e) => setBookDetails({...bookDetails, copies: e.target.value})}
                    />

                    {/* Donated From */}
                    <input
                        type="text"
                        placeholder="Donated From"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.donatedFrom}
                        onChange={(e) => setBookDetails({...bookDetails, donatedFrom: e.target.value})}
                    />

                    {/* Received Date */}
                    <input
                        type="date"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={
                            bookDetails?.receivedDate
                                ? new Date(bookDetails.receivedDate).toISOString().split("T")[0]
                                : ""
                        }
                        onChange={(e) => setBookDetails({...bookDetails, receivedDate: e.target.value})}
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
                        value={bookDetails?.illustrator}
                        onChange={(e) => setBookDetails({...bookDetails, illustrator: e.target.value})}
                    />

                    {/* Series */}
                    <input
                        type="text"
                        placeholder="Series"
                        className="bg-white border border-stone-300 p-2 rounded-lg text-stone-600 text-xs"
                        value={bookDetails?.series}
                        onChange={(e) => setBookDetails({...bookDetails, series: e.target.value})}
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
                    value={bookDetails?.description}
                    onChange={(e) => setBookDetails({...bookDetails, description: e.target.value})}
                />

            </div>

            {/* ================= AI Summarization ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div className="w-full flex justify-between items-center">
                    <div>
                       <h2 className="text-stone-700 text-sm font-bold">
                        Literature Summary
                        </h2>

                        <p className="text-stone-500 text-xs">
                            AI-Powered literature summary.
                        </p> 
                    </div>

                    <button className="bg-stone-200 justify-center items-center flex text-xs text-stone-500 gap-1 border border-stone-500 p-2 rounded-lg">
                        <Sparkles size={15}/> Generate Summary
                    </button>
                    
                </div>

                <textarea
                    placeholder="Literature Summary"
                    className="w-full bg-white border border-stone-300 p-3 rounded-lg text-stone-600 text-xs resize-none min-h-24"
                    value={bookDetails?.moral}
                    onChange={(e) => setBookDetails({...bookDetails, moral: e.target.value})}
                />

            </div>
            {/* // Save Button */}
            <div className="w-full justify-end items-center flex mt-4">
            <button className="justify-center items-center flex gap-2 bg-green-600 p-2 text-xs text-white font-bold hover:-translate-y-1 cursor-pointer"
            onClick={showBookInformationConfirmation}
            >
                <Pen size={15}/> Save Information 
            </button>
            </div>
        </div>
        </>
    )
}
export default Edit_BookInformation;