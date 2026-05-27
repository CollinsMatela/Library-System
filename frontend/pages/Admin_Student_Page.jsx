import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"

const Admin_Student_Page = () => {

    const [AllStudents, setStudentList] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditStudent = (student) => {
        setSelectedStudent(student);
        setShowEditModal(true);
    };

    const openStudentModal = () => {
        setSelectedStudent(null);
        setShowEditModal(true);
    };

    useEffect(() => {
       fetchStudents();
    },[])
    const fetchStudents = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-students`)
            console.log(res.data.message);
            setStudentList(res.data.students);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStudent = async (studentId) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-student/${studentId}`);
            console.log(res.data.message);
            reFetchStudent();

          } catch (error) {
            console.log(error)
          }
    }

    return(
       <section className="min-h-screen w-full bg-white pl-80 py-10 space-y-10">
        {showEditModal && (<Edit_Student_Modal student={selectedStudent} onClose={() => setShowEditModal(false)} onRefresh={fetchStudents}/>)}
        <Admin_Sidebar/>
        <div className="mx-10">
            <h2 className="text-3xl font-bold text-gray-800">Student Management</h2>
            <p className="text-gray-400 text-md">
           Manage student accounts, monitor learning progress, and keep track of student information and activities.
            </p>
       </div>

        {/* Student Container */}
                  <div className="bg-white rounded-xl mx-10">

                    <div className="h-20 w-full justify-between items-center flex rounded-t-xl">
                        <h1 className="text-lg font-semibold text-gray-700 rounded-full">Students Table</h1>

                        <div className="space-x-2 justify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Student Name" className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4"/>
                            <button className="border-1 border-blue-500 h-10 rounded-full text-blue-500 cursor-pointer text-sm font-semibold px-4 hover:bg-blue-500 hover:text-white" onClick={openStudentModal}>+ New Student</button>    
                        </div>
                    </div>   
                    
                    <div className="h-100 w-full rounded-b-xl pb-10">
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
                                <div key={student.id} className="bg-white min-h-12 w-full rounded-xl border-1 border-gray-100 justify-center items-center flex px-4 py-2 mt-2 hover:bg-blue-100 cursor-pointer">
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{index + 1}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.lastname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.firstname}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{`${student.month}/${student.day}/${student.year}`}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.parentEmail}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.parentContact}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.gradeLevel}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{student.branch}</p>
                                    </div>
                                    <div className="w-[10%] break-words">
                                        <p className="text-sm text-gray-500">{updatedCreatedAt}</p>
                                    </div>
                                    <div className="w-[10%] break-words gap-2 flex">
                                        <button className="bg-blue-600 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => alert('Soon')}>
                                            Vw
                                        </button>
                                        <button className="bg-blue-600 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => handleEditStudent(student)}>
                                            Edt
                                        </button>
                                        <button className="bg-blue-600 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-700" onClick={() => deleteStudent(student.id)}>
                                            Del
                                        </button>
                                        
                                    </div>
                                </div>
                              )
                              })
                              }
                    </div>
                    </div>
       </section>
    )
}
export default Admin_Student_Page;