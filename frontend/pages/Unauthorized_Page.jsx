import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-stone-800 px-4">
      

        
        <h1 className="text-6xl font-extrabold text-white">403</h1>
        
        <h2 className="text-8xl font-bold mt-4 text-stone-700">
          UNAUTHORIZED ACCESS
        </h2>
        
        <p className="text-stone-500 font-semibold text-sm mt-2">
          You don’t have permission to view this page.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-stone-500 text-xs rounded-lg border border-stone-700 hover:bg-stone-600 transition"
          >
            Go Back
          </button>

        </div>
      
    </div>
  );
};

export default Unauthorized;