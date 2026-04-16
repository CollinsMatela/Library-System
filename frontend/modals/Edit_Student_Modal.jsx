
const Edit_Student_Modal = ({selectedStudent, closeEditStudentModal}) => {
    return(
        <section className="fixed inset-0 justify-center items-center flex">
           <div className="fixed inset-0 bg-black/80" onClick={closeEditStudentModal}></div>


           <div className="relative bg-white flex flex-col w-[1000px] rounded-xl p-2 space-y-2">
               <div className="h-10 w-full justify-center items-center flex border-b-1 border-gray-300 p-4">
                     <h1 className="text-sm font-bold text-gray-500">{selectedStudent.student.lastname}, {selectedStudent.student.firstname} {selectedStudent.student.middlename}</h1>
               </div>

               <div className="w-full flex gap-2">

               <div className="w-1/2">
                    {/* Student Information Container */}
               <h1 className="text-sm font-bold text-gray-500">Student Information</h1>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Lastname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.lastname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Firstname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.firstname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Middlename</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.middlename} />
               </div>
               <div className="w-full flex flex-col">
                   <h1 className="text-xs text-gray-500">Date of birth</h1>
                        <div className="w-full flex gap-2">
                        <select name="year" className={`border-1 border-gray-300 h-12 w-20 outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.year}>
                            {Array.from({ length: 90 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                        <select name="month" className={`border-1 border-gray-300 h-12 w-30 outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.month}>
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
                        <select name="day" className={`border-1 border-gray-300 h-12 w-20 outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.day}>
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
                <select name="gender" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.gender}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
               </div>
               </div>

               <div className="w-1/2">
                {/* Employee Information Container */}
               <h1 className="text-sm font-bold text-gray-500">Parent/Guardian Information</h1>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Lastname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.lastname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Firstname</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.firstname} />
               </div>
               <div className="w-full">
                   <h1 className="text-xs text-gray-500">Middlename</h1>
                   <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.middlename} />
               </div>
               <div className="w-full flex gap-2">
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Email</h1>
                         <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.middlename} />
                    </div>
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Contact</h1>
                         <input type="text" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`} defaultValue={selectedStudent.student.middlename} />
                    </div>
               </div>

               <div className="w-full flex gap-2">
                    <div className="flex-1">
                         <h1 className="text-xs text-gray-500">Email</h1>
                         <select name="relationship" className={`border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500`}>
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
               </div>
               
                <div className="w-full justify-end items-center flex gap-2">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer font-bold text-sm">Edit Student</button>
                </div>

            </div>
        </section>
    )
}
export default Edit_Student_Modal;