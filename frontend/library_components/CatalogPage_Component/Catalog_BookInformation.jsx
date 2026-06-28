
const Catalog_BookInformation = ({
    type,
    category,

    language,
    setLanguage,
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
    fictionSeries,
    setFictionSeries,

    scientificField,
    setScientificField,
    mathBranch,
    setMathBranch,
    technologyField,
    setTechnologyField,
    engineeringDiscipline,
    setEngineeringDiscipline,
    medicalField,
    setMedicalField,

    referenceType,
    setReferenceType,
    dictionaryType,
    setDictionaryType,
    geographicCoverage,
    setGeographicCoverage,

    subject,
    setSubject,
    gradeLevel,
    setGradeLevel,

    researchField,
    setResearchField,
    institution,
    setInstitution,
    doi,
    setDoi,

    businessArea,
    setBusinessArea,
    economicsBranch,
    setEconomicsBranch,
}) => {


    const basicFields = [
    { label: "Language", value: language, set: setLanguage, placeholder: "Select language", type: "select", options: ["English", "Filipino"] },
    { label: "Publication", value: publication, set: setPublication, placeholder: "Enter publication year", type: "number" },
    { label: "Publisher", value: publisher, set: setPublisher, placeholder: "Enter publisher", type: "text" },
    { label: "ISBN", value: isbn, set: setIsbn, placeholder: "Enter ISBN", type: "text" },
    { label: "Edition", value: edition, set: setEdition, placeholder: "Enter edition", type: "text" },
    { label: "Volume", value: volume, set: setVolume, placeholder: "Enter volume", type: "text" },
    ];
    // for Fiction
    const fictionFields = [
        { label: "Fiction Series", value: fictionSeries, set: setFictionSeries, placeholder: "Enter fiction series", type: "text" },
    ];
    // for Non-Fiction
    const scienceFields = [
    {
        label: "Scientific Field",
        value: scientificField,
        set: setScientificField,
        placeholder: "Select scientific field",
        type: "select",
        options: [
            "Biology", "Chemistry", "Physics", "Earth Science",
            "Environmental Science", "Astronomy", "Geology", "Ecology",
            "Marine Science", "Botany", "Zoology", "Microbiology",
            "Biotechnology", "Genetics", "Neuroscience", "Forensic Science", "Other"
        ],
    },
];

const mathematicsFields = [
    {
        label: "Math Branch",
        value: mathBranch,
        set: setMathBranch,
        placeholder: "Select math branch",
        type: "select",
        options: [
            "Algebra", "Geometry", "Trigonometry", "Calculus",
            "Statistics", "Probability", "Discrete Mathematics",
            "Linear Algebra", "Number Theory", "Differential Equations",
            "Topology", "Mathematical Logic", "Applied Mathematics",
            "Pure Mathematics", "Other"
        ],
    },
];

const technologyFields = [
    {
        label: "Technology Field",
        value: technologyField,
        set: setTechnologyField,
        placeholder: "Select technology field",
        type: "select",
        options: [
            "Information Technology", "Computer Science", "Software Development",
            "Web Development", "Mobile Development", "Networking",
            "Cybersecurity", "Cloud Computing", "Database Management",
            "Artificial Intelligence", "Machine Learning", "Data Science",
            "Internet of Things", "Blockchain", "Other"
        ],
    },
];

const engineeringFields = [
    {
        label: "Engineering Discipline",
        value: engineeringDiscipline,
        set: setEngineeringDiscipline,
        placeholder: "Select engineering discipline",
        type: "select",
        options: [
            "Civil Engineering", "Mechanical Engineering", "Electrical Engineering",
            "Computer Engineering", "Chemical Engineering", "Industrial Engineering",
            "Environmental Engineering", "Biomedical Engineering",
            "Aerospace Engineering", "Other"
        ],
    },
];

const medicalFields = [
    {
        label: "Medical Field",
        value: medicalField,
        set: setMedicalField,
        placeholder: "Select medical field",
        type: "select",
        options: [
            "General Medicine", "Anatomy", "Physiology", "Pathology",
            "Pharmacology", "Microbiology", "Immunology", "Biochemistry",
            "Nursing", "Dentistry", "Pharmacy", "Public Health",
            "Pediatrics", "Cardiology", "Neurology", "Oncology",
            "Psychiatry", "Radiology", "Surgery", "Veterinary Medicine", "Other"
        ],
    },
];

const referenceFields = [
    {
        label: "Reference Type",
        value: referenceType,
        set: setReferenceType,
        placeholder: "Select reference type",
        type: "select",
        options: [
            "Handbook", "Manual", "Guide", "Directory",
            "Companion", "Yearbook", "Almanac", "Other"
        ],
    },
];

const atlasFields = [
    {
        label: "Geographic Coverage",
        value: geographicCoverage,
        set: setGeographicCoverage,
        placeholder: "Enter geographic coverage",
        type: "text",
    },
]

const dictionaryFields = [
    {
        label: "Dictionary Type",
        value: dictionaryType,
        set: setDictionaryType,
        placeholder: "Select dictionary type",
        type: "select",
        options: [
            "General", "Bilingual", "Multilingual", "Technical",
            "Medical", "Legal", "Business", "Science", "Other"
        ],
    },
]

const textbookFields = [
    {
        label: "Subject",
        value: subject,
        set: setSubject,
        placeholder: "Enter subject",
        type: "text",
        
    },
    {
        label: "Grade Level",
        value: gradeLevel,
        set: setGradeLevel,
        placeholder: "Select grade level",
        type: "select",
        options: [
            "Elementary",
            "Junior High School",
            "Senior High School",
            "College",
            "Graduate School",
            "Professional"
        ],
    },
];

const researchFields = [
    {
        label: "Research Field",
        value: researchField,
        set: setResearchField,
        placeholder: "Select research field",
        type: "text",
        
    },
    {
        label: "Institution",
        value: institution,
        set: setInstitution,
        placeholder: "Enter institution",
        type: "text",
    },
    {
        label: "DOI",
        value: doi,
        set: setDoi,
        placeholder: "Enter DOI",
        type: "text",
    },
];

const businessFields = [
    {
        label: "Business Area",
        value: businessArea,
        set: setBusinessArea,
        placeholder: "Enter business area",
        type: "text",
        
    },
    {
        label: "Economics Branch",
        value: economicsBranch,
        set: setEconomicsBranch,
        placeholder: "Select economics branch",
        type: "select",
        options: [
            "Microeconomics", "Macroeconomics", "International Economics",
            "Development Economics", "Behavioral Economics",
            "Financial Economics", "Labor Economics",
            "Environmental Economics", "Agricultural Economics", "Other"
        ],
    },
];

let fields = [...basicFields];

if (type.toLowerCase() === "fiction") {
    fields.push(...fictionFields);
}

switch (category.toLowerCase()) {
    case "science":
        fields.push(...scienceFields);
        break;

    case "mathematics":
        fields.push(...mathematicsFields);
        break;

    case "technology":
        fields.push(...technologyFields);
        break;

    case "engineering":
        fields.push(...engineeringFields);
        break;

    case "medical":
        fields.push(...medicalFields);
        break;

    case "reference":
        fields.push(...referenceFields);
        break;
    
    case "dictionary":
        fields.push(...dictionaryFields);
        break;

    case "atlas":
        fields.push(...atlasFields);
        break;

    case "textbook":
        fields.push(...textbookFields);
        break;

    case "research":
        fields.push(...researchFields);
        break;

    case "business":
        fields.push(...businessFields);
        break;

    default:
        break;
}

    return(
    <div className="w-full grid grid-cols-3 gap-4">
        {fields.map((field) => (
    <div key={field.label} className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">
            {field.label}
        </label>

        {field.type === "select" ? (
            <select
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="h-12 border border-gray-300 rounded-lg px-3 outline-none"
            >
                <option value="">
                    {field.placeholder}
                </option>

                {field.options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={field.type}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => field.set(e.target.value)}
                className="h-12 border border-gray-300 rounded-lg px-3 outline-none"
            />
        )}
    </div>
))}
    </div>
    )
}
export default Catalog_BookInformation