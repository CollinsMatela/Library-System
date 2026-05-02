import { useNavigate } from "react-router-dom";

const Not_Found_Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 px-4">
        
        <h1 className="text-7xl font-extrabold text-purple-600">404</h1>
        
        <h2 className="text-2xl font-bold mt-4 text-pink-500">
          Oops! Page Not Found
        </h2>
        
        <p className="text-gray-600 mt-2">
          Looks like this page went on an adventure and got lost 📚✨
        </p>

        <div className="mt-6 flex flex-col gap-3">
          
          <button
            onClick={() => navigate("/")}
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition"
          >
            Return to page 🏠
          </button>

        </div>


    </div>
  );
};

export default Not_Found_Page;