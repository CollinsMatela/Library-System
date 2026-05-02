import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const books = [
  {
    title: "The Happy Lion",
    emoji: "🦁",
    color: "bg-yellow-300",
  },
  {
    title: "ABC Adventure",
    emoji: "🔤",
    color: "bg-blue-300",
  },
  {
    title: "Magic Numbers",
    emoji: "🔢",
    color: "bg-green-300",
  },
  {
    title: "Rainbow Story",
    emoji: "🌈",
    color: "bg-purple-300",
  },
];

const Home_Page = () => {
  return (
    <>

      <section className="min-h-screen w-full bg-pink-600 flex flex-col items-center justify-center px-6 md:px-10 text-center relative overflow-hidden">
        <Navigation />

        <div className="absolute top-32 left-8 md:left-30 text-5xl md:text-7xl animate-bounce">
          🌟
        </div>
        <div className="absolute top-32 right-8 md:right-30 text-5xl md:text-7xl animate-bounce">
          📚
        </div>
        <div className="absolute bottom-20 left-8 md:left-20 text-5xl md:text-7xl animate-bounce">
          🧸
        </div>
        <div className="absolute bottom-24 right-8 md:right-10 text-5xl md:text-7xl animate-bounce">
          🎨
        </div>

        <div className="bg-white rounded-full px-6 py-2 text-sm font-semibold text-pink-500 mt-10">
          ✨ Welcome to Little Me Learning Center ✨
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white leading-tight mt-6">
          ONLINE LIBRARY
        </h1>

        <p className="text-sm sm:text-lg text-white font-semibold max-w-2xl mt-4">
          A magical place where little learners can discover stories,
          play fun games, and let their imagination grow every day.
        </p>

        <button className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-pink-700 text-base sm:text-lg font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition duration-300">
          Start Exploring 🚀
        </button>
      </section>

      <section className="w-full py-20 bg-yellow-100 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-pink-600 mb-4">
              About Our Library 📖
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our online library helps kindergarten students enjoy fun
              and educational books anytime, anywhere. Kids can read,
              listen, and learn through colorful stories made just for them.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-xl text-8xl text-center">
            🏫
          </div>
        </div>
      </section>

      

      

      <Footer />
    </>
  );
};

export default Home_Page;