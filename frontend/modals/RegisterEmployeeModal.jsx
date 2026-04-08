
const RegisterEmployeeModal = ({ onClose }) => {
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
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Email Address <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Email Address" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Contact Number <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Contact Number" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                     </div>        
                </div>

                <div className="w-full mt-4 space-y-2">
                     <h1 className="text-sm font-bold text-gray-500">Employee Information</h1>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Teacher ID <span className="text-red-500">*</span></h1>
                            <input type="text" placeholder="Teacher ID" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4"/>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Department/Grade Level <span className="text-red-500">*</span></h1>
                            <select name="" id="" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500">
                                <option value="">Select Department/Grade Level</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Pre-school">Pre-school</option>
                            </select>
                     </div>
                     <div className="w-full">
                            <h1 className="text-xs text-gray-500">Role <span className="text-red-500">*</span></h1>
                            <select name="" id="" className="border-1 border-gray-300 h-12 w-full outline-none rounded-xl px-4 text-gray-500">
                                <option value="">Select Role</option>
                                <option value="Kindergarten">Administrator</option>
                                <option value="Pre-school">Teacher</option>
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
export default RegisterEmployeeModal;