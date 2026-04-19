import { useState, useEffect } from "react"
import axios from "axios"

const Admin_UserManagement = ({refreshStudents, refreshEmployees, openStudentModal, openEmployeeModal, handleEditStudent, handleEditEmployee}) => {

    const [studentList, setStudentList] = useState([])
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        fetchStudents()
        fetchEmployees()
    }, [])

    useEffect(() => {
        fetchStudents()
    },[refreshStudents])

    useEffect(() => {
        fetchEmployees()
    },[refreshEmployees])

    const fetchStudents = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-students`)
            console.log(res.data.message);
            setStudentList(res.data.students);
        } catch (error) {
            console.log(error)
        }
    }
    const fetchEmployees = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-employees`);
            console.log(res.data.message);
            setEmployeeList(res.data.employees);

        } catch (error) {
            console.log(error)
        }
    }
    const deleteStudent = async (studentId) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-student/${studentId}`);
            console.log(res.data.message);
            fetchStudents();

          } catch (error) {
            console.log(error)
          }
    }
    const deleteEmployee = async (employeeId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-employee/${employeeId}`);
            console.log(res.data.message);
            fetchEmployees();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <section className="bg-gray-50 w-full p-10 border-t-1 border-gray-300 ">
            
                
              <h1 className="text-2xl font-semibold mb-4">User Management</h1>
                <div className="w-full space-y-5">

                   {/* Parent/Student Container */}
                  <div className="border-2 border-gray-300 rounded-xl">

                    <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl px-4">
                        <h1 className="text-base text-black">Parent | Student Management Account +{studentList.length}</h1>

                        <div className="space-x-2 justtify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Student Name" className="bg-white border-2 border-gray-300 h-10 w-80 rounded-xl px-4"/>
                            <button className="bg-black h-10 rounded-full text-white cursor-pointer text-sm px-4" onClick={openStudentModal}>+ New Student</button>    
                        </div>
                    </div>   
                    
                    <div className="bg-white h-100 w-full rounded-b-xl px-4 overflow-y-scroll pb-10">
                        {/* Columns */}
                        <div className="bg-black h-12 w-full rounded-xl justify-center items-center flex px-4">
                            <div className="flex-1">
                                <h1 className="text-sm text-white">No.</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Lastname</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Firstname</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Date of birth</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Parent email</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Parent contact</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Grade level</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Branch</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Created At</h1>
                            </div>
                            <div className="flex-1 bg">
                                <h1 className="text-sm text-white">Actions</h1>
                            </div>
                        </div>
                        {/* Rows */}
                        {studentList.length < 1 && (
                            <div className="bg-gray-100 h-12 w-full rounded-xl justify-center items-center flex px-4 py-2 mt-2">
                                <p className="text-gray-500">No students found.</p>
                            </div>
                        )}
                        {
                            studentList.map((student, index) => {

                                const updatedCreatedAt = new Date(student.createdAt).toISOString().split("T")[0];;
                                
                                return (
                                <div key={student.student.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 justify-center items-center flex px-4 py-2 mt-2 hover:bg-gray-300 cursor-pointer">
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{index + 1}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.student.lastname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.student.firstname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{`${student.student.month}/${student.student.day}/${student.student.year}`}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.parent.parentEmail}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.parent.parentContact}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.school.gradeLevel}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.school.branch}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{updatedCreatedAt}</p>
                                    </div>
                                    <div className="w-[10%] break-words gap-2 flex">
                                        <button className="bg-gray-300 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-gray-400">
                                            Vw
                                        </button>
                                        <button className="bg-blue-500 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-gray-600" onClick={() => handleEditStudent(student)}>
                                            Edt
                                        </button>
                                        <button className="bg-red-500 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-red-600" onClick={() => deleteStudent(student.student.id)}>
                                            Del
                                        </button>
                                        
                                    </div>
                                </div>
                              )
                              })
                              }
                    </div>    
                  </div>
                   

                   {/* Teacher Container */}
                   <div className="border-2 border-gray-300 rounded-xl">
                      <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl px-4">
                        <h1 className="text-base text-black">Employee Management Account +{employeeList.length}</h1>
                        <div className="h-full space-x-2 justtify-center items-center flex">
                            <input type="search" name="search" id="" placeholder="Search Teacher Name" className="bg-white border-2 border-gray-300 h-10 w-80 rounded-xl px-4"/>
                            <button className="bg-black h-10 rounded-full text-white cursor-pointer text-sm px-4" onClick={openEmployeeModal}>+ New Employee</button>
                        </div>
                      </div>
                      
                        <div className="bg-white h-100 w-full rounded-b-xl px-4 overflow-y-scroll pb-10">
                            {/* Columns */}
                        <div className="bg-black h-12 w-full rounded-xl justify-center items-center flex px-4">
                            <div className="flex-1">
                                <h1 className="text-sm text-white">No.</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Lastname</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Firstname</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Date of birth</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Email</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Contact</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Grade level</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Branch</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Role</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm text-white">Created At</h1>
                            </div>
                            <div className="flex-1 bg">
                                <h1 className="text-sm text-white">Actions</h1>
                            </div>
                        </div>
                        {/* Rows */}
                        {employeeList.length < 1 && (
                            <div className="bg-gray-100 h-12 w-full justify-center items-center flex rounded-b-xl px-4 mt-2">
                                <p className="text-gray-500">No employees found.</p>
                            </div>
                        )}
                        {employeeList.map((employee, index) => {

                            const updatedCreatedAt = new Date(employee.createdAt).toISOString().split("T")[0];

                            return(
                                <div key={employee.employee_information.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 justify-center items-center flex px-4 py-2 mt-2 hover:bg-gray-300 cursor-pointer">
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{index + 1}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.personal_information.lastname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.personal_information.firstname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.personal_information.year}-{employee.personal_information.month}-{employee.personal_information.day}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.personal_information.email}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.personal_information.contact}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.employee_information.gradeLevel}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{employee.employee_information.branch}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                            <p className={`text-white ${employee.employee_information.role === "Administrator" ? "bg-green-500" : "bg-blue-500"} rounded-full inline-flex px-2`}>{employee.employee_information.role}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-gray-500">{updatedCreatedAt}</p>
                                    </div>
                                    <div className="w-[10%] break-words flex gap-2">
                                            <button className="h-10 w-10 bg-gray-300 text-white rounded-lg cursor-pointer hover:bg-gray-400" onClick={() => alert('Soon')}>Vw</button>
                                            <button className="h-10 w-10 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => handleEditEmployee(employee)}>Edit</button>
                                            <button className="h-10 w-10 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600" onClick={() => deleteEmployee(employee.employee_information.id)}>Del</button>
                                            
                                        </div>
                                        
                                </div>
                            )
                        })}
                        </div>
                   </div>

              </div>
        </section>
    )
}
export default Admin_UserManagement