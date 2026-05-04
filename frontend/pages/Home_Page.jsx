import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";

const books = [
  {
    title: "The Very Hungry Caterpillar",
    emoji: "🐛",
    color: "bg-green-300",
  },
  {
    title: "Little Red Riding Hood",
    emoji: "🐺",
    color: "bg-red-300",
  },
  {
    title: "The Snowy Day",
    emoji: "❄️",
    color: "bg-blue-200",
  },
  {
    title: "The Cat in the Hat",
    emoji: "🐱",
    color: "bg-yellow-200",
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

      <section className="w-full py-15 bg-blue-100 px-6 md:px-30">
  <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12">
    Popular Stories ⭐
  </h2>

  <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
    {books.map((book, index) => (
      <div
        key={index}
        className={`min-w-[260px] ${book.color} rounded-3xl p-8 shadow-lg hover:scale-105 transition duration-300`}
      >
        <div className="text-7xl text-center mb-4">{book.emoji}</div>
        <h3 className="text-xl font-bold text-center text-gray-800">
          {book.title}
        </h3>
      </div>
    ))}
  </div>
</section>

<section className="w-full py-20 bg-orange-200 px-6 md:px-16">
  <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
    Why Kids Love Our Library 💖
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    <div className="bg-white rounded-3xl p-6 shadow-md text-center">
      <div className="text-5xl mb-4">📚</div>
      <h3 className="font-bold text-lg">Fun Books</h3>
      <p className="text-gray-600 mt-2">
        Read colorful stories made for young learners.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-md text-center">
      <div className="text-5xl mb-4">🎮</div>
      <h3 className="font-bold text-lg">Interactive Learning</h3>
      <p className="text-gray-600 mt-2">
        Learn through games and playful activities.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-6 shadow-md text-center">
      <div className="text-5xl mb-4">🌈</div>
      <h3 className="font-bold text-lg">Safe for Kids</h3>
      <p className="text-gray-600 mt-2">
        A friendly and secure learning environment.
      </p>
    </div>
  </div>
</section>


      <section className="w-full py-20 bg-purple-200 text-center px-6">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-4">
          Ready to Read? 📚
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Join our fun learning journey and explore magical stories today!
        </p>

        <button className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-8 py-4 rounded-full shadow-lg transition">
          Browse Library
        </button>
      </section>


      <Footer />
    </>
  );
};

export default Home_Page;