
const Admin_SideBar = () => {
    return(
        <div className="bg-white fixed left-0 h-screen w-80 justify-start items-start flex flex-col pt-10 px-5">
            <div className="border-b-1 border-gray-100 h-12 w-full">
                <h1 className="text-md">LMLC Online Library System</h1>
            </div>
            <div className="space-y-2 mt-10 w-full">
                <button className="h-12 w-full rounded-md cursor-pointer text-xs hover:bg-white">Dashboard</button>
                <button className="h-12 w-full rounded-md cursor-pointer text-xs hover:bg-white">Materials</button>
                <button className="h-12 w-full rounded-md cursor-pointer text-xs hover:bg-white">Students</button>
                <button className="h-12 w-full rounded-md cursor-pointer text-xs hover:bg-white">Teachers</button>
            </div>
           
        </div>
    )
}
export default Admin_SideBar