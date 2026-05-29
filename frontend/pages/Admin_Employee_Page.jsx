import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import EditEmployeeModal from "../modals/Edit_Employee_Modal"
import Edit_Employee_Modal from "../modals/Edit_Employee_Modal"
import View_Employee_Modal from "../modals/View_Employee_Modal"

const Admin_Employee_Page = () => {

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewEmployee, setShowViewEmployee] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [employeeList, setEmployeeList] = useState([]);
    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-employees`);
            console.log(res.data.message);
            setEmployeeList(res.data.employees);
            console.log(res.data.employees.length)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      fetchEmployees();
    },[])

    const displayConfirmation = (employee) => {
          setSelectedEmployee(employee)
          setShowConfirmation(true);
    }

    const deleteEmployee = async () => {
        console.log(selectedEmployee.id);
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-employee/${selectedEmployee.id}`);
            console.log(res.data.message);
            fetchEmployees();
        } catch (error) {
            console.log(error)
        }
    }

    const displayRegistration = () => {
          setShowRegistrationModal(true);
    }
    const displayEdit = (employee) => {
          setSelectedEmployee(employee)
          setShowEditModal(true)
    }
    const  displayView = (employee) => {
            setSelectedEmployee(employee)
            setShowViewEmployee(true)
    }

    const [searchStudent, setSearchStudent] = useState("");
    const [searchAdministrator, setSearchAdministrator] = useState("");
    const filterTeacher = employeeList.filter((teacher) => teacher.role.toLowerCase() === "teacher");
    const filterAdministrator = employeeList.filter((administrator) => administrator.role.toLowerCase() === "administrator");
    
    const filteredTeachers = filterTeacher.filter((teacher) => {
          const fullName = `${teacher.lastname} ${teacher.firstname}`;
          const gradeLevel = teacher.gradeLevel;
          const branch = teacher.branch;
          return fullName.toLowerCase().includes(searchStudent) || gradeLevel.toLowerCase().includes(searchStudent) || branch.toLowerCase().includes(searchStudent);
    })
    const filteredAdministrator = filterAdministrator.filter((administrator) => {
          const fullName = `${administrator.lastname} ${administrator.firstname}`;
          return fullName.toLowerCase().includes(searchAdministrator);
    })
    return(
        <>
        {showConfirmation && (<Confirmation_Popup onConfirm={() => {deleteEmployee(); setShowConfirmation(false)}} 
                                                  onCancel={() => setShowConfirmation(false)}/>)}
        {showRegistrationModal && (<RegisterEmployeeModal reFetch={fetchEmployees} onClose={() => setShowRegistrationModal(false)}/>)}
        {showEditModal && (<Edit_Employee_Modal employee={selectedEmployee} reFetch={fetchEmployees} onClose={() => setShowEditModal(false)}/>)}
        {showViewEmployee && (<View_Employee_Modal employee={selectedEmployee} onClose={() => setShowViewEmployee(false)}/>)}
        <section className="min-h-screen w-full bg-white pl-80 py-10 space-y-10">
                
                <Admin_Sidebar/>
                <div className="mx-10 justify-between items-start flex">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">Employee Management</h2>
                      <p className="text-gray-400 text-md">Manage employee accounts and oversee staff informations.</p>
                    </div>
                    <div>
                       <button className="bg-white border-1 border-gray-800 h-10 rounded-2xl text-gray-800 cursor-pointer text-sm font-semibold px-4 hover:bg-gray-800 hover:text-white" onClick={displayRegistration}>+ Register Employee</button>
                    </div>
                    
               </div>
        
                
                <div className="bg-white rounded-xl mx-10">
                            
                {/* Teacher Container */}
                <div className="bg-white rounded-xl pb-2 ">
                      <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl">
                <div>
                    <h1 className="text-lg font-bold text-gray-500 rounded-full">Teacher Table</h1>
                    <p className="text-gray-400 text-sm">Manage teacher account's information.</p>
                </div>

                <div className="h-full space-x-2 justtify-center items-center flex">
                    <input type="search" 
                    placeholder="Search teacher by name, grade, or branch" 
                    className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                    value={searchStudent}
                    onChange={(e) => setSearchStudent(e.target.value)}
                    />
                    
                </div>
                      </div>

                          {/* Columns */}
                        <div className="bg-gray-900 h-12 w-full rounded-xl justify-between items-center flex px-4">

                            <div className="w-100 justify-start items-center flex gap-4">
                                <h1 className="text-sm font-semibold text-white mr-14">No.</h1>
                                <h1 className="text-sm font-semibold text-white">Fullname</h1>
                            </div>
                            
                            
                            <div className="w-100 justify-start items-center flex">
                                        <div className="w-1/3">
                                          <h1 className="text-sm font-semibold text-white">Grade</h1>
                                        </div>
                                        <div className="w-1/3">
                                          <h1 className="text-sm font-semibold text-white">Branch</h1>
                                        </div>
                                        <div className="w-1/3">
                                          <h1 className="text-sm font-semibold text-white">Role</h1>
                                        </div>                                   
                            </div>
                            
                            <div className="w-[10%]">
                                <h1 className="text-sm font-semibold text-white">Actions</h1>
                            </div>
                        </div>
                      
                        <div className="max-h-100  w-full rounded-b-xl overflow-y-scroll">
                        {/* Rows */}
                        {filteredTeachers.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full justify-center items-center flex rounded-b-xl px-4 mt-2">
                                <p className="text-gray-500">No teachers found.</p>
                            </div>
                        )}
                        {filteredTeachers.map((employee, index) => {

                            return(
                                <div key={employee.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 justify-between items-center flex px-4 py-2 mt-2 hover:bg-blue-100 hover:border-blue-300 cursor-pointer">
                                    <div className="w-100 justify-start items-center flex gap-4">
                                        <p className="text-gray-500">{index + 1}</p>
                                        <img src="" className="bg-gray-100 h-12 w-12 rounded-full" />
                                        <p className="text-gray-500">{employee.lastname}, {employee.firstname}, {employee.middlename}</p>
                                    </div>

                                    <div className="w-100 justify-start items-center flex">
                                        <div className="w-1/3">
                                          <p className="text-gray-500">{employee.gradeLevel}</p>
                                        </div>
                                        <div className="w-1/3">
                                          <p className="text-gray-500">{employee.branch}</p>
                                        </div>
                                        <div className="w-1/3">
                                          <p className="text-gray-500">{employee.role}</p>
                                        </div>                                   
                                    </div>
                                    
                                    <div className="w-[10%] break-words flex gap-2">
                                            <button className="h-10 w-10 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => displayView(employee)}>Vw</button>
                                            <button className="h-10 w-10 bg-amber-500 text-white rounded-lg cursor-pointer hover:bg-amber-600" onClick={() => displayEdit(employee)}>Edit</button>
                                            <button className="h-10 w-10 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600" onClick={() => displayConfirmation(employee)}>Del</button>
                                
                                    </div>
                                        
                                </div>
                            )
                        })}
                        </div>
                   </div>
                   </div>

                {/* Administrator Container */}
                
                <div className="bg-white rounded-xl pb-2">
                <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl px-10">
                    <div>
                        <h1 className="text-lg font-bold text-gray-500 rounded-full">Administrator Table</h1>
                        <p className="text-gray-400 text-sm">Manage administrator account's information.</p>
                    </div>

                    <div className="h-full space-x-2 justtify-center items-center flex">
                        <input type="search" 
                        placeholder="Search administrator by name." 
                        className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                        value={searchAdministrator}
                        onChange={(e) => setSearchAdministrator(e.target.value)}
                        />
                    </div>
                </div>
                      
                <div className="w-full rounded-b-xl px-10">
                {/* Columns */}
                <div className="bg-gray-900 h-12 w-full rounded-xl justify-between items-center flex px-4">

                    <div className="w-100 justify-start items-center flex gap-4">
                        <h1 className="text-sm font-semibold text-white mr-14">No.</h1>
                        <h1 className="text-sm font-semibold text-white">Fullname</h1>
                    </div>
                    
                    
                    <div className="w-100 justify-start items-center flex">
                                <div className="w-1/3">
                                    <h1 className="text-sm font-semibold text-white">Role</h1>
                                </div>                                   
                    </div>
                    
                    <div className="w-[10%]">
                        <h1 className="text-sm font-semibold text-white">Actions</h1>
                    </div>
                </div>

                <div className="bg-white max-h-100  rounded-xl overflow-y-scroll">
                            
    
                        {/* Rows */}
                        {filteredAdministrator.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full justify-center items-center flex rounded-b-xl px-4 mt-2">
                                <p className="text-gray-500">No teachers found.</p>
                            </div>
                        )}
                        {filteredAdministrator.map((employee, index) => {

                            return(
                                <div key={employee.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 justify-between items-center flex px-4 py-2 mt-2 hover:bg-blue-100 hover:border-blue-300 cursor-pointer">
                                    <div className="w-100 justify-start items-center flex gap-4">
                                        <p className="text-gray-500">{index + 1}</p>
                                        <img src="" className="bg-gray-100 h-12 w-12 rounded-full" />
                                        <p className="text-gray-500">{employee.lastname}, {employee.firstname}, {employee.middlename}</p>
                                    </div>

                                    <div className="w-100 justify-start items-center flex">
                                        <div className="w-1/3">
                                          <p className="text-gray-500">{employee.role}</p>
                                        </div>                                   
                                    </div>
                                    
                                    <div className="w-[10%] break-words flex gap-2">
                                            <button className="h-10 w-10 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => displayView(employee)}>Vw</button>
                                            <button className="h-10 w-10 bg-amber-500 text-white rounded-lg cursor-pointer hover:bg-amber-600" onClick={() => displayEdit(employee)}>Edit</button>
                                            <button className="h-10 w-10 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600" onClick={() => displayConfirmation(employee)}>Del</button>
                                
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
export default Admin_Employee_Page;