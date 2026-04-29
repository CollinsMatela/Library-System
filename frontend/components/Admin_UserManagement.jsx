import axios from "axios"

const Admin_UserManagement = ({AllStudents, AllEmployees, reFetchEmployee, reFetchStudent,  openStudentModal, openEmployeeModal, handleEditStudent, handleEditEmployee}) => {

    const deleteStudent = async (studentId) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-student/${studentId}`);
            console.log(res.data.message);
            reFetchStudent();

          } catch (error) {
            console.log(error)
          }
    }
    const deleteEmployee = async (employeeId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-employee/${employeeId}`);
            console.log(res.data.message);
            reFetchEmployee();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <section className="w-full py-5 px-30">
            
                <div className="w-full space-y-5">

                   {/* Student Container */}
                  <div className="bg-white shadow-lg rounded-xl pb-2">

                    <div className="h-20 w-full justify-between items-center flex rounded-t-xl px-4">
                        <h1 className="text-lg font-semibold text-gray-700 rounded-full">Students Account</h1>

                        <div className="space-x-2 justify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Student Name" className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4"/>
                            <button className="border-1 border-blue-500 h-10 rounded-full text-blue-500 cursor-pointer text-sm font-semibold px-4 hover:bg-blue-500 hover:text-white" onClick={openStudentModal}>+ New Student</button>    
                        </div>
                    </div>   
                    
                    <div className="h-100 w-full rounded-b-xl px-4 overflow-y-scroll pb-10">
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
                                <h1 className="text-sm font-semibold text-white">Parent email</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Parent contact</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Grade level</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Branch</h1>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-sm font-semibold text-white">Created At</h1>
                            </div>
                            <div className="flex-1 bg">
                                <h1 className="text-sm font-semibold text-white">Actions</h1>
                            </div>
                        </div>
                        {/* Rows */}
                        {AllStudents.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full rounded-xl justify-center items-center flex px-4 py-2 mt-2">
                                <p className="text-gray-500">No students found.</p>
                            </div>
                        )}
                        {
                            AllStudents.map((student, index) => {

                                const updatedCreatedAt = new Date(student.createdAt).toISOString().split("T")[0];;
                                
                                return (
                                <div key={student.student.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-100 justify-center items-center flex px-4 py-2 mt-2 hover:bg-blue-100 cursor-pointer">
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
                                        <button className="bg-blue-600 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-700">
                                            Vw
                                        </button>
                                        <button className="bg-blue-600 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => handleEditStudent(student)}>
                                            Edt
                                        </button>
                                        <button className="bg-blue-600 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => deleteStudent(student.student.id)}>
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
                   <div className="bg-white shadow-lg rounded-xl pb-2">
                      <div className="bg-white h-20 w-full justify-between items-center flex rounded-t-xl px-4">
                        <h1 className="text-lg font-semibold text-gray-800 rounded-full">Employees Account</h1>
                        <div className="h-full space-x-2 justtify-center items-center flex">
                            <input type="search" name="search" id="" placeholder="Search Teacher Name" className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4"/>
                            <button className="border-1 border-blue-500 h-10 rounded-full text-blue-500 cursor-pointer text-sm font-semibold px-4 hover:bg-blue-600 hover:text-white" onClick={openEmployeeModal}>+ New Employee</button>
                        </div>
                      </div>
                      
                        <div className="bg-white h-100 w-full rounded-b-xl px-4 overflow-y-scroll pb-10">
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
                        {AllEmployees.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full justify-center items-center flex rounded-b-xl px-4 mt-2">
                                <p className="text-gray-500">No employees found.</p>
                            </div>
                        )}
                        {AllEmployees.map((employee, index) => {

                            const updatedCreatedAt = new Date(employee.createdAt).toISOString().split("T")[0];

                            return(
                                <div key={employee.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-100 justify-center items-center flex px-4 py-2 mt-2 hover:bg-blue-100 cursor-pointer">
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
                                            <button className="h-10 w-10 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => alert('Soon')}>Vw</button>
                                            <button className="h-10 w-10 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => handleEditEmployee(employee)}>Edit</button>
                                            <button className="h-10 w-10 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => deleteEmployee(employee.id)}>Del</button>
                                            
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