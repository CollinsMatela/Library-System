import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home_Page from '../pages/Home_Page'
import Admin_Dashboard_Page from '../pages/Admin_Dashboard_Page'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home_Page/>}/>
        <Route path="/admin-dashboard-page" element={<Admin_Dashboard_Page/>}/>
      </Routes>
      </BrowserRouter>

  )
}

export default App
