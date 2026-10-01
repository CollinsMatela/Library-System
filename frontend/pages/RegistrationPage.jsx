import { useMemo, useState } from "react";
import axios from "axios";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import Account_Popup from "../popup/Account_Conformation";
import { toast } from "react-toastify";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import StepIndicator from "../components/registration/StepIndicator";
import StepUserType from "../components/registration/StepUserType";
import StepPersonalInfo from "../components/registration/StepPersonalInfo";
import StepParentInfo from "../components/registration/StepParentInfo";
import StepReview from "../components/registration/StepReview";

const initialForm = {
    role: "",
    lastname: "", firstname: "", middlename: "", extensionname: "",
    year: "", month: "", day: "", sex: "",
    homeAddress: "", city: "", email: "", contact: "", institution: "",
    parentName: "", parentContact: "", parentRelationship: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^09\d{9}$/;

const STEPS = [
    { id: 1, label: "User Type" },
    { id: 2, label: "Personal Info" },
    { id: 3, label: "Parent Info" },
    { id: 4, label: "Review" },
];

const RegistrationPage = () => {
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showAccountPopup, setShowAccountPopup] = useState(false);
    const [newStudent, setNewStudent] = useState(null);
    const currentYear = new Date().getFullYear();

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const [currentStep, setCurrentStep] = useState(1);
    const [maxStepReached, setMaxStepReached] = useState(1);

    const daysInMonth = form.year && form.month
        ? new Date(form.year, form.month, 0).getDate()
        : 31;

    const calculateAge = (year, month, day) => {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        return (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
    };

    const age = useMemo(() => (
        form.year && form.month && form.day
            ? calculateAge(form.year, form.month, form.day)
            : ""
    ), [form.year, form.month, form.day]);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: false }));
    };

    const needsParentInfo = age && Number(age) < 18;
    const totalSteps = needsParentInfo ? 4 : 3;

    const getSteps = () => {
        if (needsParentInfo) return STEPS;
        return STEPS.filter((s) => s.id !== 3).map((s, i) => ({ ...s, id: i + 1 }));
    };

    const validateStep = (step) => {
        const nextErrors = {};

        if (step === 1) {
            if (!form.role.trim()) nextErrors.role = true;
        }

        if (step === 2) {
            const requiredFields = ["lastname", "firstname", "middlename", "year", "month", "day", "sex", "homeAddress", "city", "institution"];
            requiredFields.forEach((field) => {
                if (!String(form[field]).trim()) nextErrors[field] = true;
            });
            if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = true;
            if (!PHONE_PATTERN.test(form.contact.trim())) nextErrors.contact = true;
        }

        if (step === 3 && needsParentInfo) {
            if (!form.parentName.trim()) nextErrors.parentName = true;
            if (!form.parentRelationship.trim()) nextErrors.parentRelationship = true;
            if (!PHONE_PATTERN.test(form.parentContact.trim())) nextErrors.parentContact = true;
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            if (nextErrors.email) {
                toast.warning("Please enter a valid email address.");
            } else if (nextErrors.contact) {
                toast.warning("Please enter a valid 11-digit contact number.");
            } else if (nextErrors.parentContact) {
                toast.warning("Please enter a valid parent contact number.");
            } else {
                toast.warning("Please fill in all required fields.");
            }
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (!validateStep(currentStep)) return;
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        setMaxStepReached((prev) => Math.max(prev, nextStep));
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const resetForm = () => {
        setForm(initialForm);
        setErrors({});
        setErrorMessage("");
        setCurrentStep(1);
        setMaxStepReached(1);
    };

    const handleAccountInformation = (newAccountDetails) => {
        setNewStudent(newAccountDetails);
        setShowAccountPopup(true);
    };

    const UserRegistration = async () => {
        const userInformation = { ...form, age };
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/register-user`,
                userInformation
            );
            if (res.data.isSuccess) {
                handleAccountInformation(res.data.account);
                resetForm();
                toast.success(res.data.message);
                setShowConfirmationPopup(false);
            }
        } catch (error) {
            console.log("Error registering user account:", error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message || "User Registration Request Error.");
        }
    };

    const handleRegisterClick = () => {
        setShowConfirmationPopup(true);
    };

    const steps = getSteps();

    return (
        <>
            {showConfirmationPopup && (
                <Confirmation_Popup
                    errorMessage={errorMessage}
                    message={"Are you sure to register this user?"}
                    onConfirm={() => { UserRegistration(); }}
                    onCancel={() => { setShowConfirmationPopup(false); setErrorMessage(""); }}
                />
            )}
            {showAccountPopup && (
                <Account_Popup
                    newAccountDetails={newStudent}
                    closeAccountConfirmation={() => { setShowAccountPopup(false); }}
                />
            )}

            <section className="min-h-screen w-full flex flex-col bg-gradient-to-br from-stone-50 via-white to-stone-100">
                <div className="w-full lg:w-5xl py-10 mx-auto">
                    <StepIndicator steps={steps} currentStep={currentStep} maxStepReached={maxStepReached} />

                    {currentStep === 1 && (
                        <StepUserType form={form} updateField={updateField} />
                    )}
                    {currentStep === 2 && (
                        <StepPersonalInfo
                            form={form}
                            errors={errors}
                            updateField={updateField}
                            age={age}
                            currentYear={currentYear}
                            daysInMonth={daysInMonth}
                        />
                    )}
                    {currentStep === 3 && needsParentInfo && (
                        <StepParentInfo form={form} errors={errors} updateField={updateField} />
                    )}
                    {currentStep === totalSteps && (
                        <StepReview form={form} age={age} />
                    )}

                    <div className="w-full justify-end items-center flex gap-2 px-4 mt-2">
                        {currentStep > 1 && (
                            <button
                                className="bg-white/80 backdrop-blur-sm text-stone-600 h-full w-fit rounded-xl cursor-pointer text-sm px-4 py-2.5 hover:bg-white hover:shadow-md border border-stone-200 justify-center items-center flex gap-2 transition-all duration-200"
                                onClick={handleBack}
                            >
                                <ArrowLeft size={16} />
                                Back
                            </button>
                        )}

                        {currentStep < totalSteps ? (
                            <button
                                className="bg-stone-800 text-white h-full w-fit rounded-xl cursor-pointer text-sm px-5 py-2.5 hover:bg-stone-900 hover:shadow-lg hover:shadow-stone-300 hover:-translate-y-0.5 justify-center items-center flex gap-2 transition-all duration-200 font-medium"
                                onClick={handleNext}
                            >
                                Next
                                <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                className="bg-stone-800 text-white h-full w-fit rounded-xl cursor-pointer text-sm px-5 py-2.5 hover:bg-stone-900 hover:shadow-lg hover:shadow-stone-300 hover:-translate-y-0.5 justify-center items-center flex gap-2 transition-all duration-200 font-medium"
                                onClick={handleRegisterClick}
                            >
                                <Plus size={16} />
                                Register
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegistrationPage;
