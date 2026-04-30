import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const Home_Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-pink-600 flex flex-col items-center justify-center px-10 text-center relative overflow-hidden">
        
        <Navigation />

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

        <button className="mt-4 bg-white hover:bg-pink-600 text-pink-500 text-lg font-bold px-6 py-2 rounded-full border-1 border-pink-500 hover:text-white hover:scale-105 transition duration-300 cursor-pointer">
          Start Exploring 🚀
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Home_Page;