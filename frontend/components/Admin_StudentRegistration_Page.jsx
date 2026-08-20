import {useEffect, useState } from "react";
import axios from "axios";
import Confirmation_Popup from "../popup/Confirmation_Popup"
import Account_Popup from "../popup/Account_Conformation"
import Admin_SideBar from "./Admin_Sidebar";
import { toast } from 'react-toastify'
import { Plus, User } from "lucide-react";

const Admin_StudentRegistration_Page = ({ reFetchStudent}) => {
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

    const [homeAddress, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [institution, setInstitution] = useState('');

    const [parentName, setParentName] = useState('');
    const [parentContact, setParentContact] = useState('')
    const [parentRelationship, setParentRelationship] = useState('')

    const [isLastname, setIsLastname] = useState(false);
    const [isFirstname, setIsFirstname] = useState(false);
    const [isMiddlename, setIsMiddlename] = useState(false);
    const [isYear, setIsYear] = useState(false);
    const [isMonth, setIsMonth] = useState(false);
    const [isDay, setIsDay] = useState(false);
    const [isSex, setIsSex] = useState(false);

    const [isHomeAddress, setIsHomeAddress] = useState(false);
    const [isCity, setIsCity] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isContact, setIsContact] = useState(false);
    const [isInstitution, setIsInstitution] = useState(false);

    const [isParentName, setIsParentName] = useState(false);
    const [isParentContact, setIsParentContact] = useState(false);
    const [isParentRelationship, setIsParentRelationship] = useState(false);

   

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

        // Personal Information
        if (!lastname.trim()) {
            setIsLastname(true);
            hasError = true;
        }

        if (!firstname.trim()) {
            setIsFirstname(true);
            hasError = true;
        }

        if (!middlename.trim()) {
            setIsMiddlename(true);
            hasError = true;
        }

        if (!year) {
            setIsYear(true);
            hasError = true;
        }

        if (!month) {
            setIsMonth(true);
            hasError = true;
        }

        if (!day) {
            setIsDay(true);
            hasError = true;
        }

        if (!sex) {
            setIsSex(true);
            hasError = true;
        }

        // Contact Information
        if (!homeAddress.trim()) {
            setIsHomeAddress(true);
            hasError = true;
        }

        if (!city.trim()) {
            setIsCity(true);
            hasError = true;
        }

        if (!institution.trim()) {
            setIsInstitution(true);
            hasError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim() || !emailRegex.test(email)) {
            setIsEmail(true);
            hasError = true;
        }

        const contactRegex = /^09\d{9}$/;

        if (!contact.trim() || !contactRegex.test(contact)) {
            setIsContact(true);
            hasError = true;
        }

        // Parent / Guardian Information (Required only if under 18)
        if (Number(age) < 18) {

            if (!parentName.trim()) {
                setIsParentName(true);
                hasError = true;
            }

            if (!parentRelationship.trim()) {
                setIsParentRelationship(true);
                hasError = true;
            }

            if (!parentContact.trim() || !contactRegex.test(parentContact)) {
                setIsParentContact(true);
                hasError = true;
            }
        }

        if (hasError) {
            toast.warning("Please fill up the required information.");
        }

        return hasError;
    };

    const resetForm = () => {
        setLastname("");
        setFirstname("");
        setMiddlename("");
        setExtensionName("");

        setYear("");
        setMonth("");
        setDay("");
        setAge("");
        setSex("");

        setAddress("");
        setCity("");
        setEmail("");
        setContact("");
        setInstitution("");

        setParentName("");
        setParentContact("");
        setParentRelationship("");

        setErrorMessage("");
    };

    const handleConfirmation = () => {
        const itHasError = ErrorChecker();
        if (itHasError) return;
        setShowConfirmationPopup(true);
    };

    const handleAccountInformation = (newAccountDetails) => {
          setNewStudent(newAccountDetails);
          setShowAccountPopup(true);
    }

    const UserRegistration = async () => {

        const studentInformation = {
            // Student Information
            lastname, firstname, middlename, extensionname, year, month, day, age, sex,
            // Contact Information
            homeAddress, city, email, contact, institution,
            // Parent / Guardian
            parentName, parentContact, parentRelationship
        };

        try {

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/register-user`,
                studentInformation
            );

            if (res.data.isSuccess) {
                handleAccountInformation(res.data.account);
                resetForm();
                toast.success(res.data.message);
                setShowConfirmationPopup(false);
            }

        } catch (error) {
            console.log("Error registering student account:", error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message || "User Registration Request Error.");
        }
        };

    return(
    <>
        <Admin_SideBar/>
        {showConfirmationPopup && (<Confirmation_Popup errorMessage={errorMessage} message={'Are you sure to register this user?'} onConfirm={() => {UserRegistration();}} onCancel={() => {setShowConfirmationPopup(false); setErrorMessage("");}} />)}
        {showAccountPopup && (<Account_Popup newAccountDetails={newStudent} closeAccountConfirmation={() => {setShowAccountPopup(false);}}/>)}
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col pl-70">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-stone-300 p-3 px-10">
                    <h1 className="text-sm font-bold text-stone-800">User Registration</h1>
                    <h1 className="text-stone-400 text-xs">Manage creating account for users</h1>                   
              </header>

                <div className="flex items-center justify-start gap-2 w-full mb-5 px-10">
                    <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                        <User size={20}/>
                    </div>
                    <div>
                        <h1 className="text-md font-bold text-stone-800 rounded-full">Registration</h1>
                        <p className="text-stone-400 text-xs">Register new users.</p>
                    </div>
                </div>
                    <div className="w-full px-10">
                    <div className="w-full p-6 rounded-xl border border-stone-300 mb-4 ">

                        <div className="flex items-center justify-start gap-2 w-full mb-5">
                            <div className="bg-stone-200 p-2 text-white rounded-full justify-center items-center flex">
                                <User size={20} className="text-stone-500"/>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">User Information</h1>
                                <p className="text-stone-400 text-xs">Fill-up the requiered information.</p>
                            </div>
                        </div>
                        
                        <div className="w-full grid grid-cols-4 gap-2">

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Last Name" 
                                   className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isLastname ? 'border-red-500' : ''}`} 
                                   value={lastname} 
                                   onChange={(e) => {setLastname(e.target.value);
                                                    if(e.target.value !== "") setIsLastname(false);}
                                   } 
                                   />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="First Name" 
                                   className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isFirstname ? 'border-red-500' : ''}`} 
                                   value={firstname} 
                                   onChange={(e) => {setFirstname(e.target.value);
                                                    if(e.target.value !== "") setIsFirstname(false);}
                                   } 
                                   />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Middle Name" 
                                   className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isMiddlename ? 'border-red-500' : ''}`} 
                                   value={middlename} 
                                   onChange={(e) => {setMiddlename(e.target.value);
                                                    if(e.target.value !== "") setIsMiddlename(false);}
                                   } 
                                   />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Extension Name</h1>
                            <input type="text" 
                                   placeholder="Extension Name e.g. Jr., lll (if applicable)" 
                                   className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl px-4`} 
                                   value={extensionname} 
                                   onChange={(e) => {setExtensionName(e.target.value)}
                                   } 
                                   />
                        </div>
                        
                        <div className="flex flex-col w-full">

                        {/* Date of Birth */}
                        <h1 className="text-xs text-stone-500">Date of Birth <span className="text-red-500">*</span></h1>
                        <div className="w-full grid grid-cols-3 gap-2">

                            
                                <select
                                    className={`border border-stone-300 p-2 text-xs flex-1 rounded-xl text-stone-500 outline-none ${
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
                                    className={`border border-stone-300 p-2 text-xs flex-1 rounded-xl text-stone-500 outline-none ${
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
                                    className={`border border-stone-300 p-2 text-xs flex-1 rounded-xl text-stone-500 outline-none ${
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
                                className="bg-stone-100 p-2 text-xs w-full rounded-xl text-stone-500 cursor-not-allowed"
                            />
                        </div>
                        </div>

                        

                    </div>
                        
                        
                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Sex <span className="text-red-500">*</span></h1>
                            <select className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl text-stone-500 ${isSex ? 'border-red-500' : ''}`} 
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
                            <h1 className="text-xs text-stone-500">
                                Home Address <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="Home Address"
                                className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isHomeAddress ? "border-red-500" : ""}`}
                                value={homeAddress}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    if (e.target.value !== "") setIsHomeAddress(false);
                                }}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                City/Municipality <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="City/Municipality"
                                className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isCity ? "border-red-500" : ""}`}
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    if (e.target.value !== "") setIsCity(false);
                                }}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                Email Address <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isEmail ? "border-red-500" : ""}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (e.target.value !== "") setIsEmail(false);
                                }}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                Contact Number <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="09XXXXXXXXX"
                                className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isContact ? "border-red-500" : ""}`}
                                value={contact}
                                onChange={(e) => {
                                    setContact(e.target.value);
                                    if (e.target.value !== "") setIsContact(false);
                                }}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                School/Office <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="School/Office"
                                className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isInstitution ? "border-red-500" : ""}`}
                                value={institution}
                                onChange={(e) => {
                                    setInstitution(e.target.value);
                                    if (e.target.value !== "") setIsInstitution(false);
                                }}
                            />
                        </div>
                        </div>
  
                    </div>
                    
                    {age && age < 18 && (
                      <div className="w-full p-6 rounded-xl border border-stone-300 mb-4">

                         <div className="flex items-center justify-start gap-2 w-full mb-5">
                            <div className="bg-stone-200 p-2 text-white rounded-full justify-center items-center flex">
                                <User size={20} className="text-stone-500"/>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Parent Information</h1>
                                <p className="text-stone-400 text-xs">Fill-up the required information.</p>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-4 gap-2">
                            <div className="w-full">
                            <h1 className="text-xs text-stone-500">Parent/Guardian Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Name" 
                                   className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isParentName ? 'border-red-500' : ''}`} 
                                   value={parentName} 
                                   onChange={(e) => {setParentName(e.target.value);
                                                    if(e.target.value !== "") setIsParentName(false);}
                                   } 
                                   />
                             </div>
                             <div className="w-full">
                                <h1 className="text-xs text-stone-500">Parent/Guardian Contact <span className="text-red-500">*</span></h1>
                                <input type="text" 
                                        placeholder="Contact Number" 
                                        className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl ${isParentContact ? 'border-red-500' : ''}`} 
                                        value={parentContact} 
                                        onChange={(e) => {setParentContact(e.target.value)
                                                          if(e.target.value !== "") setIsParentContact(false);
                                        }} 
                                        />
                            </div>

                            <div className="w-full">
                            <h1 className="text-xs text-stone-500">Parent/Guardian Relationship <span className="text-red-500">*</span></h1>
                            <select className={`border-1 border-stone-300 p-2 text-xs w-full outline-none rounded-xl text-stone-500 ${isParentRelationship ? 'border-red-500' : ''}`} 
                                    value={parentRelationship} 
                                    onChange={(e) => {setParentRelationship(e.target.value)
                                                      if(e.target.value !== "") setIsParentRelationship(false);
                                    }}>
                            <option value="">Select Relationship</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                            
                        </div>
                    </div>  
                    )}
                    </div>
                    
                    
               {/* Buttons */}
                    <div className="w-full justify-end items-center flex px-10">
                        <button className="bg-stone-800 text-white h-full w-fit cursor-pointer text-xs p-2 hover:bg-stone-900 justify-center items-center flex gap-2" onClick={handleConfirmation}><Plus size={15}/> Register</button>
                    </div>
        </section>
        </>
    )
}


export default Admin_StudentRegistration_Page