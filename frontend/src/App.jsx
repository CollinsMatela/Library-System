import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_Page from '../pages/Home_Page'
import Admin_Page from '../pages/Admin_Page'
import Library_Page from '../pages/Library_Page'
import Admin_Upload_Page from "../pages/Admin_Upload_Page";

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home_Page/>}/>
        <Route path="/library" element={<Library_Page/>}/>
        <Route path="/admin-page" element={<Admin_Page/>}/>
        <Route path="/admin-page/upload" element={<Admin_Upload_Page/>}/>
      </Routes>
      </BrowserRouter>

  )
}

export default App
