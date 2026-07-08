import { useState, useEffect } from "react"
import axios from "axios"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import { Pen } from "lucide-react"
import { toast } from "react-toastify"

const Edit_Student_Modal = ({selectedUser, reFetch, closeEditStudentModal}) => {

        const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
        const [errorMessage, setErrorMessage] = useState('')

        const [lastname, setLastname] = useState(selectedUser.lastname)
        const [firstname, setFirstname] = useState(selectedUser.firstname)
        const [middlename, setMiddlename] = useState(selectedUser.middlename)
        const [year, setYear] = useState(selectedUser.year)
        const [month, setMonth] = useState(selectedUser.month)
        const [day, setDay] = useState(selectedUser.day)
        const [sex, setSex] = useState(selectedUser.sex)
        const [email, setEmail] = useState(selectedUser.email)
        const [contact, setContact] = useState(selectedUser.contact)
        const [institution, setInstitution] = useState(selectedUser.institution)
        const [homeAddress, setHomeAddress] = useState(selectedUser.homeAddress)
        const [city, setCity] = useState(selectedUser.city);
        const [parentName, setParentName] = useState(selectedUser.parentName)
        const [parentContact, setParentContact] = useState(selectedUser.parentContact)
        const [parentRelationship, setParentRelationship] = useState(selectedUser.parentRelationship)
        
    
        const [isLastname, setIsLastname] = useState(false);
        const [isFirstname, setIsFirstname] = useState(false);
        const [isMiddlename, setIsMiddlename] = useState(false);
        const [isYear, setIsYear] = useState(false);
        const [isMonth, setIsMonth] = useState(false);
        const [isDay, setIsDay] = useState(false);
        const [isSex, setIsSex] = useState(false);
        const [isEmail, setIsEmail] = useState(false);
        const [isContact, setIsContact] = useState(false)
        const [isInstitution, setIsInstitution] = useState(false);
        const [isHomeAddress, setIsHomeAddress] = useState(false);
        const [isCity, setIsCity] = useState(false);
        const [isParentName, setIsParentName] = useState(false);
        const [isParentContact, setIsParentContact] = useState(false);
        const [isParentRelationship, setIsParentRelationship] = useState(false);
        

        useEffect(() => {
            if (!selectedUser) return;

            setLastname(selectedUser.lastname || "");
            setFirstname(selectedUser.firstname || "");
            setMiddlename(selectedUser.middlename || "");
            setYear(selectedUser.year || "");
            setMonth(selectedUser.month || "");
            setDay(selectedUser.day || "");
            setSex(selectedUser.sex || "");
            setInstitution(selectedUser.institution || "")
            setHomeAddress(selectedUser.homeAddress || "")
            setCity(selectedUser.city || "")

            setEmail(selectedUser.email || "");
            setContact(selectedUser.contact || "");
            setParentName(selectedUser.parentName || "");
            setParentContact(selectedUser.parentContact || "");
            setParentRelationship(selectedUser.parentRelationship || "");
        }, [selectedUser]);

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
                    toast.warning("Please enter a valid email address (e.g., name@example.com).");
                    hasError = true;
                }
        
                const contactRegex = /^09\d{9}$/;
        
                if (!contact.trim() || !contactRegex.test(contact)) {
                    setIsContact(true);
                    toast.warning("Please enter a valid contact number (11 digits starting with 09).");
                    hasError = true;
                }
        
                // Parent / Guardian Information (Required only if under 18)
                if (Number(selectedUser.age) < 18) {
        
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
                        toast.warning("Please enter a valid contact number (11 digits starting with 09).");
                        hasError = true;
                    }
                }
        
                if (hasError) {
                    toast.warning("Please fill up the required information.");
                }
        
                return hasError;
            };

        const handleConfirmation = () => {
            const error = ErrorChecker();

            if(error) return;
            setShowConfirmationPopup(true);
        }

        const updateStudentAccount = async () => {
            const updatedStudentDetails = {
                lastname,
                firstname,
                middlename,
                year,
                month,
                day,
                sex,
                email,
                contact,
                parentName,
                parentContact,
                parentRelationship
            };

              try {
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-student-account/${selectedUser._id}`, updatedStudentDetails);
                console.log(res.data.message);
                toast.success(res.data.message);
                closeEditStudentModal();
                reFetch();
              } catch (error) {
                console.log(error);
                setErrorMessage(error?.response?.data?.error)
                toast.error(error?.response?.data?.error)
              }
        }
    return(
        <>
        {showConfirmationPopup && (<Confirmation_Popup errorMessage={errorMessage} message={'Are you sure to edit?'} onConfirm={updateStudentAccount} onCancel={() => {setShowConfirmationPopup(false); closeEditStudentModal()}}/>)}
        <section className="fixed z-50 inset-0 justify-center items-center flex">
           <div className="fixed inset-0 bg-black/80"></div>


           <div className="relative bg-white flex flex-col w-6xl rounded-2xl p-2 space-y-2 ">
               
               <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            User Information
                        </h2>
                        <p className="text-sm text-gray-400">
                            View user details and account information.
                        </p>
                    </div>

                    <button
                        onClick={closeEditStudentModal}
                        className="text-gray-400 hover:text-red-500 text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

               <div className="w-full flex flex-col space-y-2 gap-2 px-4 mt-4">
                {/* Student Information Container */}
                <h1 className="text-lg font-semibold text-gray-700 mb-4">User Information</h1>
               <div className="w-full grid grid-cols-3 gap-2">
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Lastname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setLastname(e.target.value)} value={lastname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Firstname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setFirstname(e.target.value)} value={firstname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Middlename</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setMiddlename(e.target.value)} value={middlename} />
               </div>
               <div className="w-full flex flex-col">
                   <h1 className="text-xs text-gray-500">Date of birth</h1>
                        <div className="w-full flex gap-2">
                        <select name="year" className={`border-1 border-gray-300 h-12 w-20 outline-none rounded-xl px-4 text-black`} onChange={(e) => setYear(e.target.value)} value={year}>
                            {Array.from({ length: 90 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                        <select name="month" className={`border-1 border-gray-300 h-12 w-30 outline-none rounded-xl px-4 text-black`} onChange={(e) => setMonth(e.target.value)} value={month}>
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
                        <select name="day" className={`border-1 border-gray-300 h-12 w-20 outline-none rounded-xl px-4 text-black`} onChange={(e) => setDay(e.target.value)} value={day}>
                            <option value="">Day</option>
                            {Array.from({ length: 31 }, (_, i) => {
                                    const day = i + 1;
                                    return <option key={day} value={day}>{day}</option>;
                            })}
                        </select>
                        </div>
               </div>
               <div className="w-full">
                <h1 className="text-xs text-gray-500">Email</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 h-12 w-full rounded-xl px-4 outline-none"
                />
            </div>

            <div className="w-full">
                <h1 className="text-xs text-gray-500">Contact</h1>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="border border-gray-300 h-12 w-full rounded-xl px-4 outline-none"
                />
            </div>
               <div className="w-full">
                <h1 className="text-xs text-gray-500">Sex</h1>
                <select name="sex" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setSex(e.target.value)} value={sex}>
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
               </div>
               
               <div className="w-full">
                <h1 className="text-xs text-gray-500">Home Address</h1>
                <input
                    type="text"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="border border-gray-300 h-12 w-full rounded-xl px-4 outline-none"
                />
                </div>

                <div className="w-full">
                <h1 className="text-xs text-gray-500">City/Municipality</h1>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-gray-300 h-12 w-full rounded-xl px-4 outline-none"
                />
                </div>

                <div className="w-full">
                <h1 className="text-xs text-gray-500">Institution</h1>
                <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="border border-gray-300 h-12 w-full rounded-xl px-4 outline-none"
                />
               </div>
              



               </div>

            {/* Parent Information Container */}
               {selectedUser.age < 18 && (
                <>
                <h1 className="text-lg font-semibold text-gray-700 mb-4">Parent/Guardian Information</h1>
               <div className="w-full grid grid-cols-3 gap-2">
                    <div className="w-full">
                        <h1 className="text-xs text-gray-500">Name</h1>
                        <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setParentLastname(e.target.value)} value={parentName} />
                    </div>

                        <div className="flex-1">
                                <h1 className="text-xs text-gray-500">Contact</h1>
                                <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setParentContact(e.target.value)} value={parentContact} />
                        </div>

                        <div className="w-full flex gap-2">
                            <div className="flex-1">
                                <h1 className="text-xs text-gray-500">Relationship</h1>
                                <select name="relationship" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-black`} onChange={(e) => setParentRelationship(e.target.value)} value={parentRelationship}>
                                    <option value="">Select Relationship</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Relative">Relative</option>
                                </select>
                            </div>
                    </div>
               </div>
                </>
               )}
               

               

               </div>
               
                <div className="w-full justify-end items-center flex gap-2 mt-10 mb-2">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer font-bold text-sm justify-center items-center flex gap-2" onClick={handleConfirmation}><Pen size={20}/> Edit User</button>
                </div>

            </div>
        </section>
        </>
    )
}
export default Edit_Student_Modal;