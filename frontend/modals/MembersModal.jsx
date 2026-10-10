import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { position } from "../mockdata";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import LibrarianAccount from "../popup/LibrarianAccount";

/*
 * A blank member. We keep this outside the component so it is not
 * re-created every single render.
 */
const EMPTY_MEMBER = {
    lastname: "",
    firstname: "",
    middlename: "",
    suffix: "",
    role: "",
    email: "",
    contact: "",
};

/* The two rules we use to check what the admin typed. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // name@domain.com
const CONTACT_PATTERN = /^09\d{9}$/; // 09171234567

const MembersModal = ({ onClose, reFetch }) => {
    // What the admin has typed so far.
    const [form, setForm] = useState({ ...EMPTY_MEMBER });

    // Details for the "Save this account" screen that shows the temp password.
    const [newAccount, setNewAccount] = useState(null);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showNewAccount, setShowNewAccount] = useState(false);

    // True while the request is on its way, so we can show a spinner
    // and stop the button from being clicked twice.
    const [isSubmitting, setIsSubmitting] = useState(false);

    // One shared look for every input and select.
    const inputClass =
        "w-full border border-stone-300 rounded-lg text-xs p-2 outline-none transition-colors focus:ring-2 focus:ring-stone-300";

    const labelClass = "text-xs text-stone-500 block mb-1";

    // The label for the chosen role, used in the confirmation message.
    const selectedRole = position.find((pos) => pos.value === form.role);

    // Runs on every keystroke and saves the value.
    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    // Clears every field so the form is empty and ready for the next member.
    const resetForm = () => {
        setForm({ ...EMPTY_MEMBER });
    };

    // Checks the form one field at a time and stops at the first problem.
    // Shows a simple toast message instead of highlighting the fields.
    const validateForm = () => {
        if (!form.lastname.trim()) {
            toast.warning("Please enter your lastname.");
            return false;
        }

        if (!form.firstname.trim()) {
            toast.warning("Please enter your firstname.");
            return false;
        }

        if (!form.email.trim()) {
            toast.warning("Please enter your email.");
            return false;
        }

        if (!EMAIL_PATTERN.test(form.email.trim())) {
            toast.warning("Please enter a valid email address.");
            return false;
        }

        if (!form.contact.trim()) {
            toast.warning("Please enter your contact number.");
            return false;
        }

        if (!CONTACT_PATTERN.test(form.contact.trim())) {
            toast.warning("Contact number must be 11 digits and start with 09.");
            return false;
        }

        if (!form.role) {
            toast.warning("Please select a role.");
            return false;
        }

        return true;
    };

    // The "Add" button. Check the form FIRST, then ask for confirmation,
    // so the admin is never asked to confirm an invalid form.
    const handleAddClick = () => {
        if (!validateForm()) return;

        setShowConfirmation(true);
    };

    // The confirmation popup's "Confirm" button. Now we talk to the server.
    const submitForm = async () => {
        if (isSubmitting) return; // stops a double click creating two members

        setIsSubmitting(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/add-member`, { form });

            toast.success(res.data.message);

            // Keep the details needed by the "Save this account" screen.
            setNewAccount({
                role: res.data.librarian.role,
                fullname: `${res.data.librarian.firstname} ${res.data.librarian.lastname}`,
                email: res.data.librarian.email,
                tempPassword: res.data.tempPassword,
            });

            resetForm();
            setShowConfirmation(false);
            setShowNewAccount(true);
            reFetch();
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(message);
        } finally {
            // Runs whether the request worked or failed, so the button
            // always turns clickable again.
            setIsSubmitting(false);
        }
    };

    // Small numbered badge used in every section header.
    const stepBadge = (number) => (
        <span className="h-6 w-6 rounded-full bg-stone-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
            {number}
        </span>
    );

    return (
        <>
            {/* Ask for confirmation before saving. */}
            {showConfirmation && (
                <Confirmation_Popup
                    message={`Add ${form.firstname} ${form.lastname} as ${selectedRole?.label}?`}
                    confirmLabel="Add"
                    onConfirm={submitForm}
                    onCancel={() => setShowConfirmation(false)}
                    isLoading={isSubmitting}
                />
            )}

            {/* Show the one-time password after a successful save. */}
            {showNewAccount && (
                <LibrarianAccount
                    account={newAccount}
                    onClose={() => {
                        setShowNewAccount(false);
                        onClose();
                    }}
                />
            )}

            {/* The form itself. */}
            <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-xl border border-stone-300 overflow-hidden">

                    {/* Header */}
                    <header className="bg-white px-4 py-3 border-b border-stone-300">
                        <h1 className="text-sm font-semibold text-stone-700">Add New Member</h1>
                        <p className="text-xs text-stone-500">
                            Fill in the required fields to create the librarian account.
                        </p>
                    </header>

                    {/* Body - this is the only part that scrolls. */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

                        {/* Section 1 - Personal Information */}
                        <div className="border border-stone-300 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                {stepBadge(1)}
                                <div>
                                    <h2 className="text-xs font-semibold text-stone-700">Personal Information</h2>
                                    <p className="text-[10px] text-stone-500">Enter the member's full name.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                <div className="w-full">
                                    <label htmlFor="lastname" className={labelClass}>
                                        Lastname <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="lastname"
                                        type="text"
                                        placeholder="Enter Lastname"
                                        value={form.lastname}
                                        onChange={(e) => updateField("lastname", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="firstname" className={labelClass}>
                                        Firstname <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="firstname"
                                        type="text"
                                        placeholder="Enter Firstname"
                                        value={form.firstname}
                                        onChange={(e) => updateField("firstname", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="middlename" className={labelClass}>Middlename</label>
                                    <input
                                        id="middlename"
                                        type="text"
                                        placeholder="Enter Middlename"
                                        value={form.middlename}
                                        onChange={(e) => updateField("middlename", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="suffix" className={labelClass}>Suffix</label>
                                    <input
                                        id="suffix"
                                        type="text"
                                        placeholder="e.g. Jr., III"
                                        value={form.suffix}
                                        onChange={(e) => updateField("suffix", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Section 2 - Account Details */}
                        <div className="border border-stone-300 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                {stepBadge(2)}
                                <div>
                                    <h2 className="text-xs font-semibold text-stone-700">Account Details</h2>
                                    <p className="text-[10px] text-stone-500">Login email and contact number.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                <div className="w-full">
                                    <label htmlFor="email" className={labelClass}>
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        value={form.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="contact" className={labelClass}>
                                        Contact Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="contact"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={11}
                                        placeholder="09171234567"
                                        value={form.contact}
                                        onChange={(e) => updateField("contact", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Section 3 - Authority Role */}
                        <div className="border border-stone-300 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                {stepBadge(3)}
                                <div>
                                    <h2 className="text-xs font-semibold text-stone-700">Authority Role</h2>
                                    <p className="text-[10px] text-stone-500">Select the type of authorization.</p>
                                </div>
                            </div>

                            <div className="w-full sm:w-64">
                                <label htmlFor="role" className={labelClass}>
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="role"
                                    value={form.role}
                                    onChange={(e) => updateField("role", e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Select Role</option>
                                    {position.map((pos) => (
                                        <option key={pos.value} value={pos.value}>
                                            {pos.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <footer className="px-4 py-3 border-t border-stone-300 bg-stone-50 flex justify-end items-center gap-2">
                        <button
                            type="button"
                            className="text-xs text-stone-600 bg-white hover:bg-stone-200 border border-stone-300 px-4 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="text-xs text-white bg-stone-800 hover:bg-stone-900 px-4 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
                            onClick={handleAddClick}
                        >
                            <Plus size={15} />
                            Add
                        </button>
                    </footer>
                </div>
            </section>
        </>
    );
};

export default MembersModal;