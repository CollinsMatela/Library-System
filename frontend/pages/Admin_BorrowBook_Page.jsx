


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { MoveRight, Search } from "lucide-react";
import { toast } from "react-toastify";

const Admin_BorrowBook_Page = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [borrowList, setBorrowList] = useState([]);

    const [returnDate, setReturnDate] = useState('')
    const [quantity, setQuantity] = useState(0);

    const fetchAllBorrow = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrowList(res.data.borrows);
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error?.response?.dat?.message);
          }
    }

    const updateStatus = async () => {

          const borrowData = {
                borrowDate: new Date().getDate(),
                returnDate: returnDate,
                status: 'Approved',
                quantity: quantity
          }

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-borrow`, borrowData);
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error?.response?.dat?.message);
          }
    }

    useEffect(() => {
        fetchAllBorrow();
    },[])

      return(
        <>
        <Admin_Sidebar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col py-10 pl-90 pr-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-gray-300 pb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Borrowing Books Management</h1>
                    <h1 className="text-gray-400 text-md">Manage borrow request from user</h1>
              </header>

              <div className="h-20 w-full justify-between items-center flex flex-col rounded-t-xl">

                <div className="w-full justify-between items-start flex flex-col mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Borrowing Table</h1>
                    <h1 className="text-gray-400 text-md">Manage borrow request from user</h1>
                </div>

                <div className="w-full flex flex-col gap-4 mt-6">
    {borrowList.length > 0 ? (
        borrowList.map((borrow) => (
            <div
                key={borrow._id}
                className="w-full bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex justify-between items-center"
            >
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {borrow.title}
                    </h2>

                    <p className="text-gray-600 text-xs flex gap-2"> Name:
                        <span className="">{borrow.name}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Status:
                        <span className={`
                          ${borrow.status === 'Pending' ? "text-yellow-600" : 
                            borrow.status === 'Approve' ? "text-green-600" : ""}
                            font-bold text-md `}
                        >{borrow.status}</span>
                    </p>

                    
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => updateStatus(borrow)}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                    >
                        Approve
                    </button>

                    <button
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                        Reject
                    </button>
                </div>
            </div>
        ))
    ) : (
        <div className="w-full flex justify-center items-center py-10 border border-dashed rounded-xl">
            <p className="text-gray-500">No borrow requests found.</p>
        </div>
    )}
</div>
                        
              </div>
        </section>
        </>
      )
}
export default Admin_BorrowBook_Page;