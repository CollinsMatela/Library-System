import { use, useState } from "react";

const RegisterStudentModal = ({ onClose }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [parentLastname, setParentLastname] = useState("")
    const [parentFirstname, setParentFirstname] = useState("")
    const [parentMiddlename, setParentMiddlename] = useState("")
    const [parentEmail, setParentEmail] = useState("")
    const [parentContact, setParentContact] = useState("")
    const [parentRelationship, setParentRelationship] = useState("")
    const [gradeLevel, setGradeLevel] = useState("")

    const handleStudentRegistration = () => {
        const studentInformation = {
             lasname: lastname,
             firstname: firstname,
             middlename: middlename,
             year: year,
             month: month,
             day: day,
             age: age,
             gender: gender,
             parentLastname: parentLastname,
             parentFirstname: parentFirstname,
             parentMiddlename: parentMiddlename,
             parentEmail: parentEmail,
             parentContact: parentContact,
             parentRelationship: parentRelationship,
             gradeLevel: gradeLevel
        }
        try {
            console.log("Student Information:", studentInformation);
        } catch (error) {
            console.log("Error registering student account:", error);
        }
    }

    return(
        <section className="fixed inset-0 justify-center items-center flex">
               <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>
               
               <div className="relative bg-white w-[1000px] rounded-xl justify-start items-start flex flex-col p-4 gap-4">
                    <div className="w-full border-b-1 border-gray-100 justify-center items-center flex pb-4">
                        <h1 className="text-md font-bold text-gray-500">Register Student Account</h1>
                    </div>
                    <div className="w-full justify-start items-start flex gap-4">
                        <div className="w-full justify-center items-start flex flex-col gap-2">
                        <h1 className="text-sm font-bold text-gray-500">Student Information</h1>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Last Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={middlename} onChange={(e) => setMiddlename(e.target.value)} />
                        </div>
                        
                        <div className="w-full justify-center items-center flex gap-2">

                            <div className="w-full justify-center items-start flex flex-col">
                                <h1 className="text-xs text-gray-500">Date of birth <span className="text-red-500">*</span></h1>
                                <div className="justify-center items-center flex gap-2">
                                    <select name="Year" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-2 text-gray-500" value={year} onChange={(e) => setYear(e.target.value)}>
                                        <option value="">Year</option>
                                        {Array.from({ length: currentYear - 1999 }, (currentValue, index) => {
                                            const year = currentYear - index;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                    <select name="Month" className="border-1 border-gray-300 h-12 w-35 outline-none rounded-xl px-2 text-gray-500" value={month} onChange={(e) => setMonth(e.target.value)}>
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
                                    <select name="Day" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-2 text-gray-500" value={day} onChange={(e) => setDay(e.target.value)}>
                                        {Array.from({ length: 31 }, (currentValue, index) => {
                                            const day = index + 1;
                                            return <option key={day} value={day}>{day}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>    
                            
                            <div>
                                <h1 className="text-xs text-gray-500">Age<span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Age" className="bg-gray-100 h-12 w-20 outline-none rounded-xl px-4 text-gray-500 cursor-not-allowed" disabled value={age} onChange={(e) => setAge(e.target.value)}/>
                            </div>
                            
                        </div>
                        
                        
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Gender <span className="text-red-500">*</span></h1>
                            <select className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                        
                    </div>

         
                    <div className="h-full w-full justify-center items-start flex flex-col gap-2">
                        <h1 className="text-sm font-bold text-gray-500">Parent/Guardian Information</h1>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Last Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={parentLastname} onChange={(e) => setParentLastname(e.target.value)}/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={parentFirstname} onChange={(e) => setParentFirstname(e.target.value)}/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={parentMiddlename} onChange={(e) => setParentMiddlename(e.target.value)}/>
                        </div>
                        <div className="w-full flex gap-2">
                            <div className="flex-1">
                                <h1 className="text-xs text-gray-500">Email Address <span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Email Address" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)}/>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-xs text-gray-500">Contact No. <span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Contact No." className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4" value={parentContact} onChange={(e) => setParentContact(e.target.value)}/>
                            </div>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Relationship <span className="text-red-500">*</span></h1>
                            <select className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500" value={parentRelationship} onChange={(e) => setParentRelationship(e.target.value)}>
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
                    
                    <div className="w-full justify-start items-start flex flex-col gap-2">
                        <h1 className="text-sm font-bold text-gray-500">School Information</h1>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Grade Level <span className="text-red-500">*</span></h1>
                             <select className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500" value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
                                <option value="">Select Grade Level</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Grade 1">Grade 1</option>
                                <option value="Grade 2">Grade 2</option>
                                <option value="Grade 3">Grade 3</option>
                                <option value="Grade 4">Grade 4</option>
                        </select>
                        </div>
                    </div>

                    <div className="w-full justify-end items-center flex">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer font-bold text-sm" onClick={handleStudentRegistration}>Register</button>
                    </div>
               </div>
        </section>
    )
}
export default RegisterStudentModal