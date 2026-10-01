import { User, MapPin, Phone } from "lucide-react";
import { months } from "../../mockdata";

const SubContainer = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm ${className}`}>
        <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-lg bg-stone-800 flex items-center justify-center">
                <Icon size={15} className="text-white" />
            </div>
            <h2 className="text-sm font-bold text-stone-700">{title}</h2>
        </div>
        {children}
    </div>
);

const StepPersonalInfo = ({ form, errors, updateField, age, currentYear, daysInMonth }) => {
    const inputClass = (hasError) =>
        `border ${hasError ? "border-red-400 bg-red-50/50" : "border-stone-200"} p-2.5 text-sm w-full outline-none rounded-xl transition-all duration-200 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 hover:border-stone-300`;

    const labelClass = "text-xs font-semibold text-stone-500 mb-1.5 block";

    return (
        <div className="space-y-4">
            {/* Personal Info - Full Width */}
            <SubContainer icon={User} title="Personal Information">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="w-full">
                        <h1 className={labelClass}>Last Name <span className="text-red-400">*</span></h1>
                        <input type="text" placeholder="Last Name" className={inputClass(errors.lastname)}
                            value={form.lastname} onChange={(e) => updateField("lastname", e.target.value)} />
                    </div>

                    <div className="w-full">
                        <h1 className={labelClass}>First Name <span className="text-red-400">*</span></h1>
                        <input type="text" placeholder="First Name" className={inputClass(errors.firstname)}
                            value={form.firstname} onChange={(e) => updateField("firstname", e.target.value)} />
                    </div>

                    <div className="w-full">
                        <h1 className={labelClass}>Middle Name <span className="text-red-400">*</span></h1>
                        <input type="text" placeholder="Middle Name" className={inputClass(errors.middlename)}
                            value={form.middlename} onChange={(e) => updateField("middlename", e.target.value)} />
                    </div>

                    <div className="w-full">
                        <h1 className={labelClass}>Extension Name</h1>
                        <input type="text" placeholder="e.g. Jr., III (if applicable)" className={inputClass(false)}
                            value={form.extensionname} onChange={(e) => updateField("extensionname", e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <h1 className={labelClass}>Date of Birth <span className="text-red-400">*</span></h1>
                        <div className="w-full grid grid-cols-3 gap-2">
                            <select className={inputClass(errors.year)} value={form.year}
                                onChange={(e) => updateField("year", e.target.value)}>
                                <option value="">Year</option>
                                {Array.from({ length: currentYear - 1999 }, (_, index) => {
                                    const year = currentYear - index;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                            <select className={inputClass(errors.month)} value={form.month}
                                onChange={(e) => updateField("month", e.target.value)}>
                                <option value="">Month</option>
                                {months.map((month) => (
                                    <option key={month.value} value={month.value}>{month.label}</option>
                                ))}
                            </select>
                            <select className={inputClass(errors.day)} value={form.day}
                                onChange={(e) => updateField("day", e.target.value)}>
                                <option value="">Day</option>
                                {Array.from({ length: daysInMonth }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full mt-2">
                            <input type="text" placeholder="Age" value={age} disabled
                                className="bg-stone-100 p-2.5 text-sm w-full rounded-xl text-stone-500 cursor-not-allowed border border-stone-200" />
                        </div>
                    </div>

                    <div className="w-full">
                        <h1 className={labelClass}>Sex <span className="text-red-400">*</span></h1>
                        <select className={inputClass(errors.sex)} value={form.sex}
                            onChange={(e) => updateField("sex", e.target.value)}>
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
            </SubContainer>

            {/* Address + Contact - Side by side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubContainer icon={MapPin} title="Address Info">
                    <div className="w-full space-y-4">
                        <div className="w-full">
                            <h1 className={labelClass}>Home Address <span className="text-red-400">*</span></h1>
                            <input type="text" placeholder="Home Address" className={inputClass(errors.homeAddress)}
                                value={form.homeAddress} onChange={(e) => updateField("homeAddress", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h1 className={labelClass}>City/Municipality <span className="text-red-400">*</span></h1>
                            <input type="text" placeholder="City/Municipality" className={inputClass(errors.city)}
                                value={form.city} onChange={(e) => updateField("city", e.target.value)} />
                        </div>
                    </div>
                </SubContainer>

                <SubContainer icon={Phone} title="Contact Info">
                    <div className="w-full space-y-4">
                        <div className="w-full">
                            <h1 className={labelClass}>Email Address <span className="text-red-400">*</span></h1>
                            <input type="email" placeholder="Email Address" className={inputClass(errors.email)}
                                value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h1 className={labelClass}>Contact Number <span className="text-red-400">*</span></h1>
                            <input type="text" placeholder="09XXXXXXXXX" className={inputClass(errors.contact)}
                                value={form.contact} onChange={(e) => updateField("contact", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h1 className={labelClass}>School/Office <span className="text-red-400">*</span></h1>
                            <input type="text" placeholder="School/Office" className={inputClass(errors.institution)}
                                value={form.institution} onChange={(e) => updateField("institution", e.target.value)} />
                        </div>
                    </div>
                </SubContainer>
            </div>
        </div>
    );
};

export default StepPersonalInfo;
