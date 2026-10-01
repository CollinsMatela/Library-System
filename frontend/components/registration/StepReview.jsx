import { User, ShieldCheck } from "lucide-react";

const StepReview = ({ form, age }) => {
    const roleLabels = { student: "Student", teacher: "Teacher", guest: "Guest" };

    const formatDOB = () => {
        if (!form.year || !form.month || !form.day) return "—";
        const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return `${monthNames[Number(form.month) - 1]} ${form.day}, ${form.year}`;
    };

    const Section = ({ icon: Icon, title, children }) => (
        <div className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-lg bg-stone-800 flex items-center justify-center">
                    <Icon size={15} className="text-white" />
                </div>
                <h2 className="text-sm font-bold text-stone-700">{title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{children}</div>
        </div>
    );

    const Row = ({ label, value }) => (
        <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm text-stone-700 font-medium">{value || "—"}</p>
        </div>
    );

    return (
        <div className="bg-white/80 backdrop-blur-sm w-full md:p-8 rounded-2xl border border-stone-200/60 mb-6 px-4 py-6 shadow-xl shadow-stone-200/40">
            <div className="flex items-center justify-start gap-3 w-full mb-6">
                <div>
                    <h1 className="text-lg font-bold text-stone-800">Review Information</h1>
                    <p className="text-stone-400 text-sm mt-1">Please review all information before registering.</p>
                </div>
            </div>

            <div className="space-y-4">
                <Section icon={User} title="User Type">
                    <Row label="Role" value={roleLabels[form.role] || form.role} />
                </Section>

                <Section icon={User} title="Personal Information">
                    <Row label="Last Name" value={form.lastname} />
                    <Row label="First Name" value={form.firstname} />
                    <Row label="Middle Name" value={form.middlename} />
                    <Row label="Extension Name" value={form.extensionname} />
                    <Row label="Date of Birth" value={formatDOB()} />
                    <Row label="Age" value={age} />
                    <Row label="Sex" value={form.sex} />
                    <Row label="Home Address" value={form.homeAddress} />
                    <Row label="City/Municipality" value={form.city} />
                    <Row label="Email Address" value={form.email} />
                    <Row label="Contact Number" value={form.contact} />
                    <Row label="School/Office" value={form.institution} />
                </Section>

                {age && Number(age) < 18 && (
                    <Section icon={ShieldCheck} title="Parent Information">
                        <Row label="Parent Name" value={form.parentName} />
                        <Row label="Parent Contact" value={form.parentContact} />
                        <Row label="Relationship" value={form.parentRelationship} />
                    </Section>
                )}
            </div>
        </div>
    );
};

export default StepReview;
