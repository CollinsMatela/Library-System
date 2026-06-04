
const Analytics_Card = ({ title, value, subTitle }) => {
    return(
    <div className="relative h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-all">
    
    {/* Title */}
    <h1 className="absolute top-4 text-sm font-semibold text-gray-500 tracking-wide">
        {title}
    </h1>

    {/* Main Value */}
    <h1 className="text-5xl font-extrabold text-gray-700 mt-6">
        {value}
    </h1>

    {/* Optional subtitle */}
    <p className="text-xs text-gray-400 mt-2">
        {subTitle}
    </p>

</div>
    )
}
    export default Analytics_Card;