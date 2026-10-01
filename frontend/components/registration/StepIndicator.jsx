import { Check } from "lucide-react";

const StepIndicator = ({ steps, currentStep, maxStepReached }) => {
    return (
        <div className="w-full flex items-center justify-center gap-0 mb-10">
            {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isReachable = step.id <= maxStepReached;

                return (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                                    ${isCompleted
                                        ? "bg-stone-800 text-white shadow-lg shadow-stone-300"
                                        : isCurrent
                                            ? "bg-stone-800 text-white shadow-lg shadow-stone-300 ring-4 ring-stone-200"
                                            : isReachable
                                                ? "bg-white text-stone-600 border-2 border-stone-300"
                                                : "bg-stone-100 text-stone-400 border-2 border-stone-200"
                                    }`}
                            >
                                {isCompleted ? <Check size={16} /> : step.id}
                            </div>
                            <span
                                className={`hidden sm:block text-[11px] font-semibold tracking-wide transition-colors duration-300
                                    ${isCurrent ? "text-stone-800" : isCompleted ? "text-stone-600" : "text-stone-400"}`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="w-8 sm:w-16 md:w-24 h-1 mx-2 sm:mx-3 mb-0 sm:mb-6 rounded-full overflow-hidden bg-stone-200">
                                <div
                                    className={`h-full rounded-full bg-stone-800 transition-all duration-500 ease-out
                                        ${currentStep > step.id ? "w-full" : "w-0"}`}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepIndicator;
