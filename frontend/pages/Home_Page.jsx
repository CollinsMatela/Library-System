import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";
import BooksImage from "../src/assets/books.jpg"
import LibraryImage from "../src/assets/library.png"
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  AudioLines,
  Clapperboard,
  Sparkles,
} from "lucide-react";



const Home_Page = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);

  return (
    <>

      <Navigation />

      {/* Content */}
<section className="relative z-10 min-h-screen max-w-7xl mx-auto w-full justify-center items-center flex px-6 md:px-12">
  <div className="grid md:grid-cols-2 gap-12 items-center">

    {/* Left Side */}
    <div className="text-left">
      <div className="inline-block bg-blue-100 rounded-full px-6 py-2 text-xs font-semibold text-blue-600">
        Welcome to Naic Municipal Library
      </div>

      <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-none">
        Discover
        <br />
        <span className="text-gray-800">Knowledge</span>
        <br />
        That Inspires
      </h1>

      <p className="mt-6 text-sm text-gray-600 max-w-lg">
        Explore books, resources, and knowledge for learning, research,
        personal growth, and lifelong discovery—all in one place.
      </p>

      <button
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition"
        onClick={() => navigate('/login')}
      >
        Explore the Library
      </button>
    </div>

    {/* Right Side */}
    <div className="text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        A Place to Learn, Read, and Discover
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed">
        Naic Municipal Library is a public library dedicated to providing
        accessible information, educational resources, and reading materials
        for the community. Whether you are a student, teacher, researcher,
        professional, or lifelong learner, the library offers resources to
        support your journey.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mt-5">
        Browse our collection, discover new books, find useful references,
        and expand your knowledge. From academic learning and research to
        personal reading and exploration, the library is here to help the
        community learn, connect, and grow.
      </p>
    </div>

  </div>
</section>

<section className="min-h-screen w-full py-20 bg-gray-100 px-6 md:px-16">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* Content */}
    <div>
      <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-semibold">
        About Naic Municipal Library
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 mb-6 leading-tight">
        Knowledge and Resources
        <span className="text-blue-600"> Within Reach</span>
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Naic Municipal Library is a public library that provides accessible
        books, educational materials, references, and digital resources for
        the community. It serves as a place where students, teachers,
        researchers, professionals, and residents can read, learn, and
        discover information.
      </p>

      <p className="text-gray-600 text-sm leading-relaxed">
        Through our digital library platform, users can conveniently explore
        available resources and discover materials that support education,
        research, personal development, and lifelong learning.
      </p>

      <div className="flex gap-8 mt-8">
        <div>
          <h3 className="text-3xl font-bold text-blue-600">100+</h3>
          <p className="text-gray-500">Library Resources</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
          <p className="text-gray-500">Digital Access</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-600">Free</h3>
          <p className="text-gray-500">Community Service</p>
        </div>
      </div>
    </div>

    {/* Image */}
    <div className="bg-white rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">
      <img
        src={LibraryImage}
        alt="Naic Municipal Library"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>

  </div>
</section>


<section className="min-h-screen w-full py-24 bg-white px-6 md:px-16">

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

    {/* LEFT SIDE - TEXT */}
    <div>

      <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-semibold">
        Explore Library Features
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6 leading-tight">
        Everything You Need to
        <span className="text-blue-600"> Explore & Manage Books</span>
      </h2>

      <p className="text-gray-600 mt-6 text-sm leading-relaxed">
        The Naic Municipal Library digital platform makes it easier for
        community members to discover library resources, explore book
        collections, and access important information from one convenient
        platform.
      </p>

      <p className="text-gray-500 mt-4  text-sm leading-relaxed">
        Search through the library collection, view detailed book information,
        check availability, and manage your library activities with a simple
        and accessible digital experience.
      </p>


    </div>

    {/* RIGHT SIDE - FEATURES */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

  {/* Feature 1 */}
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl mb-4">
      <BrainCircuit size={20}/>
    </div>

    <h3 className="font-bold text-gray-800 text-lg">
      AI Story Summarization
    </h3>

    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
      Get concise, easy-to-understand summaries of selected books and stories
      using AI-powered text summarization.
    </p>
  </div>

  {/* Feature 2 */}
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl mb-4">
       <AudioLines size={20}/>
    </div>

    <h3 className="font-bold text-gray-800 text-lg">
      Text-to-Speech
    </h3>

    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
      Listen to digital reading materials with text-to-speech technology,
      making stories and information more accessible.
    </p>
  </div>

  {/* Feature 3 */}
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl mb-4">
      <Clapperboard size={20}/>
    </div>

    <h3 className="font-bold text-gray-800 text-lg">
      Automatic Storytelling
    </h3>

    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
      Transform written stories into engaging visual storytelling experiences
      with automatically generated story videos.
    </p>
  </div>

  {/* Feature 4 */}
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xl mb-4">
      <Sparkles size={20}/>
    </div>

    <h3 className="font-bold text-gray-800 text-lg">
      Interactive Reading
    </h3>

    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
      Experience a more engaging way to explore digital books through
      multimedia content and interactive reading features.
    </p>
  </div>

</div>



  </div>
</section>


<section className="min-h-screen w-full py-24 bg-black px-6 md:px-16">

  <div className="max-w-6xl mx-auto text-center">

    {/* Badge */}
    <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-semibold">
      Benefits of Using the Platform
    </span>

    {/* Title */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-6 leading-tight">
      A Better Way to
      <span className="text-blue-500"> Access the Library</span>
    </h2>

    <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-sm leading-relaxed">
      The Naic Municipal Library digital platform makes it easier for users
      to discover resources, access information, and manage their library
      activities through a convenient online experience.
    </p>

  </div>

  {/* Cards */}
  <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8">

    {/* Card 1 */}
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-white">
        Find Books Easily
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        Search and browse the library collection without having to manually
        look through shelves or physical records.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-white">
        Access Information Online
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        View book details, descriptions, availability, and other important
        information from anywhere with an internet connection.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-white">
        Read Digital Resources
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        Access available digital books and reading materials directly through
        the platform for a more convenient reading experience.
      </p>
    </div>

    {/* Card 4 */}
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-white">
        Use AI-Powered Features
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        Make reading more convenient with features such as AI summaries,
        automatic storytelling, and text-to-speech.
      </p>
    </div>

    {/* Card 5 */}
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-white">
        Save Time
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        Quickly find the resources you need and check book information before
        visiting the library.
      </p>
    </div>

    {/* Card 6 */}
    <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-2 transition duration-300 text-center">
      <h3 className="font-bold text-xl text-white">
        Manage Library Activities
      </h3>

      <p className="text-gray-400 mt-3 leading-relaxed">
        Keep track of your book requests, borrowing activities, and other
        library transactions in one convenient place.
      </p>
    </div>

  </div>

</section>






  

      <Footer />
    </>
  );
};


export default Home_Page;