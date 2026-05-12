
const LoadingScreen = () => {
    return (
        <section className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center gap-6">

            {/* Spinner */}
            <div className="relative">
                <div className="h-20 w-20 rounded-full border-4 border-blue-200"></div>

                <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-gray-700 animate-pulse">
                    Loading Please Wait...
                </h1>
            </div>

            {/* Animated Dots */}
            <div className="flex gap-2 mt-2">
                <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="h-3 w-3 rounded-full bg-green-500 animate-bounce delay-150"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500 animate-bounce delay-300"></span>
            </div>

        </section>
    );
};

export default LoadingScreen;