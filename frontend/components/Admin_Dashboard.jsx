
const Admin_Dashboard = () => {
    const set_data = [
            { header: "Total no. of students", value: 0 },
            { header: "Total no. of employees", value: 0 },
            { header: "Total no. of materials", value: 0 }
    ];
    return(
        <section className="bg-white h-100 w-full justify-start items-center flex px-10 py-10">

            <div className="h-full w-3/4 justify-center items-center flex flex-col gap-6">
                    
                    <div className="w-full justify-start items-start flex flex-col">
                        
                        <h1 className="text-4xl">Hello User, Good day 👋</h1>
                        <h1 className="text-sm text-gray-500">Let's check today's activity</h1>
                        <h1 className="text-sm bg-emerald-100 text-emerald-400 rounded-full px-2 border-1 mt-2">User - Admin Page</h1>
                    </div>

                    <div className="h-50 w-full grid grid-cols-3 gap-2 mb-4">
                        {set_data.map((data) => (
                            <div className="h-full w-full border-1 border-gray-300 rounded-xl p-4">
                                <h1 className="text-sm text-gray-500">{data.header}</h1>
                            </div>
                        ))}
                    </div>
            </div>

            <div className="h-full w-1/4 justify-center items-center flex p-4">
                <div className="border-l-2 border-gray-300 h-full w-full justify-center items-center flex">
                    <h1 className="text-md font-bold text-gray-300">Coming Soon!</h1>
                </div>
                    
            </div>
            
              
        </section>
    )
}
export default Admin_Dashboard