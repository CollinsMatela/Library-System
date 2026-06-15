import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Confirmation_Popup from "../popup/Confirmation_Popup";
import Admin_Sidebar from "../components/Admin_Sidebar"
import UploadStoryBook from "../uploading-books/UploadStoryBook";

const Admin_Upload_Page = () => {
    const navigate = useNavigate();

    const [selectedTypeOfBooks, setSelectedTypeOfBooks] = useState("");

    return (
        <section className="bg-white min-h-screen w-full flex flex-col items-center pl-90 pr-10 py-10 gap-6">
            <Admin_Sidebar/>
            
            {/* Header */}
            <div className="w-full justify-between items-start flex">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Book Management</h1>
                    <p className="text-gray-400 text-md">Create and publish a new books</p>
                </div>
                
                
            </div>

            <UploadStoryBook/>

               

        

            
        </section>
    )
}

export default Admin_Upload_Page