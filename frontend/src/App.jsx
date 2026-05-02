import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Home_Page from '../pages/Home_Page'
import Admin_Page from '../pages/Admin_Page'
import Library_Page from '../pages/Library_Page'
import Admin_Upload_Page from '../pages/Admin_Upload_Page'
import Unauthorized_Page from "../pages/Unauthorized_Page";
import Not_Found_Page from "../pages/Not_Found_Page";


const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useAuthStore();

  console.log("ProtectedRoute check:");
  console.log("token:", token);
  console.log("role:", role);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (!role){
     return <Navigate to="/unauthorized" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home_Page/>}/>
        <Route path="/unauthorized" element={<Unauthorized_Page/>}/>
        
         <Route element={<ProtectedRoute allowedRoles={["Student", "Teacher"]}/>}>
                <Route path="/library" element={<Library_Page/>}/>
         </Route>

         <Route element={<ProtectedRoute allowedRoles={["Administrator"]} />}>
                <Route path="/admin" element={<Admin_Page />} />
                <Route path="/admin/upload" element={<Admin_Upload_Page />} />
        </Route>

        <Route path="*" element={<Not_Found_Page/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;