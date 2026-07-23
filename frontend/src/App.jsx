import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthStore from "../store/useAuthStore";
import Home_Page from '../pages/Home_Page'
import Admin_Page from '../pages/Admin_Page'
import Library_Page from '../pages/Library_Page'
import Admin_UploadBook_Page from '../pages/Admin_UploadBook_Page'
import Unauthorized_Page from "../pages/Unauthorized_Page";
import Change_Password_Page from "../pages/Change_Password_Page"
import Not_Found_Page from "../pages/Not_Found_Page";
import Lib_ViewBook from "../library_components/Lib_ViewBook";
import Lib_Quiz from "../library_components/Lib_Quiz";
import LoadingScreen from '../loadings/loading'
import Profile_Page from "../pages/Profile_Page";
import Admin_Books_Page from "../pages/Admin_Books_Page";
import Admin_ViewMaterials_Page from "../pages/Admin_ViewMaterials_Page";
import Admin_Student_Page from "../pages/Admin_Student_Page";
import Lib_Catalog from "../library_components/Lib_Catalog";
import Admin_StudentRegistration_Page from "../components/Admin_StudentRegistration_Page";
import Lib_Borrow from "../library_components/Lib_Borrow";
import Admin_BorrowBook_Page from "../pages/Admin_BorrowBook_Page";
import Admin_LogBook from "../pages/Admin_LogBook";


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
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home_Page/>}/>
        <Route path="/unauthorized" element={<Unauthorized_Page/>}/>
        
         <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
                <Route path="/library" element={<Library_Page/>}/>
                <Route path="/library/catalog" element={<Lib_Catalog/>}/>
                <Route path="/library/borrow-status" element={<Lib_Borrow/>}/>
                <Route path="/library/view-book/:id" element={<Lib_ViewBook/>}/>
                <Route path="/library/view-story/quiz/:id" element={<Lib_Quiz/>}/>
                <Route path="/change-password" element={<Change_Password_Page/>}/>
         </Route>

         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<Admin_Page />} />
                <Route path="/admin/log-book" element={<Admin_LogBook />} />
                <Route path="/admin/upload-book" element={<Admin_UploadBook_Page />} />
                <Route path="/admin/books" element={<Admin_Books_Page />} />
                <Route path="/admin/book-information/:id" element={<Admin_ViewMaterials_Page />} />
                <Route path="/admin/borrow-book" element={<Admin_BorrowBook_Page />} />
                <Route path="/admin/users" element={<Admin_Student_Page />} />
                <Route path="/admin/user-registration" element={<Admin_StudentRegistration_Page />} />
                <Route path="/change-password" element={<Change_Password_Page/>}/>
        </Route>
         <Route path="/loading" element={<LoadingScreen/>}/>
        <Route path="*" element={<Not_Found_Page/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App;