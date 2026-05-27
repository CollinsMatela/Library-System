import useAuthStore from "../store/useAuthStore"

const Admin_Navigation = ({title}) => {
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () =>{
          logout();
          localStorage.removeItem("token");
          navigate("/");
    }  

    return(
      <nav className="sticky top-0 z-0 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm px-8 md:px-16 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-500">{title}</h1>
      <button onClick={handleLogout} className="bg-gray-300 hover:bg-pink-400 text-white px-6 py-2 rounded-full transition duration-300">
        Logout
      </button>
    </nav>
    )
}
export default Admin_Navigation