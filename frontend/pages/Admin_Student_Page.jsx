import Admin_Sidebar from "../components/Admin_Sidebar"
import axios from "axios"
import { useState, useEffect } from "react"
import Edit_Student_Modal from "../modals/Edit_Student_Modal"
import RegisterStudentModal from "../modals/RegisterStudentModal"
import Confirmation_Popup from "../popup/Confirmation_Popup"


const Admin_Student_Page = () => {

    const [AllStudents, setStudentList] = useState([]);

    const [search, setSearch] = useState('');
    const filteredStudent = AllStudents.filter((student) => {
        const fullName = `${student.firstname} ${student.lastname}`.toLowerCase();
        const gradeLevel = student.gradeLevel.toLowerCase();
        const branch = student.branch.toLowerCase();
        return fullName.includes(search.toLowerCase()) || gradeLevel.includes(search.toLowerCase()) || branch.includes(search.toLowerCase());
    })

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showStudentRegistration, setShowStudentRegistration] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const handleEditStudent = (student) => {
        setSelectedStudent(student);
        setShowEditModal(true);
    };

    const handleRegistration = () => {
        setShowStudentRegistration(true);
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
    const deleteConfirmation = (student) => {
          setSelectedStudent(student);
          setShowConfirmationPopup(true);
    }
    const deleteStudent = async (studentId) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-student/${selectedStudent.id}`);
            console.log(res.data.message);
            fetchStudents();
            alert('Successfully deleted student');
          } catch (error) {
            console.log(error)
          }
          setShowConfirmationPopup(false);
    }

    return(
        <>
        {showConfirmationPopup && (<Confirmation_Popup onConfirm={() => deleteStudent(selectedStudent?.id)} onCancel={() => setShowConfirmationPopup(false)} />)}
        {showEditModal && (<Edit_Student_Modal selectedStudent={selectedStudent} closeEditStudentModal={() => setShowEditModal(false)} onRefresh={fetchStudents}/>)}
        {showStudentRegistration && (<RegisterStudentModal closeStudentModal={() => setShowStudentRegistration(false)} reFetchStudent={fetchStudents} />)}
       <section className="min-h-screen w-full bg-white pl-80 py-10 space-y-10">
        
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
                        <div>
                          <h1 className="text-lg font-bold text-gray-500 rounded-full">Students Table</h1>
                          <p className="text-gray-400 text-sm">Manage student accounts, progress, and information.</p>
                        </div>
                        

                        <div className="space-x-2 justify-center ittems-center flex">
                            <input type="search" 
                                   placeholder="Search by name, grade, or branch" 
                                   className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="border-1 border-blue-500 h-10 rounded-full text-blue-500 cursor-pointer text-sm font-semibold px-4 hover:bg-blue-500 hover:text-white" onClick={handleRegistration}>+ New Student</button>    
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
                        {filteredStudent.length < 1 && (
                            <div className="bg-gray-100 h-15 w-full rounded-xl justify-center items-center flex px-4 py-2 mt-2">
                                <p className="text-gray-500">No students found.</p>
                            </div>
                        )}
                        {
                            filteredStudent.map((student, index) => {

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
                                        <button className="bg-blue-500 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-blue-600" onClick={() => alert('Soon')}>
                                            Vw
                                        </button>
                                        <button className="bg-amber-500 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-amber-600" onClick={() => handleEditStudent(student)}>
                                            Edt
                                        </button>
                                        <button className="bg-red-500 text-white h-10 w-10 rounded-lg cursor-pointer hover:bg-red-600" onClick={() => deleteConfirmation(student)}>
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
       </>
    )
}
export default Admin_Student_Page;