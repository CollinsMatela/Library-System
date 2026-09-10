import { Eye, EyeOff, Plus, Save, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { position } from "../mockdata";



const MembersModal = ({onClose}) => {
const emptyMember = {
    lastname: "",
    firstname: "",
    middlename: "",
    role: "",
    email: "",
    password: "",
};  

    return (
        <div className="fixed inset-0 bg-black/50 justify-center items-center flex">
            <div className="bg-white w-2xl p-2 rounded-lg">
                <header className="w-full bg-stone-200 p-2 rounded-t-lg">
                    <h1 className="text-xs text-stone-500">Register Librarian</h1>
                    <h1 className="text-xs text-stone-500">Fill the required fields to register.</h1>
                </header>
                
                <div className="w-full grid grid-cols-3 gap-3 py-6">
                     <div className="w-full">
                          <label className="text-xs text-stone-500">Lastname</label>
                          <input 
                          type="text" 
                          placeholder="Enter Lastname"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Firstname</label>
                          <input 
                          type="text" 
                          placeholder="Enter Firstname"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Middlename</label>
                          <input 
                          type="text" 
                          placeholder="Enter Middlename"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Email</label>
                          <input 
                          type="text" 
                          placeholder="Enter Email"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Password</label>
                          <input 
                          type="text" 
                          placeholder="Enter Password"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Role</label>
                          <select className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none">
                            <option value="">Select Role</option>
                            {position.map((pos) => (
                                <option key={pos.value} value={pos.value}>{pos.label}</option>
                            ))}
                          </select>
                     </div>
                </div>

                <footer className="w-full justify-end items-center flex gap-1 pt-2 border-t border-stone-300">
                    <button className="text-xs text-stone-500 bg-white hover:bg-stone-200 p-2 rounded-lg justify-center items-center flex gap-1 cursor-pointer"
                    onClick={onClose}>
                        Back
                    </button>
                    <button className="text-xs text-white bg-stone-800 hover:bg-stone-900 p-2 rounded-lg justify-center items-center flex gap-1 cursor-pointer">
                        <Plus size={15}/>
                        Add
                    </button>
                </footer>
            </div>
            
        </div>
    );
};


export default MembersModal;
