
const RegisterStudentModal = ({ onClose }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

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
                            <input type="text" placeholder="Last Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        
                        <div className="w-full justify-center items-center flex gap-2">

                            <div className="w-full justify-center items-start flex flex-col">
                                <h1 className="text-xs text-gray-500">Date of birth <span className="text-red-500">*</span></h1>
                                <div className="justify-center items-center flex gap-2">
                                    <select name="Year" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-2 text-gray-500">
                                        <option value="">Year</option>
                                        {Array.from({ length: currentYear - 1999 }, (currentValue, index) => {
                                            const year = currentYear - index;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                    <select name="Year" className="border-1 border-gray-300 h-12 w-35 outline-none rounded-xl px-2 text-gray-500">
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
                                    <select name="Year" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-2 text-gray-500">
                                        {Array.from({ length: 31 }, (currentValue, index) => {
                                            const day = index + 1;
                                            return <option key={day} value={day}>{day}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>    
                            
                            <div>
                                <h1 className="text-xs text-gray-500">Age<span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Age" className="bg-gray-100 h-12 w-20 outline-none rounded-xl px-4 text-gray-500 cursor-not-allowed" disabled/>
                            </div>
                            
                        </div>
                        
                        
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Gender <span className="text-red-500">*</span></h1>
                            <select className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                        
                    </div>

         
                    <div className="h-full w-full justify-center items-start flex flex-col gap-2">
                        <h1 className="text-sm font-bold text-gray-500">Parent/Guardian Information</h1>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Last Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full flex gap-2">
                            <div className="flex-1">
                                <h1 className="text-xs text-gray-500">Email Address <span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Email Address" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-xs text-gray-500">Contact No. <span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Contact No." className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Relationship <span className="text-red-500">*</span></h1>
                            <select className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500">
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
                    
                    <div className="w-full justify-end items-center flex">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 cursor-pointer font-bold text-sm">Register</button>
                    </div>
               </div>
        </section>
    )
}
export default RegisterStudentModal