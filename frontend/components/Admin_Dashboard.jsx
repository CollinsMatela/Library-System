import { useState } from "react";

const Admin_Dashboard = ({AllStudents, AllEmployees}) => {
    const set_data = [
            { header: "Total no. of students", value: AllStudents.length },
            { header: "Total no. of employees", value: AllEmployees.length },
            { header: "Total no. of materials", value: 0 }
    ];

    const [studentList, setStudentList] = useState([]);

    return(
        <section className="h-screen w-full border-b-1 border-gray-300 justify-start items-center flex px-20 pt-20 pb-10 gap-4">

            <aside className="bg-white h-full w-100 shadow-md justify-between items-start flex flex-col p-4 rounded-2xl gap-2">
                <div className="w-full space-y-2">
                    <div className=" h-12 w-full rounded-xl justify-center items-center flex">
                        <h1 className="text-sm font-semibold text-emerald-500">Little Me Library System</h1>
                    </div>
                    <div className="space-y-2 w-full">
                        <button className="h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white">➜ Overview</button>
                        <button className="h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white">➜ Materials</button>
                        <button className="h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-600 hover:text-white">➜ Users</button>

                    </div>
                </div>

                <div className="space-y-2 w-full">
                        <button className="bg-gray-100 h-12 w-full text-start px-10 rounded-xl cursor-pointer text-sm font-bold text-gray-600 hover:bg-gray-600 hover:text-white">➜ Logout</button>

                </div>

                    
                    
            </aside>

            <div className="h-full w-full justify-start items-center flex flex-col gap-2 pt-4 space-y-4">
                    
                    <div className="min-h-[100px] w-full justify-start items-start flex flex-col rounded-xl p-2">
                        <p className="text-xl">Hello User, Good day 👋</p>
                        <p className="text-sm text-gray-500">Let's check today's activity</p>
                        <p className="text-sm bg-emerald-100 text-emerald-400 rounded-full px-2 border-1 mt-2">User - Admin Page</p>
                    </div>

                    <div className=" max-h-[500px] w-full grid grid-cols-3 gap-2">
                        
                            <div className="w-full bg-gradient-to-tl from-green-500 via-emerald-600 to-emerald-500 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{set_data[0].header}</h1>
                                <h1 className="text-4xl text-white font-bold">{set_data[0].value}</h1>
                            </div>
                            <div className="w-full bg-gradient-to-tl from-green-500 via-emerald-600 to-emerald-500 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{set_data[1].header}</h1>
                                <h1 className="text-4xl text-white font-bold">{set_data[1].value}</h1>
                            </div>
                            <div className="w-full bg-gradient-to-tl from-green-500 via-emerald-600 to-emerald-500 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{set_data[2].header}</h1>
                                <h1 className="text-4xl text-white font-bold">{set_data[2].value}</h1>
                            </div>
                       
                    </div>
                    
                    <div className="w-full justify-center items-start flex gap-2">
                        <div className="bg-white w-full p-2 flex flex-col gap-2 rounded-xl shadow-md">
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

                        <div className="bg-white w-full p-2 flex flex-col gap-2 rounded-xl shadow-md">
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

                        <div className="bg-white w-full p-2 flex flex-col gap-2 rounded-xl shadow-md">
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

                    <div className="bg-white h-full w-full shadow-md rounded-xl p-4">
                        <h1 className="font-semibold text-gray-500">Top Visited Stories</h1>
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