

const Admin_UserManagement = () => {
    return(
        <section className="bg-white w-full p-10 border-t-1 border-gray-300 ">
              <h1 className="text-xl">User Management</h1>
              <div className="w-full space-y-2 space-y-10">
                   {/* Parent/Student Container */}
                   <div className="space-y-2">
                      <div className="h-10 w-full justify-between items-center flex">
                        <h1 className="text-sm text-gray-300">Parent/Student Management Account</h1>
                        <div className="h-full space-x-2 justtify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Student Name"
                                className="bg-gray-100 h-full w-100 rounded-xl px-4" 
                            />
                            <button className="bg-green-500 h-full w-10 rounded-xl text-xl text-white cursor-pointer">+</button>
                        </div>
                        
                        </div>
                        <div className="bg-gray-100 h-100 w-full rounded-xl">
                            
                        </div>
                   </div>
                   

                   {/* Teacher Container */}
                   <div className="space-y-2">
                      <div className="h-10 w-full justify-between items-center flex">
                        <h1 className="text-sm text-gray-300">Teacher Mangement Management Account</h1>
                        <div className="h-full space-x-2 justtify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Teacher Name"
                                className="bg-gray-100 h-full w-100 rounded-xl px-4" 
                            />
                            <button className="bg-green-500 h-full w-10 rounded-xl text-xl text-white cursor-pointer">+</button>
                        </div>
                        
                        </div>
                        <div className="bg-gray-100 h-100 w-full rounded-xl">
                            
                        </div>
                   </div>

                   {/* Admin Container */}
                   <div className="space-y-2">
                      <div className="h-10 w-full justify-between items-center flex">
                        <h1 className="text-sm text-gray-300">Admin Management Management Account</h1>
                        <div className="h-full space-x-2 justtify-center ittems-center flex">
                            <input type="search" name="search" id="" placeholder="Search Admin Name"
                                className="bg-gray-100 h-full w-100 rounded-xl px-4" 
                            />
                            <button className="bg-green-500 h-full w-10 rounded-xl text-xl text-white cursor-pointer">+</button>
                        </div>
                        
                        </div>
                        <div className="bg-gray-100 h-100 w-full rounded-xl">
                            
                        </div>
                   </div>

              </div>
        </section>
    )
}
export default Admin_UserManagement