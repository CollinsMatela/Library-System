import { useState, useEffect } from "react"
import axios from "axios"

const Edit_Student_Modal = ({selectedStudent, triggerRefreshStudentTable, closeEditStudentModal}) => {

        const [lastname, setLastname] = useState(selectedStudent.student.lastname)
        const [firstname, setFirstname] = useState(selectedStudent.student.firstname)
        const [middlename, setMiddlename] = useState(selectedStudent.student.middlename)
        const [year, setYear] = useState(selectedStudent.student.year)
        const [month, setMonth] = useState(selectedStudent.student.month)
        const [day, setDay] = useState(selectedStudent.student.day)
        const [gender, setGender] = useState(selectedStudent.student.gender)
        const [parentLastname, setParentLastname] = useState(selectedStudent.parent.parentLastname)
        const [parentFirstname, setParentFirstname] = useState(selectedStudent.parent.parentFirstname)
        const [parentMiddlename, setParentMiddlename] = useState(selectedStudent.parent.parentMiddlename)
        const [parentEmail, setParentEmail] = useState(selectedStudent.parent.parentEmail)
        const [parentContact, setParentContact] = useState(selectedStudent.parent.parentContact)
        const [parentRelationship, setParentRelationship] = useState(selectedStudent.parent.parentRelationship)
        const [gradeLevel, setGradeLevel] = useState(selectedStudent.school.gradeLevel)
        const [branch, setBranch] = useState(selectedStudent.school.branch)
    
        const [isLastname, setIsLastname] = useState(false);
        const [isFirstname, setIsFirstname] = useState(false);
        const [isMiddlename, setIsMiddlename] = useState(false);
        const [isYear, setIsYear] = useState(false);
        const [isMonth, setIsMonth] = useState(false);
        const [isDay, setIsDay] = useState(false);
        const [isGender, setIsGender] = useState(false);
        const [isParentLastname, setIsParentLastname] = useState(false);
        const [isParentFirstname, setIsParentFirstname] = useState(false);
        const [isParentMiddlename, setIsParentMiddlename] = useState(false);
        const [isParentEmail, setIsParentEmail] = useState(false);
        const [isParentContact, setIsParentContact] = useState(false);
        const [isParentRelationship, setIsParentRelationship] = useState(false);
        const [isGradeLevel, setIsGradeLevel] = useState(false);
        const [isBranch, setIsBranch] = useState(false);

        useEffect(() => {
            setLastname(lastname);
            setFirstname(firstname);
            setMiddlename(middlename);
            setYear(year);
            setMonth(month);
            setDay(day);
            setGender(gender);
            setParentLastname(parentLastname);
            setParentFirstname(parentFirstname);
            setParentMiddlename(parentMiddlename);
            setParentEmail(parentEmail);
            setParentContact(parentContact);
            setParentRelationship(parentRelationship);
            setGradeLevel(gradeLevel);
            setBranch(branch);
        },[lastname, firstname, middlename, year, month, day, gender, 
            parentLastname, parentFirstname, parentMiddlename, parentEmail, parentContact, parentRelationship, 
            gradeLevel, branch])

        const updateStudentAccount = async () => {
            const updatedStudentDetails = {
                lastname: lastname,
                firstname: firstname,
                middlename: middlename,
                year: year,
                month: month,
                day: day,
                gender: gender,
                parentLastname: parentLastname,
                parentFirstname: parentFirstname,
                parentMiddlename: parentMiddlename,
                parentEmail: parentEmail,
                parentContact: parentContact,
                parentRelationship: parentRelationship,
                gradeLevel: gradeLevel,
                branch: branch
            }

              try {
                const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-student-account/${selectedStudent.student.id}`, updatedStudentDetails);
                console.log(res.data.message);
                triggerRefreshStudentTable();
                closeEditStudentModal();
              } catch (error) {
                console.log(error);
              }
        }
    return(
        <section className="fixed inset-0 justify-center items-center flex">
           <div className="fixed inset-0 bg-black/80" onClick={closeEditStudentModal}></div>


           <div className="relative bg-white flex flex-col w-[1200px] rounded-xl p-2 space-y-2">
               <div className="h-10 w-full justify-center items-center flex border-b-1 border-gray-300 p-4">
                     <h1 className="text-sm font-bold text-gray-500">{selectedStudent.student.firstname} {selectedStudent.student.middlename} {selectedStudent.student.lastname}'s Account Details</h1>
               </div>

               <div className="w-full flex space-y-2 gap-2">

               <div className="w-1/2 space-y-2">
                    {/* Student Information Container */}
               <h1 className="text-sm font-bold text-gray-500">Student Information</h1>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Lastname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setLastname(e.target.value)} defaultValue={selectedStudent.student.lastname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Firstname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setFirstname(e.target.value)} defaultValue={selectedStudent.student.firstname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Middlename</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setMiddlename(e.target.value)} defaultValue={selectedStudent.student.middlename} />
               </div>
               <div className="w-full flex flex-col">
                   <h1 className="text-xs text-gray-500">Date of birth</h1>
                        <div className="w-full flex gap-2">
                        <select name="year" className={`border-1 border-gray-300 h-12 w-20 outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setYear(e.target.value)} defaultValue={selectedStudent.student.year}>
                            {Array.from({ length: 90 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                        <select name="month" className={`border-1 border-gray-300 h-12 w-30 outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setMonth(e.target.value)} defaultValue={selectedStudent.student.month}>
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
                        <select name="day" className={`border-1 border-gray-300 h-12 w-20 outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setDay(e.target.value)} defaultValue={selectedStudent.student.day}>
                            <option value="">Day</option>
                            {Array.from({ length: 31 }, (_, i) => {
                                    const day = i + 1;
                                    return <option key={day} value={day}>{day}</option>;
                            })}
                        </select>
                        </div>
               </div>
               <div className="w-full">
                <h1 className="text-xs text-gray-500">Gender</h1>
                <select name="gender" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setGender(e.target.value)} defaultValue={selectedStudent.student.gender}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
               </div>
               </div>

               <div className="w-1/2 space-y-2">
                {/* Employee Information Container */}
               <h1 className="text-sm font-bold text-gray-500">Parent/Guardian Information</h1>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Lastname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setParentLastname(e.target.value)} defaultValue={selectedStudent.parent.parentLastname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Firstname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setParentFirstname(e.target.value)} defaultValue={selectedStudent.parent.parentFirstname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Middlename</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setParentMiddlename(e.target.value)} defaultValue={selectedStudent.parent.parentMiddlename} />
               </div>
               <div className="w-full flex gap-2">
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Email</h1>
                         <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setParentEmail(e.target.value)} defaultValue={selectedStudent.parent.parentEmail} />
                    </div>
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Contact</h1>
                         <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setParentContact(e.target.value)} defaultValue={selectedStudent.parent.parentContact} />
                    </div>
               </div>

               <div className="w-full flex gap-2">
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Relationship</h1>
                         <select name="relationship" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setParentRelationship(e.target.value)} defaultValue={selectedStudent.parent.parentRelationship}>
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

               <div className="w-1/2 space-y-2">
                {/* School Information Container */}
               <h1 className="text-sm font-bold text-gray-500">School Information</h1>
               <div className="w-full flex flex-col gap-2">
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Grade Level</h1>
                         <select name="relationship" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setGradeLevel(e.target.value)} defaultValue={selectedStudent.school.gradeLevel}>
                            <option value="">Select Grade Level</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Grade 1">Grade 1</option>
                                <option value="Grade 2">Grade 2</option>
                                <option value="Grade 3">Grade 3</option>
                                <option value="Grade 4">Grade 4</option>
                         </select>
                    </div>
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Branch</h1>
                         <select name="relationship" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} onChange={(e) => setBranch(e.target.value)} defaultValue={selectedStudent.school.branch}>
                                <option value="">Select Branch</option>
                                <option value="Dasmariñas Cavite">Dasmariñas Cavite</option>
                                <option value="Trece Martires Cavite">Trece Martires Cavite</option>
                                <option value="Rosario Cavite">Rosario Cavite</option>
                                <option value="Silang Cavite">Silang Cavite</option>
                                <option value="Las Piñas Cavite">Las Piñas Cavite</option>
                         </select>
                    </div>
               </div>

               </div>
               </div>
               
                <div className="w-full justify-end items-center flex gap-2">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer font-bold text-sm" onClick={updateStudentAccount}>Edit Student</button>
                </div>

            </div>
        </section>
    )
}
export default Edit_Student_Modal;