
const Admin_SideBar = () => {
    return(
        <div className="bg-gray-50 fixed left-0 h-screen w-20 justify-start items-start flex flex-col pt-10 px-5 border-r-1 border-emerald-500 hover:w-80">
            <div className=" h-12 w-12 bg-emerald-500 rounded-xl justify-center items-center flex">
                <h1 className="text-sm font-semibold text-white">LMLC</h1>
            </div>
            <div className="space-y-2 mt-10 w-full">
                <button className="h-12 w-full rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-700 hover:text-white">Overview</button>
                <button className="h-12 w-full rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-700 hover:text-white">Materials</button>
                <button className="h-12 w-full rounded-xl cursor-pointer text-sm font-bold text-emerald-600 hover:bg-emerald-700 hover:text-white">Users</button>

            </div>
           
        </div>
    )
}
export default Admin_SideBar