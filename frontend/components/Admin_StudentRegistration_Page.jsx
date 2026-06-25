import {useEffect, useState } from "react";
import axios from "axios";
import Confirmation_Popup from "../popup/Confirmation_Popup"
import Account_Popup from "../popup/Account_Conformation"
import Admin_SideBar from "./Admin_Sidebar";

const Admin_StudentRegistration_Page = ({ reFetchStudent, closeStudentModal}) => {
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showAccountPopup, setShowAccountPopup] = useState(false);

    const [newStudent, setNewStudent] = useState(null);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [extensionname, setExtensionName] = useState("");

    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [motherTongue, setMotherTongue] = useState("");
    const [disability, setDisability] = useState("");

    // Current Address
    const [currentAddressHouseNo, setCurrentAddressHouseNo] = useState('');
    const [currentStreetName, setCurrentStreetName] = useState('');
    const [currentBarangay, setCurrentBarangay] = useState('');
    const [currentMunicipality, setCurrentMunicipality] = useState('');
    const [currentProvince, setCurrentProvince] = useState('');
    const [currentCountry, setCurrentCountry] = useState('');
    const [currentZipCode, setCurrentZipCode] = useState('');

    // Permanent Address
    const [permanentAddressHouseNo, setPermanentAddressHouseNo] = useState('');
    const [permanentStreetName, setPermanentStreetName] = useState('');
    const [permanentBarangay, setPermanentBarangay] = useState('');
    const [permanentMunicipality, setPermanentMunicipality] = useState('');
    const [permanentProvince, setPermanentProvince] = useState('');
    const [permanentCountry, setPermanentCountry] = useState('');
    const [permanentZipCode, setPermanentZipCode] = useState('');

   // Father Information
    const [fatherLastname, setFatherLastname] = useState('');
    const [fatherFirstname, setFatherFirstname] = useState('');
    const [fatherMiddlename, setFatherMiddlename] = useState('');
    const [fatherContact, setFatherContact] = useState('');

    // Mother Information
    const [motherLastname, setMotherLastname] = useState('');
    const [motherFirstname, setMotherFirstname] = useState('');
    const [motherMiddlename, setMotherMiddlename] = useState('');
    const [motherContact, setMotherContact] = useState('');

    // Legal Guardian Information
    const [legalLastname, setLegalLastname] = useState('');
    const [legalFirstname, setLegalFirstname] = useState('');
    const [legalMiddlename, setLegalMiddlename] = useState('');
    const [legalContact, setLegalContact] = useState('');

    const [gradeLevel, setGradeLevel] = useState('');
    const [branch, setBranch] = useState('');

    const [isLastname, setIsLastname] = useState(false);
    const [isFirstname, setIsFirstname] = useState(false);
    const [isMiddlename, setIsMiddlename] = useState(false);
    const [isYear, setIsYear] = useState(false);
    const [isMonth, setIsMonth] = useState(false);
    const [isDay, setIsDay] = useState(false);
    const [isSex, setIsSex] = useState(false);

    const [isPlaceOfBirth, setIsPlaceOfBirth] = useState(false);
    const [isMotherTongue, setIsMotherTongue] = useState(false);
    const [isDisability, setIsDisability] = useState(false);

    // Current Address Validation
    const [isCurrentAddressHouseNo, setIsCurrentAddressHouseNo] = useState(false);
    const [isCurrentStreetName, setIsCurrentStreetName] = useState(false);
    const [isCurrentBarangay, setIsCurrentBarangay] = useState(false);
    const [isCurrentMunicipality, setIsCurrentMunicipality] = useState(false);
    const [isCurrentProvince, setIsCurrentProvince] = useState(false);
    const [isCurrentCountry, setIsCurrentCountry] = useState(false);
    const [isCurrentZipCode, setIsCurrentZipCode] = useState(false);

    // Permanent Address Validation
    const [isPermanentAddressHouseNo, setIsPermanentAddressHouseNo] = useState(false);
    const [isPermanentStreetName, setIsPermanentStreetName] = useState(false);
    const [isPermanentBarangay, setIsPermanentBarangay] = useState(false);
    const [isPermanentMunicipality, setIsPermanentMunicipality] = useState(false);
    const [isPermanentProvince, setIsPermanentProvince] = useState(false);
    const [isPermanentCountry, setIsPermanentCountry] = useState(false);
    const [isPermanentZipCode, setIsPermanentZipCode] = useState(false);

    // Father Information Validation
    const [isFatherLastname, setIsFatherLastname] = useState(false);
    const [isFatherFirstname, setIsFatherFirstname] = useState(false);
    const [isFatherMiddlename, setIsFatherMiddlename] = useState(false);
    const [isFatherContact, setIsFatherContact] = useState(false);

    // Mother Information Validation
    const [isMotherLastname, setIsMotherLastname] = useState(false);
    const [isMotherFirstname, setIsMotherFirstname] = useState(false);
    const [isMotherMiddlename, setIsMotherMiddlename] = useState(false);
    const [isMotherContact, setIsMotherContact] = useState(false);

    // Legal Guardian Information Validation
    const [isLegalLastname, setIsLegalLastname] = useState(false);
    const [isLegalFirstname, setIsLegalFirstname] = useState(false);
    const [isLegalMiddlename, setIsLegalMiddlename] = useState(false);
    const [isLegalContact, setIsLegalContact] = useState(false);
    
    const [isGradeLevel, setIsGradeLevel] = useState(false);
    const [isBranch, setIsBranch] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const calculateAge = (year, month, day) => {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        return (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
    }

    useEffect(()=> {
        if(year && month && day) {
            setAge(calculateAge(year, month, day));
        }
    },[year, month, day])

    const ErrorChecker = () => {
    let hasError = false;

    // Student Information
    if (!lastname) { setIsLastname(true); hasError = true; }
    if (!firstname) { setIsFirstname(true); hasError = true; }
    if (!middlename) { setIsMiddlename(true); hasError = true; }
    if (!year) { setIsYear(true); hasError = true; }
    if (!month) { setIsMonth(true); hasError = true; }
    if (!day) { setIsDay(true); hasError = true; }
    if (!sex) { setIsSex(true); hasError = true; }

    if(!placeOfBirth) { setIsPlaceOfBirth(true); hasError = true; }
    if(!motherTongue) { setIsMotherTongue(true); hasError = true; }
    if(!disability) { setIsDisability(true); hasError = true; }

    // Current Address
    if (!currentAddressHouseNo) { setIsCurrentAddressHouseNo(true); hasError = true; }
    if (!currentStreetName) { setIsCurrentStreetName(true); hasError = true; }
    if (!currentBarangay) { setIsCurrentBarangay(true); hasError = true; }
    if (!currentMunicipality) { setIsCurrentMunicipality(true); hasError = true; }
    if (!currentProvince) { setIsCurrentProvince(true); hasError = true; }
    if (!currentCountry) { setIsCurrentCountry(true); hasError = true; }
    if (!currentZipCode) { setIsCurrentZipCode(true); hasError = true; }

    // Permanent Address
    if (!permanentAddressHouseNo) { setIsPermanentAddressHouseNo(true); hasError = true; }
    if (!permanentStreetName) { setIsPermanentStreetName(true); hasError = true; }
    if (!permanentBarangay) { setIsPermanentBarangay(true); hasError = true; }
    if (!permanentMunicipality) { setIsPermanentMunicipality(true); hasError = true; }
    if (!permanentProvince) { setIsPermanentProvince(true); hasError = true; }
    if (!permanentCountry) { setIsPermanentCountry(true); hasError = true; }
    if (!permanentZipCode) { setIsPermanentZipCode(true); hasError = true; }

    // Father
    if (!fatherLastname) { setIsFatherLastname(true); hasError = true; }
    if (!fatherFirstname) { setIsFatherFirstname(true); hasError = true; }
    if (!fatherMiddlename) { setIsFatherMiddlename(true); hasError = true; }
    if (!fatherContact) { setIsFatherContact(true); hasError = true; }

    // Mother
    if (!motherLastname) { setIsMotherLastname(true); hasError = true; }
    if (!motherFirstname) { setIsMotherFirstname(true); hasError = true; }
    if (!motherMiddlename) { setIsMotherMiddlename(true); hasError = true; }
    if (!motherContact) { setIsMotherContact(true); hasError = true; }

    // Legal Guardian
    if (!legalLastname) { setIsLegalLastname(true); hasError = true; }
    if (!legalFirstname) { setIsLegalFirstname(true); hasError = true; }
    if (!legalMiddlename) { setIsLegalMiddlename(true); hasError = true; }
    if (!legalContact) { setIsLegalContact(true); hasError = true; }

    // School Information
    if (!gradeLevel) { setIsGradeLevel(true); hasError = true; }
    if (!branch) { setIsBranch(true); hasError = true; }

    // Contact validation
    const contactRegex = /^09\d{9}$/;

    if (fatherContact && !contactRegex.test(fatherContact)) {
        setIsFatherContact(true);
        hasError = true;
    }

    if (motherContact && !contactRegex.test(motherContact)) {
        setIsMotherContact(true);
        hasError = true;
    }

    if (legalContact && !contactRegex.test(legalContact)) {
        setIsLegalContact(true);
        hasError = true;
    }

    return hasError;
};

    const handleConfirmation = () => {
          const itHasError = ErrorChecker();
          if(itHasError) return;
          console.log("Frontend ", motherTongue);

          setShowConfirmationPopup(true);
    }

    const handleAccountInformation = (newAccountDetails) => {
          setNewStudent(newAccountDetails);
          setShowAccountPopup(true);
    }

    const handleStudentRegistration = async () => {

        const studentInformation = {
            // Student Information
            lastname,
            firstname,
            middlename,
            extensionname,

            year,
            month,
            day,
            age,
            sex,
            placeOfBirth,
            motherTongue,
            disability,

            // Current Address
            currentAddressHouseNo,
            currentStreetName,
            currentBarangay,
            currentMunicipality,
            currentProvince,
            currentCountry,
            currentZipCode,

            // Permanent Address
            permanentAddressHouseNo,
            permanentStreetName,
            permanentBarangay,
            permanentMunicipality,
            permanentProvince,
            permanentCountry,
            permanentZipCode,

            // Father Information
            fatherLastname,
            fatherFirstname,
            fatherMiddlename,
            fatherContact,

            // Mother Information
            motherLastname,
            motherFirstname,
            motherMiddlename,
            motherContact,

            // Legal Guardian Information
            legalLastname,
            legalFirstname,
            legalMiddlename,
            legalContact,

            // Enrollment
            gradeLevel,
            branch,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/register-student`,
                studentInformation
            );

            if (res.data.isSuccess) {
                handleAccountInformation(res.data.account);
                reFetchStudent();
            }

        } catch (error) {
            console.log("Error registering student account:", error);
            setErrorMessage(error?.response?.data?.message);
        }
    };
    // For ErrorMessage
    const hasError = isLastname || isFirstname || isMiddlename || isYear || isMonth || isDay || isSex || isPlaceOfBirth || isMotherTongue || isDisability || isFatherLastname || isFatherFirstname || isFatherMiddlename || isFatherContact || isMotherLastname || isMotherFirstname || isMotherMiddlename || isMotherContact || isLegalLastname || isLegalFirstname || isLegalMiddlename || isLegalContact || isGradeLevel || isBranch;

    return(
    <>
        <Admin_SideBar/>
        {showConfirmationPopup && (<Confirmation_Popup errorMessage={errorMessage} onConfirm={handleStudentRegistration} onCancel={() => {setShowConfirmationPopup(false); setErrorMessage("");}} />)}
        {showAccountPopup && (<Account_Popup newAccountDetails={newStudent} closeAccountConfirmation={() => {setShowAccountPopup(false); closeStudentModal()}}/>)}
        <section className="w-full justify-center items-center flex flex-col pl-80 py-10 space-y-10">
               
               <div className="bg-white w-full rounded-xl justify-start items-start flex flex-col gap-4 ">
                    <div className="mx-10 justify-between items-start flex">
                            <div>
                            <h2 className="text-3xl font-bold text-gray-800">Student Registration</h2>
                            <p className="text-gray-400 text-md">Register students allowing them to access the school digital library system</p>
                            </div>
                    </div>
                    
                    <div className="h-150 w-full justify-start items-start grid grid-cols-1 gap-4 p-10">
                        {/* Learner Information */}
                        <h1 className="text-sm font-bold text-gray-500">Student Information</h1>
                        <div className="w-full justify-center items-start grid grid-cols-4 gap-2">
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Last Name" 
                                   className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isLastname ? 'border-red-500' : ''}`} 
                                   value={lastname} 
                                   onChange={(e) => {setLastname(e.target.value);
                                                    if(e.target.value !== "") setIsLastname(false);}
                                   } 
                                   />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="First Name" 
                                   className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isFirstname ? 'border-red-500' : ''}`} 
                                   value={firstname} 
                                   onChange={(e) => {setFirstname(e.target.value);
                                                    if(e.target.value !== "") setIsFirstname(false);}
                                   } 
                                   />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Middle Name" 
                                   className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isMiddlename ? 'border-red-500' : ''}`} 
                                   value={middlename} 
                                   onChange={(e) => {setMiddlename(e.target.value);
                                                    if(e.target.value !== "") setIsMiddlename(false);}
                                   } 
                                   />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Extension Name e.g. Jr., lll (if applicable)</h1>
                            <input type="text" 
                                   placeholder="Extension Name " 
                                   className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4`} 
                                   value={extensionname} 
                                   onChange={(e) => {setExtensionName(e.target.value)}
                                   } 
                                   />
                        </div>
                        
                        <div className="flex flex-col w-full">

                        {/* Date of Birth */}
                        <h1 className="text-xs text-gray-500">Date of Birth <span className="text-red-500">*</span></h1>
                        <div className="w-full grid grid-cols-3 gap-2">

                            
                                <select
                                    className={`border border-gray-300 h-12 flex-1 rounded-xl px-2 text-gray-500 outline-none ${
                                        isYear ? "border-red-500" : ""
                                    }`}
                                    value={year}
                                    onChange={(e) => {
                                        setYear(e.target.value);
                                        if (e.target.value) setIsYear(false);
                                    }}
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: currentYear - 1999 }, (_, index) => {
                                        const year = currentYear - index;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select
                                    className={`border border-gray-300 h-12 flex-1 rounded-xl px-2 text-gray-500 outline-none ${
                                        isMonth ? "border-red-500" : ""
                                    }`}
                                    value={month}
                                    onChange={(e) => {
                                        setMonth(e.target.value);
                                        if (e.target.value) setIsMonth(false);
                                    }}
                                >
                                    <option value="">Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>

                                <select
                                    className={`border border-gray-300 h-12 flex-1 rounded-xl px-2 text-gray-500 outline-none ${
                                        isDay ? "border-red-500" : ""
                                    }`}
                                    value={day}
                                    onChange={(e) => {
                                        setDay(e.target.value);
                                        if (e.target.value) setIsDay(false);
                                    }}
                                >
                                    <option value="">Day</option>
                                    {Array.from({ length: 31 }, (_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            

                            {/* Age */}
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Age"
                                value={age}
                                disabled
                                className="bg-gray-100 h-12 w-full rounded-xl px-4 text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        </div>

                        

                    </div>
                        
                        
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Sex <span className="text-red-500">*</span></h1>
                            <select className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500 ${isSex ? 'border-red-500' : ''}`} 
                                    value={sex} 
                                    onChange={(e) => {setSex(e.target.value)
                                                     if(e.target.value !== "") setIsSex(false);
                                                    }}>
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Place of birth</h1>
                            <input type="text" 
                                   placeholder="Place of birth" 
                                   className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPlaceOfBirth ? 'border-red-500' : ''}`} 
                                   value={placeOfBirth} 
                                   onChange={(e) => {setPlaceOfBirth(e.target.value);
                                                    if(e.target.value !== "") setIsPlaceOfBirth(false);}
                                   } 
                                   />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Mother Tongue <span className="text-red-500">*</span></h1>
                            <select className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500 ${isMotherTongue ? 'border-red-500' : ''}`} 
                                    value={motherTongue} 
                                    onChange={(e) => {setMotherTongue(e.target.value)
                                                     if(e.target.value !== "") setIsMotherTongue(false);
                                                    }}>
                            <option value="">Select Mother Tongue</option>
                            <option value="filipino">Filipino (Tagalog)</option>
                            <option value="english">English</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Disability <span className="text-red-500">*</span></h1>
                            <select className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500 ${isDisability ? 'border-red-500' : ''}`} 
                                    value={disability} 
                                    onChange={(e) => {setDisability(e.target.value)
                                                     if(e.target.value !== "") setIsDisability(false);
                                                    }}>
                            <option value="">Is the student have disability?</option>
                            <option value="">None</option>
                            <option value="visual-impairment-blind">Visual Impairment / a. Blind</option>
                            <option value="visual-impairment-low-vision">Visual Impairment / b. Low Vision</option>
                            <option value="hearing-impairment">Hearing Impairment</option>
                            <option value="autism-spectrum-disorder">Autism Spectrum Disorder</option>
                            <option value="speech-language-disorder">Speech/Language Disorder</option>
                            <option value="learning-disability">Learning Disability</option>
                            <option value="emotional-behavioral-disorder">Emotional-Behavioral Disorder</option>
                            <option value="cerebal-palsy">Cerebal Palsy</option>
                            <option value="intellectual-disability">Intellectual Disability</option>
                            <option value="orthopedic-physical-handicap">Orthopedic/Physical Handicap</option>
                            <option value="special-health-problem-chronic-disease-cancer">Special Health Problem/Chronic Disease / a. Cancer</option>
                            
                            </select>
                        </div>
                        
                    </div>

                    {/* Home Address Information */}
                    <h1 className="text-sm font-bold text-gray-500">Address Information</h1>

                    {/* Current Address */}
                    <h2 className="text-sm font-semibold text-gray-500 mt-2">Current Address</h2>
                    <div className="h-full w-full grid grid-cols-4 gap-2">

                        <div>
                            <h1 className="text-xs text-gray-500">House Number <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="House Number"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentAddressHouseNo ? 'border-red-500' : ''}`}
                                value={currentAddressHouseNo}
                                onChange={(e) => {
                                    setCurrentAddressHouseNo(e.target.value);
                                    if (e.target.value !== "") setIsCurrentAddressHouseNo(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Street Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Street Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentStreetName ? 'border-red-500' : ''}`}
                                value={currentStreetName}
                                onChange={(e) => {
                                    setCurrentStreetName(e.target.value);
                                    if (e.target.value !== "") setIsCurrentStreetName(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Barangay <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Barangay"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentBarangay ? 'border-red-500' : ''}`}
                                value={currentBarangay}
                                onChange={(e) => {
                                    setCurrentBarangay(e.target.value);
                                    if (e.target.value !== "") setIsCurrentBarangay(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Municipality <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Municipality"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentMunicipality ? 'border-red-500' : ''}`}
                                value={currentMunicipality}
                                onChange={(e) => {
                                    setCurrentMunicipality(e.target.value);
                                    if (e.target.value !== "") setIsCurrentMunicipality(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Province <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Province"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentProvince ? 'border-red-500' : ''}`}
                                value={currentProvince}
                                onChange={(e) => {
                                    setCurrentProvince(e.target.value);
                                    if (e.target.value !== "") setIsCurrentProvince(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Country <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Country"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentCountry ? 'border-red-500' : ''}`}
                                value={currentCountry}
                                onChange={(e) => {
                                    setCurrentCountry(e.target.value);
                                    if (e.target.value !== "") setIsCurrentCountry(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Zip Code <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Zip Code"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isCurrentZipCode ? 'border-red-500' : ''}`}
                                value={currentZipCode}
                                onChange={(e) => {
                                    setCurrentZipCode(e.target.value);
                                    if (e.target.value !== "") setIsCurrentZipCode(false);
                                }}
                            />
                        </div>

                    </div>

                    {/* Permanent Address */}
                    <h2 className="text-sm font-semibold text-gray-500 mt-6">Permanent Address</h2>
                    <div className="h-full w-full grid grid-cols-4 gap-2">

                        <div>
                            <h1 className="text-xs text-gray-500">House Number <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="House Number"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentAddressHouseNo ? 'border-red-500' : ''}`}
                                value={permanentAddressHouseNo}
                                onChange={(e) => {
                                    setPermanentAddressHouseNo(e.target.value);
                                    if (e.target.value !== "") setIsPermanentAddressHouseNo(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Street Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Street Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentStreetName ? 'border-red-500' : ''}`}
                                value={permanentStreetName}
                                onChange={(e) => {
                                    setPermanentStreetName(e.target.value);
                                    if (e.target.value !== "") setIsPermanentStreetName(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Barangay <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Barangay"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentBarangay ? 'border-red-500' : ''}`}
                                value={permanentBarangay}
                                onChange={(e) => {
                                    setPermanentBarangay(e.target.value);
                                    if (e.target.value !== "") setIsPermanentBarangay(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Municipality <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Municipality"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentMunicipality ? 'border-red-500' : ''}`}
                                value={permanentMunicipality}
                                onChange={(e) => {
                                    setPermanentMunicipality(e.target.value);
                                    if (e.target.value !== "") setIsPermanentMunicipality(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Province <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Province"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentProvince ? 'border-red-500' : ''}`}
                                value={permanentProvince}
                                onChange={(e) => {
                                    setPermanentProvince(e.target.value);
                                    if (e.target.value !== "") setIsPermanentProvince(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Country <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Country"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentCountry ? 'border-red-500' : ''}`}
                                value={permanentCountry}
                                onChange={(e) => {
                                    setPermanentCountry(e.target.value);
                                    if (e.target.value !== "") setIsPermanentCountry(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Zip Code <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Zip Code"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isPermanentZipCode ? 'border-red-500' : ''}`}
                                value={permanentZipCode}
                                onChange={(e) => {
                                    setPermanentZipCode(e.target.value);
                                    if (e.target.value !== "") setIsPermanentZipCode(false);
                                }}
                            />
                        </div>

                    </div>

                    {/* Parent Information */}
                    <h1 className="text-sm font-bold text-gray-500">Parent / Guardian Information</h1>

                    {/* Father Information */}
                    <h2 className="text-sm font-semibold text-gray-500 mt-2">Father Information</h2>
                    <div className="w-full grid grid-cols-4 gap-2">

                        <div>
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isFatherLastname ? 'border-red-500' : ''}`}
                                value={fatherLastname}
                                onChange={(e) => {
                                    setFatherLastname(e.target.value);
                                    if (e.target.value !== "") setIsFatherLastname(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isFatherFirstname ? 'border-red-500' : ''}`}
                                value={fatherFirstname}
                                onChange={(e) => {
                                    setFatherFirstname(e.target.value);
                                    if (e.target.value !== "") setIsFatherFirstname(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Middle Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isFatherMiddlename ? 'border-red-500' : ''}`}
                                value={fatherMiddlename}
                                onChange={(e) => {
                                    setFatherMiddlename(e.target.value);
                                    if (e.target.value !== "") setIsFatherMiddlename(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Contact No. <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Contact No."
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isFatherContact ? 'border-red-500' : ''}`}
                                value={fatherContact}
                                onChange={(e) => {
                                    setFatherContact(e.target.value);
                                    if (e.target.value !== "") setIsFatherContact(false);
                                }}
                            />
                        </div>

                    </div>

                    {/* Mother Information */}
                    <h2 className="text-sm font-semibold text-gray-500 mt-6">Mother Information</h2>
                    <div className="w-full grid grid-cols-4 gap-2">

                        <div>
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isMotherLastname ? 'border-red-500' : ''}`}
                                value={motherLastname}
                                onChange={(e) => {
                                    setMotherLastname(e.target.value);
                                    if (e.target.value !== "") setIsMotherLastname(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isMotherFirstname ? 'border-red-500' : ''}`}
                                value={motherFirstname}
                                onChange={(e) => {
                                    setMotherFirstname(e.target.value);
                                    if (e.target.value !== "") setIsMotherFirstname(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Middle Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isMotherMiddlename ? 'border-red-500' : ''}`}
                                value={motherMiddlename}
                                onChange={(e) => {
                                    setMotherMiddlename(e.target.value);
                                    if (e.target.value !== "") setIsMotherMiddlename(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Contact No. <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Contact No."
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isMotherContact ? 'border-red-500' : ''}`}
                                value={motherContact}
                                onChange={(e) => {
                                    setMotherContact(e.target.value);
                                    if (e.target.value !== "") setIsMotherContact(false);
                                }}
                            />
                        </div>

                    </div>

                    {/* Legal Guardian Information */}
                    <h2 className="text-sm font-semibold text-gray-500 mt-6">Legal Guardian Information</h2>
                    <div className="w-full grid grid-cols-4 gap-2">

                        <div>
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isLegalLastname ? 'border-red-500' : ''}`}
                                value={legalLastname}
                                onChange={(e) => {
                                    setLegalLastname(e.target.value);
                                    if (e.target.value !== "") setIsLegalLastname(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isLegalFirstname ? 'border-red-500' : ''}`}
                                value={legalFirstname}
                                onChange={(e) => {
                                    setLegalFirstname(e.target.value);
                                    if (e.target.value !== "") setIsLegalFirstname(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Middle Name"
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isLegalMiddlename ? 'border-red-500' : ''}`}
                                value={legalMiddlename}
                                onChange={(e) => {
                                    setLegalMiddlename(e.target.value);
                                    if (e.target.value !== "") setIsLegalMiddlename(false);
                                }}
                            />
                        </div>

                        <div>
                            <h1 className="text-xs text-gray-500">Contact No. <span className="text-red-500">*</span></h1>
                            <input
                                type="text"
                                placeholder="Contact No."
                                className={`border border-gray-300 h-12 w-full outline-none rounded-xl px-4 ${isLegalContact ? 'border-red-500' : ''}`}
                                value={legalContact}
                                onChange={(e) => {
                                    setLegalContact(e.target.value);
                                    if (e.target.value !== "") setIsLegalContact(false);
                                }}
                            />
                        </div>

                    </div>

                    <h1 className="text-sm font-bold text-gray-500">School Information</h1>
                    <div className="h-full w-full justify-center items-start grid grid-cols-4 gap-2">
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Grade Level <span className="text-red-500">*</span></h1>
                             <select className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500 mb-2 ${isGradeLevel ? 'border-red-500' : ''}`} 
                                     value={gradeLevel} onChange={(e) => {setGradeLevel(e.target.value);
                                                                          if(e.target.value !== "") setIsGradeLevel(false);
                                     }}>
                                <option value="">Select Grade Level</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Grade 1">Grade 1</option>
                                <option value="Grade 2">Grade 2</option>
                                <option value="Grade 3">Grade 3</option>
                                <option value="Grade 4">Grade 4</option>
                        </select>
                        
                        </div>
                        
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">School Branch <span className="text-red-500">*</span></h1>
                            <select className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500 ${isBranch ? 'border-red-500' : ''}`} 
                                        value={branch} onChange={(e) => {setBranch(e.target.value);
                                                                            if(e.target.value !== "") setIsBranch(false);
                                        }}>
                                    <option value="">Select Branch</option>
                                    <option value="Dasmariñas Cavite">Dasmariñas Cavite</option>
                                    <option value="Trece Martires Cavite">Trece Martires Cavite</option>
                                    <option value="Rosario Cavite">Rosario Cavite</option>
                                    <option value="Silang Cavite">Silang Cavite</option>
                                    <option value="Las Piñas Cavite">Las Piñas Cavite</option>
                            </select>
                        </div>
                        
                    </div>

                    <div className={`${hasError ? "" : "hidden"} h-full w-full bg-red-100 p-2 rounded-xl flex flex-col items-start justify-center`}>
                        <p className="text-red-500 text-xs">
                            • Please fill out all required fields and ensure the information is correct.
                        </p>

                        {(isFatherContact || isMotherContact || isLegalContact) && (
                            <p className="text-red-500 text-xs">
                                • Contact numbers must start with <strong>09</strong> and contain exactly <strong>11 digits</strong>.
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="w-full h-20 justify-end items-center flex py-4">
                        <button className="bg-black text-white h-full w-fit px-6 rounded-xl cursor-pointer font-bold text-sm hover:-translate-y-1" onClick={handleConfirmation}>+ Register</button>
                    </div>
                    </div>
                    
               </div>
               
        </section>
        </>
    )
}
export default Admin_StudentRegistration_Page