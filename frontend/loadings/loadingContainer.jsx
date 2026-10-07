
const LoadingContainer = ({icon, maintext, subtext}) => {
    return (
        <div className="absolute inset-0 z-100 flex flex-col items-center justify-center rounded-xl bg-stone-950/90 backdrop-blur-sm">

                    {/* Scanning Icon */}
                    <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                        <div className="absolute inset-0 rounded-full border border-blue-500 animate-ping opacity-30" />

                        {icon}
                        
                    </div>

                    {/* Text */}
                    <h1 className="text-sm font-semibold tracking-widest text-white uppercase">
                        {maintext}
                    </h1>

                    <p className="mt-1 text-xs text-stone-400">
                        {subtext}
                    </p>

        </div>
    );
};

export default LoadingContainer;