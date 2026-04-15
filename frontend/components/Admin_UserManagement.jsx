import { useState, useEffect } from "react"
import axios from "axios"
import RegisterStudentModal from "../modals/RegisterStudentModal"
import RegisterEmployeeModal from "../modals/RegisterEmployeeModal"

const Admin_UserManagement = ({refreshStudents, refreshEmployees, openStudentModal, openEmployeeModal}) => {

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

    return(
        <section className="bg-gray-50 w-full p-10 border-t-1 border-gray-300 ">
            
                
              <h1 className="text-xl">User Management</h1>
                <div className="w-full space-y-2 space-y-10">
                   {/* Parent/Student Container */}
                  <div className="border-2 border-gray-300 rounded-xl">

                    <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl px-4">
                        <h1 className="text-base text-black">Parent | Student Management Account</h1>

                        <div className="space-x-2 justtify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Student Name" className="bg-white border-2 border-gray-300 h-10 w-80 rounded-xl px-4"/>
                            <button className="bg-black h-10 rounded-full text-white cursor-pointer text-sm px-4" onClick={openStudentModal}>+ New Student</button>    
                        </div>
                    </div>   
                    
                    <div className="bg-white h-100 w-full rounded-b-xl px-4">
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
                                <div key={student.student.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 justify-center items-center flex px-4 py-2 mt-2">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{index + 1}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{student.student.lastname}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{student.student.firstname}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{`${student.student.month}/${student.student.day}/${student.student.year}`}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{student.parent.parentEmail}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{student.parent.parentContact}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{student.school.gradeLevel}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{student.school.branch}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">{updatedCreatedAt}</p>
                                    </div>
                                    <div className="flex-1">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleDeleteStudent(student.student.id)}>
                                            D
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
                      
                        <div className="bg-white h-100 w-full rounded-b-xl px-4">
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
                                <div key={employee.employee_information.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-300 justify-center items-center flex px-4 py-2 mt-2">
                                    <div className="flex-1">
                                        <p className="text-gray-500">{index + 1}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.personal_information.lastname}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.personal_information.firstname}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.personal_information.year}-{employee.personal_information.month}-{employee.personal_information.day}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.personal_information.email}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.personal_information.contact}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.employee_information.gradeLevel}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{employee.employee_information.branch}</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-500">{updatedCreatedAt}</p>
                                    </div>
                                    <div className="flex-1 flex gap-2">
                                            <button className="flex-1 w-full bg-blue-500 text-white rounded-full">Edit</button>
                                            <button className="flex-1 w-full bg-blue-500 text-white rounded-full">Edit</button>
                                            <button className="flex-1 w-full bg-blue-500 text-white rounded-full">Edit</button>
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