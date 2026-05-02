import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      

        
        <h1 className="text-6xl font-extrabold text-red-500">403</h1>
        
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Unauthorized Access
        </h2>
        
        <p className="text-gray-500 mt-2">
          You don’t have permission to view this page.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Go Back
          </button>

        </div>
      
    </div>
  );
};

export default Unauthorized;