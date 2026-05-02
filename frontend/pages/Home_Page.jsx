import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const Home_Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 flex flex-col items-center justify-center px-10 text-center relative overflow-hidden">
        
        <Navigation />

        <div className="bg-gradient-to-br from-white via-pink-300 to-purple-200 -rotate-10 border-b-4 border-purple-300 shadow-pink-900 h-40 w-40 justify-center items-center flex rounded-full absolute top-40 left-80 text-7xl animate-bounce">🌟</div>
        <div className="bg-gradient-to-br from-white via-pink-300 to-purple-200 -rotate-10 border-b-4 border-purple-300 shadow-pink-900 h-50 w-50 justify-center items-center flex rounded-full absolute top-60 right-40 text-7xl animate-bounce">📚</div>
        <div className="bg-gradient-to-br from-white via-pink-300 to-purple-200 -rotate-10 border-b-4 border-purple-300 shadow-pink-900 h-60 w-60 justify-center items-center flex rounded-full absolute bottom-30 left-50 text-7xl animate-bounce">🧸</div>
        <div className="bg-gradient-to-br from-white via-pink-300 to-purple-200 -rotate-10 border-b-4 border-purple-300 shadow-pink-900 h-45 w-45 justify-center items-center flex rounded-full absolute bottom-20 right-80 text-7xl animate-bounce">🎨</div>

        <div className="bg-white rounded-full px-6 py-2 text-sm font-semibold text-pink-500">
          ✨ Welcome to Little Me Learning Center ✨
        </div>

        <h1 className="text-2xl md:text-8xl font-extrabold text-pink-500 leading-tight">
        ONLINE LIBRARY
      </h1>

        <p className="text-sm text-white font-semibold max-w-3xl">
          A magical place where little learners can discover stories,
          play fun games, and let their imagination grow every day.
        </p>

        <button className="mt-4 bg-white hover:bg-pink-600 text-pink-500 text-lg font-bold px-6 py-2 rounded-full border-1 border-pink-500 hover:text-white hover:scale-105 transition duration-300 cursor-pointer">
          Start Exploring 🚀
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Home_Page;