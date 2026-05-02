import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const Home_Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-pink-600 flex flex-col items-center justify-center px-10 text-center relative overflow-hidden">
        
        <Navigation />
.
        <div className="absolute top-40 left-30 text-7xl animate-bounce">🌟</div>
        <div className="absolute top-40 right-30 text-7xl animate-bounce">📚</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-bounce">🧸</div>
        <div className="absolute bottom-32 right-10 text-7xl animate-bounce">🎨</div>

        <div className="bg-white rounded-full px-6 py-2 text-sm font-semibold text-pink-500">
          ✨ Welcome to Little Me Learning Center ✨
        </div>

        <h1 className="text-2xl md:text-8xl font-extrabold text-white leading-tight">
        ONLINE LIBRARY
      </h1>

        <p className="text-sm text-white font-semibold max-w-3xl">
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