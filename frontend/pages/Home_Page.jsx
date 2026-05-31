import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";
import BooksImage from "../src/assets/books.jpg"
import LibraryImage from "../src/assets/library.png"
import axios from 'axios';
import { useEffect, useState } from "react";
import LoginModal from '../modals/LoginModal'



const Home_Page = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
      fetchStories();
  }, [])

  const fetchStories = async () => {
            try {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-stories`);
                  setStories(res.data.stories);
                  console.log(res.data.message);
            } catch (error) {
              console.log(error)
      }
    }
  return (
    <>
    {showLogin && (<LoginModal onClose={() => setShowLogin(false)}/>)}
      <Navigation />

      {/* Content */}
<section className="relative z-10 min-h-screen max-w-7xl mx-auto w-full justify-center items-center flex px-6 md:px-12">
  <div className="grid md:grid-cols-2 gap-12 items-center">

    {/* Left Side */}
    <div className="text-left">
      <div className="inline-block bg-pink-100 rounded-full px-6 py-2 text-sm font-semibold text-pink-600">
        Welcome to Little Me Library
      </div>

      <h1 className="mt-6 text-5xl sm:text-6xl lg:text-8xl font-extrabold text-gray-800 leading-none">
        Discover
        <br />
        <span className="text-pink-500">Stories</span>
        <br />
        That Inspire
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-lg">
        Read, learn, imagine, and grow through a world of interactive
        stories designed to spark creativity and curiosity in every child.
      </p>

      <button
        className="mt-8 bg-pink-500 hover:bg-pink-600 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition"
        onClick={() => setShowLogin(true)}
      >
        Start Exploring
      </button>
    </div>

    {/* Right Side */}
    <div className="text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Where Learning Meets Adventure
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed">
        Little Me Library is an interactive digital reading platform created
        to help children develop strong literacy skills while enjoying fun
        and engaging stories. Our collection includes educational,
        imaginative, and age-appropriate content that encourages curiosity,
        creativity, and a love for learning.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mt-5">
        Through colorful storybooks, interactive activities, and exciting
        reading adventures, children can improve comprehension, expand
        vocabulary, strengthen critical thinking, and build confidence in
        their reading journey. Whether at home or in the classroom, every
        story becomes a new opportunity to discover, learn, and grow.
      </p>
    </div>

  </div>
</section>

      <section className="min-h-screen w-full py-20 bg-white px-6 md:px-16">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Content */}
    <div>
          <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
            About Little Me Library
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 mb-6 leading-tight">
            Inspiring Young Minds Through
            <span className="text-pink-500"> Stories & Learning</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Little Me Library is a child-friendly digital learning platform
            designed to help little me students discover the joy of reading.
            Through engaging stories and quizzes, children can explore new ideas while developing
            essential literacy skills.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Our goal is to create a safe and enjoyable environment where young
            learners can read, imagine, and grow. Whether at home or in the
            classroom, every story is an opportunity to learn something new.
          </p>

          <div className="flex gap-8 mt-8">
            <div>
              <h3 className="text-3xl font-bold text-pink-500">100+</h3>
              <p className="text-gray-500">Learning Stories</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-pink-500">24/7</h3>
              <p className="text-gray-500">Accessible Learning</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-pink-500">Fun</h3>
              <p className="text-gray-500">Interactive Reading</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">
          <img
            src={LibraryImage}
            alt="Library"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

      </div>
    </section>


<section className="min-h-screen w-full py-24 bg-white px-6 md:px-16">

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

    {/* LEFT SIDE - TEXT */}
    <div>

      <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
         Discover Little Me Stories
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 leading-tight">
        Stories That Spark <span className="text-pink-500">Imagination & Learning</span>
      </h2>

      <p className="text-gray-600 mt-6 text-lg leading-relaxed">
        Every story in Little Me Library is carefully designed to help children
        build reading confidence, develop creativity, and enjoy learning in a fun way.
      </p>

      <p className="text-gray-500 mt-4 leading-relaxed">
        From magical adventures to simple life lessons, our featured stories
        guide young learners through a journey of discovery, curiosity, and joy.
      </p>

      {/* Highlights */}
      <div className="mt-8 space-y-3">

        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-pink-500">📖</span> Easy-to-read stories for kids
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-pink-500">🌟</span> Builds imagination & creativity
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-pink-500">🎓</span> Supports early learning skills
        </div>

      </div>

    </div>

    {/* RIGHT SIDE - STORIES */}
    <div className="space-y-5">

      {stories.slice(0, 3).map((story, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white hover:bg-pink-50 transition p-5 rounded-2xl cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 duration-300"
        >

          {/* Image */}
          <img
            src={story.image}
            alt={story.title}
            className="w-16 h-16 rounded-xl object-cover"
          />

          {/* Text */}
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 line-clamp-1">
              {story.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-1">
              {story.description}
            </p>
          </div>

          {/* Arrow */}
          <span className="text-pink-500 font-bold text-xl">→</span>

        </div>
      ))}

    </div>

  </div>
</section>

<section className="min-h-screen w-full py-24 bg-white px-6 md:px-16">

  <div className="max-w-6xl mx-auto text-center">

    {/* Badge */}
    <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
      🌟 Student Learning Benefits
    </span>

    {/* Title */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 leading-tight">
      How Students Benefit from <span className="text-pink-500">Little Me Library</span>
    </h2>

    <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
      Our platform is designed to support early learners by making reading,
      learning, and exploration more engaging, interactive, and fun.
    </p>

  </div>

  {/* Cards */}
  <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
    
      <h3 className="font-bold text-xl text-gray-800">Improves Reading Skills</h3>
      <p className="text-gray-600 mt-3 leading-relaxed">
        Students develop vocabulary, comprehension, and reading confidence through engaging stories.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
     
      <h3 className="font-bold text-xl text-gray-800">Boosts Creativity & Imagination</h3>
      <p className="text-gray-600 mt-3 leading-relaxed">
        Stories and visuals help children think creatively and explore new ideas.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
   
      <h3 className="font-bold text-xl text-gray-800">Learning Through Play</h3>
      <p className="text-gray-600 mt-3 leading-relaxed">
        Interactive stories and activities make learning enjoyable and easier to understand.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
   
      <h3 className="font-bold text-xl text-gray-800">Safe Learning Environment</h3>
      <p className="text-gray-600 mt-3 leading-relaxed">
        A child-friendly platform with safe content designed for young learners.
      </p>
    </div>

    {/* Card 5 */}
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">

      <h3 className="font-bold text-xl text-gray-800">Learn Anytime, Anywhere</h3>
      <p className="text-gray-600 mt-3 leading-relaxed">
        Accessible on any device so students can learn at home or in school.
      </p>
    </div>

    {/* Card 6 */}
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-gray-800">Encourages Achievement</h3>
      <p className="text-gray-600 mt-3 leading-relaxed">
        Builds confidence through progress, stories completed, and learning milestones.
      </p>
    </div>

  </div>

</section>


  <section className="w-full py-24 bg-pink-500 text-center px-6">

  <div className="max-w-3xl mx-auto">

    {/* Heading */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
      Ready to Start Your Reading Adventure? 
    </h2>

    {/* Description */}
    <p className="text-base sm:text-lg text-white mb-10 leading-relaxed">
      Step into a world full of magical stories, fun learning activities,
      and exciting adventures made just for young minds.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

      <button className="bg-purple-500 hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition duration-300"
      onClick={() => setShowLogin(true)}>
        Browse Library
      </button>

    </div>

  </div>
</section>

      <Footer />
    </>
  );
};


export default Home_Page;