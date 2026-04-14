import { useEffect, useState } from "react";
import axios from "axios";

const RegisterEmployeeModal = ({ onClose }) => {

       const [lastname, setLastname] = useState("");
       const [firstname, setFirstname] = useState("");
       const [middlename, setMiddlename] = useState("");
       const [year, setYear] = useState("");
       const [month, setMonth] = useState("");
       const [day, setDay] = useState("");
       const [age, setAge] = useState("");
       const [email, setEmail] = useState("");
       const [gender, setGender] = useState("");
       const [contact, setContact] = useState("");
       const [role, setRole] = useState("");
       const [gradeLevel, setGradeLevel] = useState("");
       const [branch, setBranch] = useState("");
       const [username, setUsername] = useState("");
       const [password, setPassword] = useState("");

       const [isLastname, setIsLastname] = useState(false);
       const [isFirstname, setIsFirstname] = useState(false);
       const [isMiddlename, setIsMiddlename] = useState(false);
       const [isYear, setIsYear] = useState(false);
       const [isMonth, setIsMonth] = useState(false);
       const [isDay, setIsDay] = useState(false);
       const [isGender, setIsGender] = useState(false);
       const [isEmail, setIsEmail] = useState(false);
       const [isContact, setIsContact] = useState(false);
       const [isRole, setIsRole] = useState(false);
       const [isGradeLevel, setIsGradeLevel] = useState(false);
       const [isBranch, setIsBranch] = useState(false);

       const currentYear = new Date().getFullYear();

       const calculateAge = (year, month, day) => {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }      
        return age;      
       };

       useEffect(() => {
            if(year && month && day) {
                const calculatedAge = calculateAge(year, month, day);
                console.log(calculatedAge);
                setAge(calculatedAge);
            }
       }, [year, month, day]);

        const ErrorChecker = () => {
            let hasError = false;

            // Empty field checks
            if (!lastname) { setIsLastname(true); hasError = true; }
            if (!firstname) { setIsFirstname(true); hasError = true; }
            if (!middlename) { setIsMiddlename(true); hasError = true; }
            if (!year) { setIsYear(true); hasError = true; }
            if (!month) { setIsMonth(true); hasError = true; }
            if (!day) { setIsDay(true); hasError = true; }
            if (!gender) { setIsGender(true); hasError = true; }
            if (!role) { setIsRole(true); hasError = true; }
            if (!gradeLevel) { setIsGradeLevel(true); hasError = true; }
            if (!branch) { setIsBranch(true); hasError = true; }

            // Regex patterns
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const contactRegex = /^09\d{9}$/;

            // Email validation
            if (!emailRegex.test(email)) {
                setIsEmail(true);
                hasError = true;
            }

            // Contact validation
            if (!contactRegex.test(contact)) {
                setIsContact(true);
                hasError = true;
            }
            return hasError;
        };

       const handleSubmit = async () => {
               const itHasError = ErrorChecker();

               // If the user role in Admin it does not need to fill out the grade level and branch
               if(role === "Administrator") {
                    setIsGradeLevel(false);
                    setIsBranch(false);
               }

               if(itHasError) return;

               try {
                
                    const employeeInformation = {
                        lastname: lastname,
                        firstname: firstname,
                        middlename: middlename,
                        year: year,
                        month: month,
                        day: day,
                        age: age,
                        gender: gender,
                        email: email,
                        contact: contact,
                        role: role,
                        gradeLevel: gradeLevel || "N/A",
                        branch: branch || "N/A",
                    }
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/register-employee`, employeeInformation)
                    if(res.data.isSuccess){
                        alert(res.data.message);
                        onClose();
                    }
                    
               } catch (error) {
                     console.log(error);
               }
       }


    return(
        <section className="fixed inset-0 justify-center items-center flex">
               <div className="absolute bg-black/80 inset-0" onClick={onClose}></div>

               <div className="relative bg-white w-[1000px] p-4 rounded-xl">
                <div className="w-full justify-center items-center flex border-b-1 border-gray-100 pb-4"> 
                    <h1 className="text-md font-bold text-gray-500">Register Employee Account</h1>
                </div>
                <div className="w-full justify-center items-start flex gap-2">
                    <div className="w-full mt-4 space-y-2">
                     <h1 className="text-sm font-bold text-gray-500">Personal Information</h1>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Last Name" className={`${isLastname ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            value={lastname}
                            onChange={(e) => {setLastname(e.target.value);
                                             if(e.target.value !== "") setIsLastname(false);
                            }}/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className={`${isFirstname ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            value={firstname}
                            onChange={(e) => {setFirstname(e.target.value);
                                             if(e.target.value !== "") setIsFirstname(false);
                            }}/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className={`${isMiddlename ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            value={middlename}
                            onChange={(e) => {setMiddlename(e.target.value);
                                             if(e.target.value !== "") setIsMiddlename(false);
                            }}/>
                     </div>

                     <div className="w-full justify-center items-center flex gap-2">

                            <div className="w-full justify-center items-start flex flex-col">
                                <h1 className="text-xs text-gray-500">Date of birth <span className="text-red-500">*</span></h1>
                                <div className="justify-center items-center flex gap-2">
                                    <select name="Year" 
                                            className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-2 text-gray-500 ${isYear ? 'border-red-500' : ''}`} 
                                            value={year} 
                                            onChange={(e) => {setYear(e.target.value)
                                                             if(e.target.value !== "") setIsYear(false);
                                            }}>
                                        <option value="">Year</option>
                                        {Array.from({ length: currentYear - 1949 }, (currentValue, index) => {
                                            const year = currentYear - index;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                    <select name="Month" 
                                            className={`border-1 border-gray-300 h-12 w-35 outline-none rounded-xl px-2 text-gray-500 ${isMonth ? 'border-red-500' : ''}`} 
                                            value={month} 
                                            onChange={(e) => {setMonth(e.target.value)
                                                             if(e.target.value !== "") setIsMonth(false);
                                            }}>
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
                                    <select name="Day" 
                                            className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-2 text-gray-500 ${isDay ? 'border-red-500' : ''}`} 
                                            value={day} 
                                            onChange={(e) => {setDay(e.target.value)
                                                             if(e.target.value !== "") setIsDay(false);
                                            }}>
                                                <option value="">Day</option>
                                        {Array.from({ length: 31 }, (currentValue, index) => {
                                            const day = index + 1;
                                            return <option key={day} value={day}>{day}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>    
                            
                            <div>
                                <h1 className="text-xs text-gray-500">Age<span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Age" className="bg-gray-100 h-12 w-20 outline-none rounded-xl px-4 text-gray-500 cursor-not-allowed" disabled value={age}/>
                            </div>
                            
                        </div>

                      <div className="w-full">
                            <h1 className="text-xs text-gray-500">Select Gender <span className="text-red-500">*</span></h1>
                            <select name="" id="" className={`${isGender ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4 text-gray-500`}
                                    value={gender}
                                    onChange={(e) => {setGender(e.target.value);
                                                     if(e.target.value !== "") setIsGender(false);
                                    }}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                     </div>

                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Email Address <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Email Address" className={`${isEmail ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            value={email}
                            onChange={(e) => {setEmail(e.target.value);
                                             if(e.target.value !== "") setIsEmail(false);
                            }}/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Contact Number <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Contact Number" className={`${isContact ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            value={contact}
                            onChange={(e) => {setContact(e.target.value);
                                             if(e.target.value !== "") setIsContact(false);
                            }}/>
                     </div>        
                </div>

                <div className="w-full mt-4 space-y-2">
                     <h1 className="text-sm font-bold text-gray-500">Employee Information</h1>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Role <span className="text-red-500">*</span></h1>
                            <select name="" id="" className={`${isRole ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4 text-gray-500`}
                            value={role}
                            onChange={(e) => {setRole(e.target.value);
                                             if(e.target.value !== "") setIsRole(false);
                            }}>
                                <option value="">Select Role</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Teacher">Teacher</option>
                            </select>
                     </div>

                     {role === "Teacher" ? (
                            <>
                            <div className="w-full">
                            <h1 className="text-xs text-gray-500">Grade Level <span className="text-red-500">*</span></h1>
                            <select name="" id="" className={`${isGradeLevel ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4 text-gray-500`}
                            value={gradeLevel}
                            onChange={(e) => {setGradeLevel(e.target.value);
                                              if(e.target.value !== "") setIsGradeLevel(false);
                            }}>
                                <option value="">Grade Level</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Grade 1">Grade 1</option>
                                <option value="Grade 2">Grade 2</option>
                                <option value="Grade 3">Grade 3</option>
                                <option value="Grade 4">Grade 4</option>
                            </select>
                            </div>
                            <div className="w-full">
                                   <h1 className="text-xs text-gray-500">School Branch <span className="text-red-500">*</span></h1>
                                   <select name="" id="" className={`${isBranch ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4 text-gray-500`}
                                   value={branch}
                                   onChange={(e) => {setBranch(e.target.value);
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
                            </>  
                     ) : null}  
                     
                     
                          
                </div>
                </div>

                <div className={`${isLastname || isFirstname || isMiddlename || isYear || isMonth || isDay || isGender || isEmail || isContact ||isGradeLevel || isBranch ? "" : "hidden"} h-full w-full bg-red-100 p-2 rounded-xl justify-center items-start flex flex-col my-4`}>
                            {isLastname || isFirstname || isMiddlename || isYear || isMonth || isDay || isGender || isEmail || isContact || isGradeLevel || isBranch ? (
                                <p className="text-red-500 text-xs">• Please fill out all required fields and ensure the information is correct. </p>
                                
                            ) : null}

                            {isEmail ? (
                                <p className="text-red-500 text-xs">• The email address must contain an "@" symbol and ".com".</p>
                            ) : null}
                            {isContact ? (
                                <p className="text-red-500 text-xs">• The contact number must starts with (09) and contain (11) digits.</p>
                            ) : null}
                    </div>

                <div className="w-full justify-end items-center flex">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer font-bold text-sm"
                        onClick={handleSubmit}
                        >Register</button>
                </div>
                
               </div>
        </section>
    )
}
export default RegisterEmployeeModal;