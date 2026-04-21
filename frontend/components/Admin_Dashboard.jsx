import { useState } from "react";

const Admin_Dashboard = ({AllStudents, AllEmployees}) => {
    const set_data = [
            { header: "Total no. of students", value: AllStudents.length },
            { header: "Total no. of employees", value: AllEmployees.length },
            { header: "Total no. of materials", value: 0 }
    ];

    const [studentList, setStudentList] = useState([]);

    return(
        <section className="h-screen w-full border-b-1 border-gray-300 justify-start items-center flex px-20 py-25 gap-4">

            <div className="bg-white h-full w-100 border-1 border-emerald-500 justify-between items-start flex flex-col p-4 rounded-xl gap-2">
                <div className="w-full space-y-2">
                    <div className=" h-12 w-full bg-emerald-700 rounded-xl justify-center items-center flex">
                        <h1 className="text-sm font-semibold text-white">Little Me Library System</h1>
                    </div>
                    <div className="space-y-2 w-full">
                        <button className="h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white">➜ Overview</button>
                        <button className="h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white">➜ Materials</button>
                        <button className="h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white">➜ Users</button>

                    </div>
                </div>

                <div className="space-y-2 w-full">
                        <button className="bg-red-100 h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white">➜ Logout</button>

                </div>

                    
                    
            </div>

            <div className="h-full w-3/4 justify-center items-center flex flex-col gap-6">
                    
                    <div className="w-full justify-start items-start flex flex-col">
                        
                        <h1 className="text-4xl">Hello User, Good day 👋</h1>
                        <h1 className="text-sm text-gray-500">Let's check today's activity</h1>
                        <h1 className="text-sm bg-emerald-100 text-emerald-400 rounded-full px-2 border-1 mt-2">User - Admin Page</h1>
                    </div>

                    <div className="h-50 w-full grid grid-cols-3 gap-2 mb-4">
                        {set_data.map((data, index) => (
                            <div key={index} className="h-full w-full bg-gradient-to-tl from-green-500 via-emerald-600 to-emerald-500 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{data.header}</h1>
                                <h1 className="text-4xl text-white font-bold">{data.value}</h1>
                            </div>
                        ))}
                    </div>

                    <div className="h-80 w-full gap-2 flex">
                         <div className="h-full w-1/2 p-2 flex flex-col gap-2 rounded-xl shadow-md">
                               <div className="h-12 w-full border-b-1 border-emerald-500 justify-between items-center flex p-2">
                                 <h1 className="text-sm font-semibold text-emerald-500">Newest Added Students</h1>
                                 <h1 className="text-sm font-semibold text-emerald-500 underline">View all</h1>
                               </div>
                               {studentList.length < 1 && (
                                    <div className="h-12 w-full bg-emerald-100 rounded-xl justify-center items-center flex">
                                         <h1 className="text-emerald-500 text-sm">No students found.</h1>
                                    </div>
                                )}
                         </div>

                         <div className="h-full w-1/2 p-2 flex flex-col gap-2 rounded-xl shadow-md">
                               <div className="h-12 w-full border-b-1 border-emerald-500 justify-between items-center flex p-2">
                                 <h1 className="text-sm font-semibold text-emerald-500">Newest Added Employee</h1>
                                 <h1 className="text-sm font-semibold text-emerald-500 underline">View all</h1>
                               </div>
                               {studentList.length < 1 && (
                                    <div className="h-12 w-full bg-emerald-100 rounded-xl justify-center items-center flex">
                                         <h1 className="text-emerald-500 text-sm">No employee found.</h1>
                                    </div>
                                )}
                         </div>
                         
                         
                    </div>
            </div>

            <div className=" h-full w-1/4 justify-center items-center flex p-4">
                <div className="border-l-2 border-emerald-500 h-full w-full justify-center items-center flex">
                    <h1 className="text-md font-bold text-emerald-300">Nothing yet this part!</h1>
                </div>
                    
            </div>
            
              
        </section>
    )
}
export default Admin_Dashboard