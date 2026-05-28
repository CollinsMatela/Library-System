import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal"
import Confirmation_Popup from "../popup/Confirmation_Popup"
const Admin_Teacher_Page = () => {

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);

    const [teacherList, setTeacherList] = useState([]);
    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-employees`);
            console.log(res.data.message);
            setTeacherList(res.data.employees);
            console.log(res.data.employees.length)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      fetchEmployees();
    },[])

    const displayRegistration = () => {
          setShowRegistrationModal(true);
    }

    const [search, setSearch] = useState("");
    const filterTeacher = teacherList.filter((teacher) => teacher.role.toLowerCase() === "teacher");

    const filteredTeachers = filterTeacher.filter((teacher) => {
          const fullName = `${teacher.lastname} ${teacher.firstname}`;
          const gradeLevel = teacher.gradeLevel;
          const branch = teacher.branch;
          return fullName.toLowerCase().includes(search) || gradeLevel.toLowerCase().includes(search) || branch.toLowerCase().includes(search);
    })
    return(
        <>
        {showRegistrationModal && (<RegisterEmployeeModal reFetch={fetchEmployees} onClose={() => setShowRegistrationModal(false)}/>)}
        <section className="min-h-screen w-full bg-white pl-80 py-10 space-y-10">
                
                <Admin_Sidebar/>
                <div className="mx-10">
                    <h2 className="text-3xl font-bold text-gray-800">Teacher Management</h2>
                    <p className="text-gray-400 text-md">
                   Manage student accounts, monitor learning progress, and keep track of student information and activities.
                    </p>
               </div>
        
                {/* Student Container */}
                    <div className="bg-white rounded-xl mx-10">
                            
                {/* Teacher Container */}
                <div className="bg-white rounded-xl pb-2">
                      <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl">
                        <div>
                    <h1 className="text-lg font-bold text-gray-500 rounded-full">Teacher Table</h1>
                    <p className="text-gray-400 text-sm">Manage student accounts, progress, and information.</p>
                </div>
                        <div className="h-full space-x-2 justtify-center items-center flex">
                            <input type="search" 
                            placeholder="Search by name, grade, or branch" 
                            className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="border-1 border-blue-500 h-10 rounded-full text-blue-500 cursor-pointer text-sm font-semibold px-4 hover:bg-blue-600 hover:text-white" onClick={displayRegistration}>+ New Teacher</button>
                        </div>
                      </div>
                      
                        <div className="bg-white h-100 w-full rounded-b-xl pb-10">
                            {/* Columns */}
                        <div className="bg-gray-300 h-12 w-full rounded-xl justify-center items-center flex px-4">
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">No.</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Lastname</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Firstname</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Date of birth</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Email</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Contact</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Grade level</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Branch</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Role</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Created At</h1>
                            </div>
                            <div className="flex-1 bg">
                                <h1 className="text-sm font-semibold text-white">Actions</h1>
                            </div>
                        </div>
                        {/* Rows */}
                        {filteredTeachers.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full justify-center items-center flex rounded-b-xl px-4 mt-2">
                                <p className="text-gray-500">No teachers found.</p>
                            </div>
                        )}
                        {filteredTeachers.map((employee, index) => {

                            const updatedCreatedAt = new Date(employee.createdAt).toISOString().split("T")[0];

                            return(
                                <div key={employee.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-100 justify-center items-center flex px-4 py-2 mt-2 hover:bg-blue-100 cursor-pointer">
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{index + 1}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.lastname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.firstname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.year}/{employee.month}/{employee.day}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.email}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.contact}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.gradeLevel}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.branch}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                            <p className={`text-white ${employee.role === "Teacher" ? "bg-green-500" : "bg-blue-500"} rounded-full inline-flex px-2`}>{employee.role}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{updatedCreatedAt}</p>
                                    </div>
                                    <div className="w-[10%] break-words flex gap-2">
                                            <button className="h-10 w-10 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => alert('Soon')}>Vw</button>
                                            <button className="h-10 w-10 bg-amber-500 text-white rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => alert('Soon')}>Edit</button>
                                            <button className="h-10 w-10 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => alert('Soon')}>Del</button>
                                            
                                        </div>
                                        
                                </div>
                            )
                        })}
                        </div>
                   </div>
                   </div>
               </section>
        </>
    )
}
export default Admin_Teacher_Page;