import { useNavigate } from "react-router-dom";

const Not_Found_Page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-stone-800 px-4">
        
        <h2 className="text-8xl font-extrabold text-stone-700">
          404 Page Not Found
        </h2>
          
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-stone-500 text-xs rounded-lg border border-stone-700 hover:bg-stone-600 transition"
          >
            Go Back
          </button>



    </div>
  );
};

export default Not_Found_Page;