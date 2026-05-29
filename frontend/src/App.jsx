import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import Home_Page from '../pages/Home_Page'
import Admin_Page from '../pages/Admin_Page'
import Library_Page from '../pages/Library_Page'
import Admin_Upload_Page from '../pages/Admin_Upload_Page'
import Unauthorized_Page from "../pages/Unauthorized_Page";
import Change_Password_Page from "../pages/Change_Password_Page"
import Not_Found_Page from "../pages/Not_Found_Page";
import Lib_View_Story from "../library_components/Lib_View_Story";
import Lib_Quiz from "../library_components/Lib_Quiz";
import LoadingScreen from '../loadings/loading'
import Profile_Page from "../pages/Profile_Page";
import Admin_Materials_Page from "../pages/Admin_Materials_Page";
import Admin_ViewMaterials_Page from "../pages/Admin_ViewMaterials_Page";
import Admin_Student_Page from "../pages/Admin_Student_Page";
import Admin_Employee_Page from "../pages/Admin_Employee_Page";


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
        
         {/* <Route element={<ProtectedRoute allowedRoles={["Student", "Teacher"]}/>}> */}
                <Route path="/library" element={<Library_Page/>}/>
                <Route path="/library/profile" element={<Profile_Page/>}/>
                <Route path="/library/view-story/:id" element={<Lib_View_Story/>}/>
                <Route path="/library/view-story/quiz/:id" element={<Lib_Quiz/>}/>
                <Route path="/change-password" element={<Change_Password_Page/>}/>
         {/* </Route> */}

         {/* <Route element={<ProtectedRoute allowedRoles={["Administrator"]} />}> */}
                <Route path="/admin" element={<Admin_Page />} />
                <Route path="/admin/upload" element={<Admin_Upload_Page />} />
                <Route path="/admin/materials" element={<Admin_Materials_Page />} />
                <Route path="/admin/materials/:storyId" element={<Admin_ViewMaterials_Page />} />
                <Route path="/admin/students" element={<Admin_Student_Page />} />
                <Route path="/admin/employee" element={<Admin_Employee_Page />} />
                <Route path="/change-password" element={<Change_Password_Page/>}/>
        {/* </Route> */}
         <Route path="/loading" element={<LoadingScreen/>}/>
        <Route path="*" element={<Not_Found_Page/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;