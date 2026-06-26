
const FictionBookInformation = ({
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
    fictionSeries,
    setFictionSeries,
    fictionEdition,
    setFictionEdition,
    fictionVolume,
    setFictionVolume,
    isFictionSeries,
    setIsFictionSeries,
    isFictionEdition,
    setIsFictionEdition,
    isFictionVolume,
    setIsFictionVolume,
    isTitle,
    setIsTitle,
    isAuthor,
    setIsAuthor,
    isDescription,
    setIsDescription,
    isGradeCategory,
    setIsGradeCategory,
    isLanguage,
    setIsLanguage,
    isPublication,
    setIsPublication,
    isPublisher,
    setIsPublisher,
    isIsbn,
    setIsIsbn,
}) => {
    return(
        <div className="w-full flex flex-col gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Fiction Book Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required information in the book.</p>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            <input type="text" placeholder="Title" className={`${isTitle ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`} 
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value); 
                                          setIsTitle(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Author" className={`${isAuthor ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`} 
                        value={author} 
                        onChange={(e) => {setAuthor(e.target.value);
                                          setIsAuthor(e.target.value === "");
                        }}/>

                        <select
                            className={`${isLanguage ? "border-red-300" : "border-gray-300"} h-12 border bg-white outline-none text-gray-500 p-2 rounded-lg`}
                            value={language}
                            onChange={(e) => {setLanguage(e.target.value)
                                              setIsLanguage(e.target.value === "")
                            }}
                        >
                            <option value="">Select Language</option>
                            <option value="english">English</option>
                            <option value="filipino">Filipino</option>
                            
                        </select>

                        <input type="text" placeholder="publisher" className={`${isPublisher ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        placeholder={"Publisher"}
                        value={publisher} 
                        onChange={(e) => {setPublisher(e.target.value);
                                          setIsPublisher(e.target.value === "");
                        }}/>

                       <input
                            type="number"
                            name="publication-year"
                            id="publication-year"
                            min="1900"
                            max={new Date().getFullYear()}
                            placeholder="Publication Year"
                            value={publication}
                            className={`${isPublication ? "border-red-300" : "border-gray-300"} h-12 border bg-white outline-none text-gray-500 p-2 rounded-lg`}
                            onChange={(e) => {
                                setPublication(e.target.value);
                                setIsPublication(e.target.value === "");
                            }}
                        />

                         <input type="text" placeholder="isbn" className={`${isIsbn ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"ISBN"}
                        value={isbn} 
                        onChange={(e) => {setIsbn(e.target.value);
                                          setIsIsbn(e.target.value === "");
                        }}/>

                        <input type="text" placeholder="Series Name" className={`${isFictionSeries ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Fiction Series"}
                        value={fictionSeries} 
                        onChange={(e) => {setFictionSeries(e.target.value)}}/>
                        
                        <input type="text" placeholder="Story Volume" className={`${isFictionEdition ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Fiction Edition"}
                        value={fictionEdition} 
                        onChange={(e) => {setFictionEdition(e.target.value)}}/>
                        
                        <input type="text" placeholder="Fiction Volume" className={`${isFictionVolume ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Fiction Volume"}
                        value={fictionVolume} 
                        onChange={(e) => {setFictionVolume(e.target.value)}}/>

                        </div>

                        <textarea 
                            placeholder="Description"
                            className={`${isDescription ? "border-red-500" : "border-gray-300"} h-20 border h-10 outline-none p-2 rounded-lg`}
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)
                                              setIsDescription(e.target.value === "");
                            }}
                        />
                        

                        
        </div>
    )
}
export default FictionBookInformation