import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin_Dashboard = ({AllStudents, AllEmployees}) => {
    const navigate = useNavigate();

    const set_data = [
            { header: "Total no. of students", value: AllStudents.length },
            { header: "Total no. of employees", value: AllEmployees.length },
            { header: "Total no. of materials", value: 0 }
    ];

    const [studentList, setStudentList] = useState([]);

    return(
        <section className="h-screen w-full border-b-1 border-gray-300 justify-start items-center flex px-30 pt-15 pb-5 gap-4">

            <div className="h-full w-full justify-start items-center flex flex-col gap-2 pt-4 space-y-2">
                    
                    <div className="w-full justify-start items-start flex flex-col rounded-xl p-2">
                        <p className="text-2xl text-gray-700 font-semibold">Hello User, Good day 👋</p>
                        <p className="text-sm text-gray-500">Let's check today's activity</p>
                        {/* <p className="text-sm bg-emerald-100 text-emerald-400 rounded-full px-2 border-1 mt-2">User - Admin Page</p> */}
                    </div>

                    <div className="w-full bg-white rounded-xl flex p-2 gap-2">

                    <button className="h-12 w-full bg-white cursor-pointer text-xs font-semibold text-gray-400 hover:bg-gray-200 hover:text-white">
                        Overview
                    </button>

                    <button
                        className="h-12 w-full text-left px-4 cursor-pointer text-xs font-semibold text-gray-400 hover:bg-gray-200 hover:text-white"
                        onClick={() => navigate(`/admin-page/upload`)}
                    >
                        Manual Upload
                    </button>
  
                    <button className="h-12 w-full text-left px-4 cursor-pointer text-xs font-semibold text-gray-400 hover:bg-gray-200 hover:text-white">
                        AI Upload
                    </button>

                    <button className="h-12 w-full text-left px-4 cursor-pointer text-xs font-semibold text-gray-400 hover:bg-gray-200 hover:text-white">
                        View Stories
                    </button>

                    <button className="h-12 w-full text-left px-4 cursor-pointer text-xs font-semibold text-gray-400 hover:bg-gray-200 hover:text-white">
                        Accounts
                    </button>

                    </div>
                

                    <div className=" max-h-[500px] w-full grid grid-cols-3 gap-2">
                        
                            <div className="w-full bg-pink-600 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{set_data[0].header}</h1>
                                <h1 className="text-4xl text-white font-bold">{set_data[0].value}</h1>
                            </div>
                            <div className="w-full bg-pink-600 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{set_data[1].header}</h1>
                                <h1 className="text-4xl text-white font-bold">{set_data[1].value}</h1>
                            </div>
                            <div className="w-full bg-pink-600 rounded-xl p-4 space-y-2">
                                <h1 className="text-sm text-white">{set_data[2].header}</h1>
                                <h1 className="text-4xl text-white font-bold">{set_data[2].value}</h1>
                            </div>
                       
                    </div>

                    <div className="bg-white h-full w-full shadow-md rounded-xl p-4">
                        <h1 className="font-semibold text-gray-500">Top Visited Stories</h1>
                    </div>
                    

            </div>
            
              
        </section>
    )
}
export default Admin_Dashboard