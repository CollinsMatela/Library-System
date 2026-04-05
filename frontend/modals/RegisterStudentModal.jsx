
const RegisterStudentModal = ({ onClose }) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return(
        <section className="fixed inset-0 justify-center items-center flex">
               <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>

               <div className="relative bg-white w-[500px] rounded-xl justify-start items-center flex flex-col p-4">
                    <h1>Register Student</h1>
                    <div className="w-full justify-center items-center flex flex-col gap-2">
                        <h1>Student Information</h1>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Last Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Last Name" className="bg-gray-100 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">First Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="First Name" className="bg-gray-100 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Middle Name <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Middle Name" className="bg-gray-100 h-12 w-full outline-none rounded-xl px-4"/>
                        </div>
                        
                        <div className="w-full justify-center items-center flex gap-2">

                            <div className="w-full justify-center items-start flex flex-col">
                                <h1 className="text-xs text-gray-500">Date of birth <span className="text-red-500">*</span></h1>
                                <div className="justify-center items-center flex gap-2">
                                    <select name="Year" className="bg-gray-100 h-12 w-full outline-none rounded-xl px-2">
                                        <option value="">Year</option>
                                        {Array.from({ length: currentYear - 1999 }, (currentValue, index) => {
                                            const year = currentYear - index;
                                            return <option key={year} value={year}>{year}</option>;
                                        })}
                                    </select>
                                    <select name="Year" className="bg-gray-100 h-12 w-35 outline-none rounded-xl px-2">
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
                                    <select name="Year" className="bg-gray-100 h-12 w-full outline-none rounded-xl px-2">
                                        {Array.from({ length: 31 }, (currentValue, index) => {
                                            const day = index + 1;
                                            return <option key={day} value={day}>{day}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>    
                            
                            <div>
                                <h1 className="text-xs text-gray-500">Age<span className="text-red-500">*</span></h1>
                                <input type="text" placeholder="Age" className="bg-gray-100 h-12 w-20 outline-none rounded-xl px-4"/>
                            </div>
                            
                        </div>
                        
                        
                        <div className="w-full">
                            <h1 className="text-xs text-gray-500">Gender <span className="text-red-500">*</span></h1>
                            <select className="bg-gray-100 h-12 w-full outline-none rounded-xl px-4">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                        
                    </div>
               </div>
        </section>
    )
}
export default RegisterStudentModal