import { useState, useEffect } from "react"
import axios from "axios"

const Edit_Employee_Modal = ({selectedEmployee, triggerRefreshEmployeeTable, closeEditEmployeeModal}) => {

       const currentYear = new Date().getFullYear();

       const [lastname, setLastname] = useState(selectedEmployee.personal_information.lastname);
       const [firstname, setFirstname] = useState(selectedEmployee.personal_information.firstname);
       const [middlename, setMiddlename] = useState(selectedEmployee.personal_information.middlename);
       const [year, setYear] = useState(selectedEmployee.personal_information.year);
       const [month, setMonth] = useState(selectedEmployee.personal_information.month);
       const [day, setDay] = useState(selectedEmployee.personal_information.day);
       const [email, setEmail] = useState(selectedEmployee.personal_information.email);
       const [gender, setGender] = useState(selectedEmployee.personal_information.gender);
       const [contact, setContact] = useState(selectedEmployee.personal_information.contact);
       const [role, setRole] = useState(selectedEmployee.employee_information.role);
       const [gradeLevel, setGradeLevel] = useState(selectedEmployee.employee_information.gradeLevel);
       const [branch, setBranch] = useState(selectedEmployee.employee_information.branch);

        const [isLastname, setIsLastname] = useState(false);
        const [isFirstname, setIsFirstname] = useState(false);
        const [isMiddlename, setIsMiddlename] = useState(false);
        const [isYear, setIsYear] = useState(false);
        const [isMonth, setIsMonth] = useState(false);
        const [isDay, setIsDay] = useState(false);
        const [isEmail, setIsEmail] = useState(false);
        const [isGender, setIsGender] = useState(false);
        const [isContact, setIsContact] = useState(false);
        const [isRole, setIsRole] = useState(false);
        const [isGradeLevel, setIsGradeLevel] = useState(false);
        const [isBranch, setIsBranch] = useState(false);

        useEffect(() => {
            setLastname(lastname)
            setFirstname(firstname)
            setMiddlename(middlename)
            setYear(year)
            setMonth(month)
            setDay(day)
            setEmail(email)
            setGender(gender)
            setContact(contact)
            setRole(role)
            setGradeLevel(gradeLevel)
            setBranch(branch)

        },[lastname,firstname,middlename,year,month,day,email,gender,contact,role,gradeLevel,branch])

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

            // Teacher-only fields
            if (role === "Teacher") {
                if (!gradeLevel) { setIsGradeLevel(true); hasError = true; }
                if (!branch) { setIsBranch(true); hasError = true; }
            }

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

        const updateEmployeeAccount = async () => {
            const employeeId = selectedEmployee.employee_information.id;

               const itHasError = ErrorChecker();
               if(itHasError) return;

               const updatedEmployeeDetails = {
                     lastname: lastname,
                     firstname: firstname,
                     middlename: middlename,
                     year: year,
                     month: month,
                     day: day,
                     gender: gender,
                     email: email,
                     contact: contact,
                     role: role,
                     gradeLevel: gradeLevel,
                     branch: branch
               }
               console.log(employeeId);
               try {
                 const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-employee-account/${employeeId}`, updatedEmployeeDetails);
                 if(res.data.isSuccess){
                    console.log(res.data.message)
                    triggerRefreshEmployeeTable();
                    closeEditEmployeeModal();
                 }
                 

               } catch (error) {
                console.log(error)
               }
        }

    return(
        <section className="fixed inset-0 justify-center items-center flex">
               <div className="absolute bg-black/80 inset-0" onClick={() => closeEditEmployeeModal()}></div>

               <div className="relative bg-white w-[1000px] p-4 rounded-xl">
                <div className="w-full justify-center items-center flex border-b-1 border-gray-100 pb-4"> 
                    <h1 className="text-md font-bold text-gray-500">{selectedEmployee.personal_information.firstname} {selectedEmployee.personal_information.lastname}'s Details</h1>
                </div>
                <div className="w-full justify-center items-start flex gap-2">
                    <div className="w-full mt-4 space-y-2">
                     <h1 className="text-sm font-bold text-gray-500">Personal Information</h1>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Last Name" className={`${isLastname ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            defaultValue={lastname}
                            onChange={(e) => {setLastname(e.target.value);
                                             if(e.target.value !== "") setIsLastname(false);}}/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className={`${isFirstname ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            defaultValue={firstname}
                            onChange={(e) => {setFirstname(e.target.value);
                                             if(e.target.value !== "") setIsFirstname(false);
                            }}/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className={`${isMiddlename ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            defaultValue={middlename}
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
                                            defaultValue={year} 
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
                                            defaultValue={month} 
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
                                            defaultValue={day} 
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
                            
                        </div>

                      <div className="w-full">
                            <h1 className="text-xs text-gray-500">Select Gender <span className="text-red-500">*</span></h1>
                            <select name="" id="" className={`${isGender ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4 text-gray-500`}
                                    defaultValue={gender}
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
                            defaultValue={email}
                            onChange={(e) => {setEmail(e.target.value);
                                             if(e.target.value !== "") setIsEmail(false);
                            }}/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Contact Number <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Contact Number" className={`${isContact ? 'border-red-500' : 'border-gray-300'} border-1 h-12 w-full outline-none rounded-xl px-4`}
                            defaultValue={contact}
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
                            defaultValue={role}
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
                            defaultValue={gradeLevel}
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
                                   defaultValue={branch}
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

                <div className="w-full justify-end items-center flex">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer font-bold text-sm"
                        onClick={updateEmployeeAccount}
                        >Edit Employee</button>
                </div>
                
               </div>
        </section>
    )
}
export default Edit_Employee_Modal;