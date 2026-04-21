import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_Page from '../pages/Home_Page'
import Admin_Upload from "../components/Admin_Upload"
import Admin_Page from '../pages/Admin_Page'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home_Page/>}/>
        <Route path="/admin-page" element={<Admin_Page/>}/>
        <Route path="/admin-page/upload" element={<Admin_Upload/>}/>
      </Routes>
      </BrowserRouter>

  )
}

export default App
