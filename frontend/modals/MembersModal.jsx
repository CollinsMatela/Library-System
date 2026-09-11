import { Eye, EyeOff, Plus, Save, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { position } from "../mockdata";
import Confirmation from "../popup/Confirmation_Popup"
import axios from "axios";
import { toast } from "react-toastify";



const MembersModal = ({onClose}) => {
const emptyMember = {
    lastname: "",
    firstname: "",
    middlename: "",
    suffix: "",
    role: "",
    email: "",
    password: "",
    confirmpassword: "",
};
const [errorMessage, setErrorMessage] = useState('');
const [form, setForm] = useState(() => ({...emptyMember}))
const [errors, setErrors] = useState({});

const [showConfirmation, setShowConfirmation] = useState(false);
const updateFields = (label, value) => {
      setForm((form) => ({...form, [label]: value}))
      setErrors((errors) => ({...errors, [label]: false}))
}

// const validationForm = () => {

// }

const resetForm = () => {
  setForm({ ...emptyMember });
};

const FormRequest = async () => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/add-member`, {form: form});
        console.log(res.data.message);
        toast.success('Added member successfully.')
        resetForm()
        setShowConfirmation(false)
        onClose()
      } catch (error) {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
        toast.error("Failed to send request.");
      }
}

    return (
        <>
        {showConfirmation && (
            <Confirmation 
            errorMessage={errorMessage} 
            message={'Are you sure to add new member'}
            onConfirm={FormRequest}
            onCancel={() => setShowConfirmation(false)}
            />)}
        <div className="fixed inset-0 bg-black/50 justify-center items-center flex">
            <div className="bg-white w-2xl p-2 rounded-lg">
                <header className="w-full bg-stone-200 p-2 rounded-t-lg mb-2">
                    <h1 className="text-xs text-stone-500 font-semibold">Register Librarian</h1>
                    <h1 className="text-xs text-stone-500">Fill the required fields to register.</h1>
                </header>
                
                <div className="w-full border border-stone-300 p-2 rounded-lg mb-2">

                <h1 className="text-xs text-stone-500 font-semibold">Personal Information</h1>
                <p className="text-xs text-stone-500">Fill the personal information of librarian</p>
                <div className="w-full grid grid-cols-4 gap-2">
                     <div className="w-full">
                          <label className="text-xs text-stone-500">Lastname</label>
                          <input 
                          type="text"
                          value={form.lastname}
                          onChange={(e) => updateFields('lastname', e.target.value)}
                          placeholder="Enter Lastname"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Firstname</label>
                          <input 
                          type="text"
                          value={form.firstname}
                          onChange={(e) => updateFields('firstname', e.target.value)}
                          placeholder="Enter Firstname"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Middlename</label>
                          <input 
                          type="text"
                          value={form.middlename}
                          onChange={(e) => updateFields('middlename', e.target.value)}
                          placeholder="Enter Middlename"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Suffix</label>
                          <input 
                          type="text"
                          value={form.suffix}
                          onChange={(e) => updateFields('suffix', e.target.value)}
                          placeholder="Enter Suffix"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>
                </div>
                </div>

                <div className="w-full border border-stone-300 p-2 rounded-lg mb-2">
                    <h1 className="text-xs text-stone-500 font-semibold">Account Information</h1>
                    <p className="text-xs text-stone-500">Fill the required information</p>
                    <div className="w-full grid grid-cols-4 gap-2">
                         <div className="w-full">
                          <label className="text-xs text-stone-500">Email</label>
                          <input 
                          type="text"
                          value={form.email}
                          onChange={(e) => updateFields('email', e.target.value)}
                          placeholder="Enter Email"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Password</label>
                          <input 
                          type="password"
                          value={form.password}
                          onChange={(e) => updateFields('password', e.target.value)}
                          placeholder="Enter Password"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>

                     <div className="w-full">
                          <label className="text-xs text-stone-500">Confirm Password</label>
                          <input 
                          type="password"
                          value={form.confirmpassword}
                          onChange={(e) => updateFields('confirmpassword', e.target.value)}
                          placeholder="Enter Password"
                          className="w-full border border-stone-300 rounded-lg text-xs p-2 outline-none"/>
                     </div>
                    </div>
                </div>

                <div className="w-full border border-stone-300 p-2 rounded-lg mb-2">
                    <h1 className="text-xs text-stone-500 font-semibold">Librarian Role</h1>
                    <p className="text-xs text-stone-500">Select the type of librarian</p>
                    <div className="w-full grid grid-cols-4 gap-2">
                         <div className="w-full">
                          <label className="text-xs text-stone-500">Role</label>
                          <select className="w-full border border-stone-300 rounded-lg text-xs text-stone-500 p-2 outline-none"
                          value={form.role}
                          onChange={(e) => updateFields('role', e.target.value)}>
                            <option value="">Select Role</option>
                            {position.map((pos) => (
                                <option key={pos.value} value={pos.value}>{pos.label}</option>
                            ))}
                          </select>
                     </div>
                    </div>
                </div>

                <footer className="w-full justify-end items-center flex gap-1 pt-2 border-t border-stone-300">
                    <button className="text-xs text-stone-500 bg-white hover:bg-stone-200 p-2 rounded-lg justify-center items-center flex gap-1 cursor-pointer"
                    onClick={onClose}>
                        Back
                    </button>
                    <button className="text-xs text-white bg-stone-800 hover:bg-stone-900 p-2 rounded-lg justify-center items-center flex gap-1 cursor-pointer"
                    onClick={() => setShowConfirmation(true)}>
                        <Plus size={15}/>
                        Add
                    </button>
                </footer>
            </div>
            
        </div>
        </>
    );
};

export default MembersModal;
