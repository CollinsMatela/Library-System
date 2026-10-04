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

    /*
     * Errors are stored as messages, not true/false.
     * A field has an error only when its key holds a message, for example:
     * errors = { email: "Please enter a valid email address." }
     * That way the form can print the message straight away with
     * {errors.email}.
     */
    const [errors, setErrors] = useState({});

    // Message coming back from the server, e.g. "email already exists".
    const [errorMessage, setErrorMessage] = useState("");

    // Details for the "Save this account" screen that shows the temp password.
    const [newAccount, setNewAccount] = useState(null);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showNewAccount, setShowNewAccount] = useState(false);

    // True while the request is on its way, so we can show a spinner
    // and stop the button from being clicked twice.
    const [isSubmitting, setIsSubmitting] = useState(false);

    // One shared look for every input and select, so the error styling
    // only has to be written once.
    const inputClass = (error) =>
        `w-full border rounded-lg text-xs p-2 outline-none transition-colors focus:ring-2 focus:ring-stone-300 ${
            error ? "border-red-400 bg-red-50" : "border-stone-300"
        }`;

    const labelClass = "text-xs text-stone-500 block mb-1";

    // The label for the chosen role, used in the confirmation message.
    const selectedRole = position.find((pos) => pos.value === form.role);

    // Runs on every keystroke. Saves the value and clears that one error
    // so the red border disappears as soon as the admin starts fixing it.
    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: "" }));
    };

    // Clears every field so the form is empty and ready for the next member.
    const resetForm = () => {
        setForm({ ...EMPTY_MEMBER });
        setErrors({});
        setErrorMessage("");
    };

    // Checks the whole form. Returns true when everything is valid.
    const validateForm = () => {
        const nextErrors = {};

        if (!form.lastname.trim()) {
            nextErrors.lastname = "Lastname is required.";
        }

        if (!form.firstname.trim()) {
            nextErrors.firstname = "Firstname is required.";
        }

        if (!form.role) {
            nextErrors.role = "Please select a role.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!EMAIL_PATTERN.test(form.email.trim())) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!form.contact.trim()) {
            nextErrors.contact = "Contact number is required.";
        } else if (!CONTACT_PATTERN.test(form.contact.trim())) {
            nextErrors.contact = "Use 11 digits that start with 09.";
        }

        setErrors(nextErrors);

        const hasError = Object.keys(nextErrors).length > 0;

        if (hasError) {
            toast.warning("Please fix the highlighted fields.");
        }

        return !hasError;
    };

    // The "Add" button. Check the form FIRST, then ask for confirmation,
    // so the admin is never asked to confirm an invalid form.
    const handleAddClick = () => {
        if (!validateForm()) return;

        setErrorMessage(""); // clears any message from a previous attempt
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
            setErrorMessage(message);
            toast.error(message);
        } finally {
            // Runs whether the request worked or failed, so the button
            // always turns clickable again.
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Ask for confirmation before saving. */}
            {showConfirmation && (
                <Confirmation_Popup
                    errorMessage={errorMessage}
                    message={`Add ${form.firstname} ${form.lastname} as ${selectedRole?.label}?`}
                    confirmLabel="Add"
                    onConfirm={submitForm}
                    onCancel={() => {
                        setShowConfirmation(false);
                        setErrorMessage("");
                    }}
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
            <section className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-lg border border-stone-300 overflow-hidden">

                    {/* Header */}
                    <header className="bg-stone-200 px-4 py-3 border-b border-stone-300">
                        <h1 className="text-sm font-semibold text-stone-700">Add New Member</h1>
                        <p className="text-xs text-stone-500">
                            Fill in the required fields to create the librarian account.
                        </p>
                    </header>

                    {/* Body - this is the only part that scrolls. */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

                        {/* Personal Information */}
                        <div className="border border-stone-300 rounded-lg p-4 space-y-3">
                            <div>
                                <h1 className="text-xs font-semibold text-stone-700">Personal Information</h1>
                                <p className="text-xs text-stone-500">Name and how to reach this librarian.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

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
                                        className={inputClass(errors.lastname)}
                                    />
                                    {errors.lastname && (
                                        <p className="text-[10px] text-red-500 mt-1">{errors.lastname}</p>
                                    )}
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
                                        className={inputClass(errors.firstname)}
                                    />
                                    {errors.firstname && (
                                        <p className="text-[10px] text-red-500 mt-1">{errors.firstname}</p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="middlename" className={labelClass}>Middlename</label>
                                    <input
                                        id="middlename"
                                        type="text"
                                        placeholder="Enter Middlename"
                                        value={form.middlename}
                                        onChange={(e) => updateField("middlename", e.target.value)}
                                        className={inputClass(errors.middlename)}
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
                                        className={inputClass(errors.suffix)}
                                    />
                                </div>

                                <div className="w-full sm:col-span-2">
                                    <label htmlFor="email" className={labelClass}>
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        value={form.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        className={inputClass(errors.email)}
                                    />
                                    {errors.email && (
                                        <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="w-full sm:col-span-2">
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
                                        className={inputClass(errors.contact)}
                                    />
                                    {errors.contact && (
                                        <p className="text-[10px] text-red-500 mt-1">{errors.contact}</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* Librarian Role */}
                        <div className="border border-stone-300 rounded-lg p-4 space-y-3">
                            <div>
                                <h1 className="text-xs font-semibold text-stone-700">Authority Role</h1>
                                <p className="text-xs text-stone-500">Select the type of authorization.</p>
                            </div>

                            <div className="w-full sm:w-64">
                                <label htmlFor="role" className={labelClass}>
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="role"
                                    value={form.role}
                                    onChange={(e) => updateField("role", e.target.value)}
                                    className={inputClass(errors.role)}
                                >
                                    <option value="">Select Role</option>
                                    {position.map((pos) => (
                                        <option key={pos.value} value={pos.value}>
                                            {pos.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="text-[10px] text-red-500 mt-1">{errors.role}</p>
                                )}
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