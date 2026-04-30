import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const Home_Page = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-gradient-to-b from-yellow-100 via-pink-100 to-blue-100 flex flex-col items-center justify-center px-10 text-center relative overflow-hidden">
        
        <Navigation />

        <div className="absolute top-40 left-30 text-5xl animate-bounce">🌟</div>
        <div className="absolute top-40 right-30 text-5xl animate-bounce">📚</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce">🧸</div>
        <div className="absolute bottom-32 right-10 text-5xl animate-bounce">🎨</div>

        <div className="bg-white shadow-md rounded-full px-6 py-5 text-lg font-semibold text-pink-500 mb-6">
          ✨ Welcome to Little Me Learning Center ✨
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-purple-600 leading-tight">
          Read, Play, <br />
          <span className="text-pink-500">and Learn Every Day!</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-3xl mt-6">
          A magical place where little learners can discover stories,
          play fun games, and let their imagination grow every day.
        </p>

        <button className="mt-8 bg-pink-500 hover:bg-pink-400 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
          Start Exploring 🚀
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Home_Page;