import { useEffect, useState } from "react";

const NonFictionBookInformation = ({
    
    // Category
    selectedCategoryOfBook,
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
    availability,
    setAvailability,

    // Science
    scientificField,
    setScientificField,

    // Math
    mathBranch,
    setMathBranch,

    // Technology
    technologyField,
    setTechnologyField,

    // Engineering
    engineeringDiscipline,
    setEngineeringDiscipline,

    // Medical
    medicalField,
    setMedicalField,

    // Reference
    referenceType,
    setReferenceType,

    // Encyclopedia
    subjectArea,
    setSubjectArea,

    // Dictionary
    dictionaryType,
    setDictionaryType,

    // Atlas
    geographicCoverage,
    setGeographicCoverage,

    // Textbook
    subject,
    setSubject,
    gradeLevel,
    setGradeLevel,

    // Research
    researchField,
    setResearchField,
    institution,
    setInstitution,
    doi,
    setDoi,

    // Business
    businessArea,
    setBusinessArea,

    // Economics
    economicsBranch,
    setEconomicsBranch,

    // Common Non-Fiction
    edition,
    setEdition,
    volume,
    setVolume,

    // Validation
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

    useEffect(() => {
        console.log(selectedCategoryOfBook)
    }, [])

    const renderCategoryFields = () => {
    if (selectedCategoryOfBook.toLowerCase() === "science") {
        return (
            <select
                className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
                value={scientificField}
                onChange={(e) => setScientificField(e.target.value)}
            >
                <option value="">Scientific Field (Optional)</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Earth Science">Earth Science</option>
                <option value="Environmental Science">Environmental Science</option>
                <option value="Astronomy">Astronomy</option>
                <option value="Geology">Geology</option>
                <option value="Ecology">Ecology</option>
                <option value="Marine Science">Marine Science</option>
                <option value="Botany">Botany</option>
                <option value="Zoology">Zoology</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Genetics">Genetics</option>
                <option value="Neuroscience">Neuroscience</option>
                <option value="Forensic Science">Forensic Science</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "mathematics") {
        return (
            <select
                className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
                value={mathBranch}
                onChange={(e) => setMathBranch(e.target.value)}
            >
                <option value="">Math Branch (Optional)</option>
                <option value="Algebra">Algebra</option>
                <option value="Geometry">Geometry</option>
                <option value="Trigonometry">Trigonometry</option>
                <option value="Calculus">Calculus</option>
                <option value="Statistics">Statistics</option>
                <option value="Probability">Probability</option>
                <option value="Discrete Mathematics">Discrete Mathematics</option>
                <option value="Linear Algebra">Linear Algebra</option>
                <option value="Number Theory">Number Theory</option>
                <option value="Differential Equations">Differential Equations</option>
                <option value="Topology">Topology</option>
                <option value="Mathematical Logic">Mathematical Logic</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
                <option value="Pure Mathematics">Pure Mathematics</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "technology") {
        return (
            <select
                value={technologyField}
                onChange={(e) => setTechnologyField(e.target.value)}
                className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
            >
                <option value="">Select Technology Field</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Development">Software Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Networking">Networking</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Database Management">Database Management</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="Internet of Things">Internet of Things</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "engineering") {
        return (
            <select
                value={engineeringDiscipline}
                onChange={(e) => setEngineeringDiscipline(e.target.value)}
                className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
            >
                <option value="">Select Engineering Discipline</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Industrial Engineering">Industrial Engineering</option>
                <option value="Environmental Engineering">Environmental Engineering</option>
                <option value="Biomedical Engineering">Biomedical Engineering</option>
                <option value="Aerospace Engineering">Aerospace Engineering</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "medicine") {
        return (
            <select
                className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
                value={medicalField}
                onChange={(e) => setMedicalField(e.target.value)}
            >
                <option value="">Medical Field (Optional)</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Anatomy">Anatomy</option>
                <option value="Physiology">Physiology</option>
                <option value="Pathology">Pathology</option>
                <option value="Pharmacology">Pharmacology</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Immunology">Immunology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Nursing">Nursing</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Public Health">Public Health</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Radiology">Radiology</option>
                <option value="Surgery">Surgery</option>
                <option value="Veterinary Medicine">Veterinary Medicine</option>
                <option value="Other">Other</option>
            </select>
        );
    }

    if (selectedCategoryOfBook.toLowerCase() === "reference") {
    return (
        <select
            className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
            value={referenceType}
            onChange={(e) => setReferenceType(e.target.value)}
        >
            <option value="">Reference Type (Optional)</option>
            <option value="Handbook">Handbook</option>
            <option value="Manual">Manual</option>
            <option value="Guide">Guide</option>
            <option value="Directory">Directory</option>
            <option value="Companion">Companion</option>
            <option value="Yearbook">Yearbook</option>
            <option value="Almanac">Almanac</option>
            <option value="Other">Other</option>
        </select>
    );
}

if (selectedCategoryOfBook.toLowerCase() === "encyclopedia") {
    return (
        <input
            type="text"
            placeholder="Subject Area (Optional)"
            className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
            value={subjectArea}
            onChange={(e) => setSubjectArea(e.target.value)}
        />
    );
}

if (selectedCategoryOfBook.toLowerCase() === "dictionary") {
    return (
        <select
            className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
            value={dictionaryType}
            onChange={(e) => setDictionaryType(e.target.value)}
        >
            <option value="">Dictionary Type (Optional)</option>
            <option value="General">General</option>
            <option value="Bilingual">Bilingual</option>
            <option value="Multilingual">Multilingual</option>
            <option value="Technical">Technical</option>
            <option value="Medical">Medical</option>
            <option value="Legal">Legal</option>
            <option value="Business">Business</option>
            <option value="Science">Science</option>
            <option value="Other">Other</option>
        </select>
    );
}

if (selectedCategoryOfBook.toLowerCase() === "atlas") {
    return (
        <input
            type="text"
            placeholder="Geographic Coverage (Optional)"
            className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
            value={geographicCoverage}
            onChange={(e) => setGeographicCoverage(e.target.value)}
        />
    );
}

if (selectedCategoryOfBook.toLowerCase() === "textbook") {
    return (
        <>
            <input
                type="text"
                placeholder="Subject (Optional)"
                className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <select
                className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
            >
                <option value="">Grade Level (Optional)</option>
                <option value="Elementary">Elementary</option>
                <option value="Junior High School">Junior High School</option>
                <option value="Senior High School">Senior High School</option>
                <option value="College">College</option>
                <option value="Graduate School">Graduate School</option>
                <option value="Professional">Professional</option>
            </select>
        </>
    );
}

if (selectedCategoryOfBook.toLowerCase() === "research") {
    return (
        <>
            <input
                type="text"
                placeholder="Research Field (Optional)"
                className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                value={researchField}
                onChange={(e) => setResearchField(e.target.value)}
            />

            <input
                type="text"
                placeholder="Institution (Optional)"
                className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
            />

            <input
                type="text"
                placeholder="DOI (Optional)"
                className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
            />
        </>
    );
}

if (selectedCategoryOfBook.toLowerCase() === "business") {
    return (
        <input
            type="text"
            placeholder="Business Area (Optional)"
            className="h-12 border border-gray-300 outline-none p-2 rounded-lg"
            value={businessArea}
            onChange={(e) => setBusinessArea(e.target.value)}
        />
    );
}

if (selectedCategoryOfBook.toLowerCase() === "economics") {
    return (
        <select
            className="h-12 border border-gray-300 bg-white outline-none p-2 rounded-lg text-gray-500"
            value={economicsBranch}
            onChange={(e) => setEconomicsBranch(e.target.value)}
        >
            <option value="">Economics Branch (Optional)</option>
            <option value="Microeconomics">Microeconomics</option>
            <option value="Macroeconomics">Macroeconomics</option>
            <option value="International Economics">International Economics</option>
            <option value="Development Economics">Development Economics</option>
            <option value="Behavioral Economics">Behavioral Economics</option>
            <option value="Financial Economics">Financial Economics</option>
            <option value="Labor Economics">Labor Economics</option>
            <option value="Environmental Economics">Environmental Economics</option>
            <option value="Agricultural Economics">Agricultural Economics</option>
            <option value="Other">Other</option>
        </select>
    );
}

    return null;
};
    return(
        <div className="w-full flex flex-col gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Non-Fiction Book Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required information in the book.</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
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

                        </div>

                        <textarea 
                            placeholder="Description"
                            className={`${isDescription ? "border-red-500" : "border-gray-300"} h-20 border h-10 outline-none p-2 rounded-lg`}
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)
                                              setIsDescription(e.target.value === "");
                            }}
                        />

                        {
                        renderCategoryFields()
                        }

                        <div className="grid grid-cols-3 gap-2">
                        <input type="text" placeholder="isbn" className={`border-gray-300 h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Book Edition (Optional)"}
                        value={edition} 
                        onChange={(e) => {setEdition(e.target.value);
                        }}/>
                        <input type="text" placeholder="isbn" className={`border-gray-300 h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Book Volume (Optional)"}
                        value={volume} 
                        onChange={(e) => {setVolume(e.target.value);
                        }}/>
                        </div>

                        
        </div>
    )
}
export default NonFictionBookInformation