import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Confirmation_Popup from "../popup/Confirmation_Popup"
import Account_Popup from "../popup/Account_Conformation"
import { toast } from 'react-toastify'
import { ArrowLeft, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { months } from "../mockdata";

const initialForm = {
    role: "",
    lastname: "", firstname: "", middlename: "", extensionname: "",
    year: "", month: "", day: "", sex: "",
    homeAddress: "", city: "", email: "", contact: "", institution: "",
    parentName: "", parentContact: "", parentRelationship: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^09\d{9}$/;

const RegistrationPage = () => {
    const navigate = useNavigate()
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showAccountPopup, setShowAccountPopup] = useState(false);

    const [newStudent, setNewStudent] = useState(null);

    const currentYear = new Date().getFullYear();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log(form);
    }, [form])

    const daysInMonth = form.year && form.month
    ? new Date(form.year, form.month, 0).getDate()
    : 31;

    const calculateAge = (year, month, day) => {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        return (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
    }

    const age = useMemo(() => (
        form.year && form.month && form.day
            ? calculateAge(form.year, form.month, form.day)
            : ""
    ), [form.year, form.month, form.day]);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: false }));
    };

    const validateForm = () => {
        const nextErrors = {};
        const requiredFields = ["role", "lastname", "firstname", "middlename", "year", "month", "day", "sex", "homeAddress", "city", "institution"];

        requiredFields.forEach((field) => {
            if (!String(form[field]).trim()) nextErrors[field] = true;
        });

        if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = true;
        if (!PHONE_PATTERN.test(form.contact.trim())) nextErrors.contact = true;

        if (Number(age) < 18) {
            ["parentName", "parentRelationship"].forEach((field) => {
                if (!form[field].trim()) nextErrors[field] = true;
            });
            if (!PHONE_PATTERN.test(form.parentContact.trim())) {
                nextErrors.parentContact = true;
            }
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
        if (nextErrors.email) {
            toast.warning("Please enter a valid email address.");
        } else if (nextErrors.contact) {
            toast.warning("Please enter a valid 11-digit contact number.");
        } else if (nextErrors.parentContact) {
            toast.warning("Please enter a valid parent contact number.");
        } else {
            toast.warning("Please fill in all required fields.");
        }

        return true;
        }
        return false;
    };

    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
        setErrorMessage("");
    };

    const handleConfirmation = () => {
        const itHasError = validateForm();
        if (itHasError) return;
        setShowConfirmationPopup(true);
    };

    const handleAccountInformation = (newAccountDetails) => {
          setNewStudent(newAccountDetails);
          setShowAccountPopup(true);
    }

    const UserRegistration = async () => {

        const userInformation = {
            // Student Information
            ...form,
            age,
        };

        try {

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/register-user`,
                userInformation
            );

            if (res.data.isSuccess) {
                handleAccountInformation(res.data.account);
                resetForm();
                toast.success(res.data.message);
                setShowConfirmationPopup(false);
            }

        } catch (error) {
            console.log("Error registering user account:", error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message || "User Registration Request Error.");
        }

        };

    return(
    <>
        {showConfirmationPopup && (<Confirmation_Popup errorMessage={errorMessage} message={'Are you sure to register this user?'} onConfirm={() => {UserRegistration();}} onCancel={() => {setShowConfirmationPopup(false); setErrorMessage("");}} />)}
        {showAccountPopup && (<Account_Popup newAccountDetails={newStudent} closeAccountConfirmation={() => {setShowAccountPopup(false);}}/>)}
        <section className="bg-white min-h-screen w-full justify-center items-center flex flex-col">
                  
                    <div className="w-full lg:w-5xl py-10">

                    <div className="bg-white w-full md:p-6 rounded-lg border-0 md:border border-stone-300 mb-4 px-2">
                        <div className="flex flex-col items-start justify-start w-full mb-5">
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Select Type of User</h1>
                                <p className="text-stone-400 text-xs">Fill-up the required information.</p>
                        </div>

                         <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">

    {/* Student */}
    <div
        onClick={() => updateField("role", "student")}
        className={`w-full p-4 rounded-xl border cursor-pointer transition-all
            ${
                form.role === "student"
                    ? "border-stone-800 bg-stone-800 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50"
            }
        `}
    >
        <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm font-semibold">
                Student
            </h1>

            <p
                className={`text-xs ${
                    form.role === "student"
                        ? "text-stone-300"
                        : "text-stone-400"
                }`}
            >
                For students using the library.
            </p>
        </div>
    </div>


    {/* Teacher */}
    <div
        onClick={() => updateField("role", "teacher")}
        className={`w-full p-4 rounded-xl border cursor-pointer transition-all
            ${
                form.role === "teacher"
                    ? "border-stone-800 bg-stone-800 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50"
            }
        `}
    >
        <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm font-semibold">
                Teacher
            </h1>

            <p
                className={`text-xs ${
                    form.role === "teacher"
                        ? "text-stone-300"
                        : "text-stone-400"
                }`}
            >
                For teachers using the library.
            </p>
        </div>
    </div>


    {/* Guest */}
    <div
        onClick={() => updateField("role", "guest")}
        className={`w-full p-4 rounded-xl border cursor-pointer transition-all
            ${
                form.role === "guest"
                    ? "border-stone-800 bg-stone-800 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 hover:bg-stone-50"
            }
        `}
    >
        <div className="flex flex-col items-start gap-1">
            <h1 className="text-sm font-semibold">
                Guest
            </h1>

            <p
                className={`text-xs ${
                    form.role === "guest"
                        ? "text-stone-300"
                        : "text-stone-400"
                }`}
            >
                For visitors and guests.
            </p>
        </div>
    </div>

</div>
                    </div>

                    <div className="bg-white w-full md:p-6 rounded-lg border-0 md:border border-stone-300 mb-4 px-4">

                        <div className="flex items-center justify-start gap-2 w-full mb-5">
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">User Information</h1>
                                <p className="text-stone-400 text-xs">Fill-up the requiered information.</p>
                            </div>
                        </div>
                        
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Last Name" 
                                   className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.lastname ? 'border-red-500' : ''}`} 
                                   value={form.lastname} 
                                   onChange={(e) => updateField("lastname", e.target.value)}
                                   />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="First Name" 
                                   className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.firstname ? 'border-red-500' : ''}`} 
                                   value={form.firstname} 
                                   onChange={(e) => updateField("firstname", e.target.value)}
                                   />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Middle Name" 
                                   className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.middlename ? 'border-red-500' : ''}`} 
                                   value={form.middlename} 
                                   onChange={(e) => updateField("middlename", e.target.value)}
                                   />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Extension Name</h1>
                            <input type="text" 
                                   placeholder="Extension Name e.g. Jr., lll (if applicable)" 
                                   className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg px-4`} 
                                   value={form.extensionname} 
                                   onChange={(e) => updateField("extensionname", e.target.value)}
                                   />
                        </div>
                        
                        <div className="flex flex-col w-full">

                        {/* Date of Birth */}
                        <h1 className="text-xs text-stone-500">Date of Birth <span className="text-red-500">*</span></h1>
                        <div className="w-full grid grid-cols-3 gap-2">

                            
                                <select
                                    className={`border border-stone-300 p-2 text-xs flex-1 rounded-lg text-stone-500 outline-none ${
                                        errors.year ? "border-red-500" : ""
                                    }`}
                                    value={form.year}
                                    onChange={(e) => updateField("year", e.target.value)}
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
                                    className={`border border-stone-300 p-2 text-xs flex-1 rounded-lg text-stone-500 outline-none ${
                                        errors.month ? "border-red-500" : ""
                                    }`}
                                    value={form.month}
                                    onChange={(e) => updateField("month", e.target.value)}
                                >
                                    <option value="">Month</option>
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>{month.label}</option>
                                    ))}
                                </select>

                                <select
                                    className={`border border-stone-300 p-2 text-xs flex-1 rounded-lg text-stone-500 outline-none ${
                                        errors.day ? "border-red-500" : ""
                                    }`}
                                    value={form.day}
                                    onChange={(e) => updateField("day", e.target.value)}
                                >
                                    <option value="">Day</option>
                                    {Array.from({ length: daysInMonth }, (_, index) => (
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
                                className="bg-stone-100 p-2 text-xs w-full rounded-lg text-stone-500 cursor-not-allowed"
                            />
                        </div>
                        </div>

                        

                    </div>
                        
                        
                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">Sex <span className="text-red-500">*</span></h1>
                            <select className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg text-stone-500 ${errors.sex ? 'border-red-500' : ''}`} 
                                    value={form.sex} 
                                    onChange={(e) => updateField("sex", e.target.value)}>
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
                                className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.homeAddress ? "border-red-500" : ""}`}
                                value={form.homeAddress}
                                onChange={(e) => updateField("homeAddress", e.target.value)}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                City/Municipality <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="City/Municipality"
                                className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.city ? "border-red-500" : ""}`}
                                value={form.city}
                                onChange={(e) => updateField("city", e.target.value)}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                Email Address <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.email ? "border-red-500" : ""}`}
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                Contact Number <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="09XXXXXXXXX"
                                className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.contact ? "border-red-500" : ""}`}
                                value={form.contact}
                                onChange={(e) => updateField("contact", e.target.value)}
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="text-xs text-stone-500">
                                School/Office <span className="text-red-500">*</span>
                            </h1>
                            <input
                                type="text"
                                placeholder="School/Office"
                                className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.institution ? "border-red-500" : ""}`}
                                value={form.institution}
                                onChange={(e) => updateField("institution", e.target.value)}
                            />
                        </div>
                        </div>
  
                    </div>
                    
                    {age && age < 18 && (
                      <div className="bg-white w-full md:p-6 rounded-lg border-0 md:border border-stone-300 mb-4 px-4">

                         <div className="flex items-center justify-start gap-2 w-full mb-5">
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Parent Information</h1>
                                <p className="text-stone-400 text-xs">Fill-up the required information.</p>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            <div className="w-full">
                            <h1 className="text-xs text-stone-500">Parent Name <span className="text-red-500">*</span></h1>
                            <input type="text" 
                                   placeholder="Name" 
                                   className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.parentName ? 'border-red-500' : ''}`} 
                                   value={form.parentName} 
                                   onChange={(e) => updateField("parentName", e.target.value)}
                                   />
                             </div>
                             <div className="w-full">
                                <h1 className="text-xs text-stone-500">Parent Contact <span className="text-red-500">*</span></h1>
                                <input type="text" 
                                        placeholder="Contact Number" 
                                        className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg ${errors.parentContact ? 'border-red-500' : ''}`} 
                                        value={form.parentContact} 
                                        onChange={(e) => updateField("parentContact", e.target.value)}
                                        />
                            </div>

                            <div className="w-full">
                            <h1 className="text-xs text-stone-500">Parent Relationship <span className="text-red-500">*</span></h1>
                            <select className={`border border-stone-300 p-2 text-xs w-full outline-none rounded-lg text-stone-500 ${errors.parentRelationship ? 'border-red-500' : ''}`} 
                                    value={form.parentRelationship} 
                                    onChange={(e) => updateField("parentRelationship", e.target.value)}>
                            <option value="">Select Relationship</option>
                            <option value="Parent">Parent</option>
                            <option value="Guardian">Guardian</option>
                            </select>
                        </div>
                            
                        </div>
                    </div>  
                    )}

                    {/* Buttons */}
                    <div className="w-full justify-end items-center flex gap-1 px-4">
                        <button className="bg-transparent text-stone-500 h-full w-fit rounded-lg cursor-pointer text-xs p-2 hover:bg-stone-300 justify-center items-center flex gap-2" 
                        onClick={() => navigate(-1)}><ArrowLeft size={15}/> 
                        Cancel
                        </button>
                        <button className="bg-stone-800 text-white h-full w-fit rounded-lg cursor-pointer text-xs p-2 hover:bg-stone-900 justify-center items-center flex gap-2" 
                        onClick={handleConfirmation}><Plus size={15}/> 
                        Register
                        </button>
                    </div>
                    </div>
                    
                    
               
        </section>
        </>
    )
}


export default RegistrationPage
