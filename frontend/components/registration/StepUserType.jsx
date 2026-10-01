import { GraduationCap, Users, UserCheck } from "lucide-react";

const StepUserType = ({ form, updateField }) => {
    const roles = [
        { value: "student", label: "Student", description: "For students using the library.", icon: GraduationCap },
        { value: "teacher", label: "Teacher", description: "For teachers using the library.", icon: Users },
        { value: "guest", label: "Guest", description: "For community library users.", icon: UserCheck },
    ];

    return (
        <div className="bg-white/80 backdrop-blur-sm w-full md:p-8 rounded-2xl border border-stone-200/60 mb-6 px-4 py-6 shadow-xl shadow-stone-200/40">
            <div className="flex flex-col items-start justify-start w-full mb-6">
                <h1 className="text-lg font-bold text-stone-800">Select Type of User</h1>
                <p className="text-stone-400 text-sm mt-1">Fill-up the required information.</p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = form.role === role.value;
                    return (
                        <div
                            key={role.value}
                            onClick={() => updateField("role", role.value)}
                            className={`group w-full p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                                ${isSelected
                                    ? "border-stone-800 bg-stone-800 text-white shadow-lg shadow-stone-300"
                                    : "border-stone-200 bg-white hover:border-stone-400 hover:shadow-md hover:-translate-y-0.5"
                                }`}
                        >
                            <div className="flex flex-col items-start gap-3">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300
                                    ${isSelected
                                        ? "bg-white/20 text-white"
                                        : "bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600"
                                    }`}
                                >
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h1 className={`text-sm font-bold transition-colors ${isSelected ? "text-white" : "text-stone-700"}`}>
                                        {role.label}
                                    </h1>
                                    <p className={`text-xs mt-1 transition-colors ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                                        {role.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepUserType;
