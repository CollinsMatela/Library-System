import { useNavigate } from "react-router-dom";

const Not_Found_Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        
        <h1 className="text-7xl font-extrabold text-gray-600">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-400">
         Page Not Found
        </h2>
          
          <button
            onClick={() => navigate(-1)}
            className="w-fit px-4 py-2 mt-2 bg-black text-white text-xs rounded-xl font-semibold hover:-translate-y-1 cursor-pointer transition"
          >
            Return
          </button>



    </div>
  );
};

export default Not_Found_Page;