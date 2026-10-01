import { ShieldCheck } from "lucide-react";

const StepParentInfo = ({ form, errors, updateField }) => {
    const inputClass = (hasError) =>
        `border ${hasError ? "border-red-400 bg-red-50/50" : "border-stone-200"} p-2.5 text-sm w-full outline-none rounded-xl transition-all duration-200 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 hover:border-stone-300`;

    const labelClass = "text-xs font-semibold text-stone-500 mb-1.5 block";

    return (
        <div className="bg-white/80 backdrop-blur-sm w-full md:p-8 rounded-2xl border border-stone-200/60 mb-6 px-4 py-6 shadow-xl shadow-stone-200/40">
            <div className="flex items-center justify-start gap-3 w-full mb-6">
                <div className="h-10 w-10 rounded-lg bg-stone-800 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-stone-800">Parent Information</h1>
                    <p className="text-stone-400 text-sm mt-1">Required for users under 18 years old.</p>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="w-full">
                    <h1 className={labelClass}>Parent Name <span className="text-red-400">*</span></h1>
                    <input type="text" placeholder="Full Name" className={inputClass(errors.parentName)}
                        value={form.parentName} onChange={(e) => updateField("parentName", e.target.value)} />
                </div>

                <div className="w-full">
                    <h1 className={labelClass}>Parent Contact <span className="text-red-400">*</span></h1>
                    <input type="text" placeholder="09XXXXXXXXX" className={inputClass(errors.parentContact)}
                        value={form.parentContact} onChange={(e) => updateField("parentContact", e.target.value)} />
                </div>

                <div className="w-full">
                    <h1 className={labelClass}>Relationship <span className="text-red-400">*</span></h1>
                    <select className={inputClass(errors.parentRelationship)} value={form.parentRelationship}
                        onChange={(e) => updateField("parentRelationship", e.target.value)}>
                        <option value="">Select Relationship</option>
                        <option value="Parent">Parent</option>
                        <option value="Guardian">Guardian</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StepParentInfo;
