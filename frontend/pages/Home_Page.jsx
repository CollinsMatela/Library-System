import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const Home_Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-gradient-to-b from-yellow-100 via-pink-100 to-blue-100 flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 text-center relative overflow-hidden">

        <Navigation />

        <div className="absolute top-28 left-4 sm:left-10 md:left-20 text-3xl sm:text-4xl md:text-5xl animate-bounce">
          🌟
        </div>

        <div className="absolute top-28 right-4 sm:right-10 md:right-20 text-3xl sm:text-4xl md:text-5xl animate-bounce">
          📚
        </div>

        <div className="absolute bottom-16 left-4 sm:left-10 md:left-20 text-3xl sm:text-4xl md:text-5xl animate-bounce">
          🧸
        </div>

        <div className="absolute bottom-24 right-4 sm:right-10 md:right-20 text-3xl sm:text-4xl md:text-5xl animate-bounce">
          🎨
        </div>

        <div className="bg-white shadow-md rounded-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-pink-500 mb-6 mt-20">
          ✨ Welcome to Little Me Learning Center ✨
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-purple-600 leading-tight">
          Read, Play, <br />
          <span className="text-pink-500">and Learn Every Day!</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mt-6 px-2">
          A magical place where little learners can discover stories,
          play fun games, and let their imagination grow every day.
        </p>

        <button className="mt-8 bg-pink-500 hover:bg-pink-400 text-white text-base sm:text-lg md:text-xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
          Start Exploring 🚀
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Home_Page;