import Navigation from "../components/HomePageNavigation";
import Footer from "../components/Footer";
import BooksImage from "../src/assets/books.jpg"
import User_Page from "../src/assets/user_page.png"
import MapLocation from "../src/assets/LibraryMap.png"
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
<div className="w-full scroll-smooth">
      {/* Content */}
<section id="home" className="bg-white relative z-10 min-h-screen max-w-7xl mx-auto w-full justify-center items-center flex px-6 md:px-12 border-b">
  <div className="justify-start items-start gap-10 lg:gap-2 flex flex-col lg:flex-row min-h-screen lg:h-screen py-20">

    {/* Left Side */}
    <div className="h-full justify-between items-start flex flex-col">
      <div className="w-full">
          <div className="inline-block rounded-full text-[10px] font-medium text-stone-800">
          1. Welcome to 
        </div>

        <h1 className="mt-6 text-4xl sm:text-6xl lg:text-4xl font-extrabold text-stone-800 leading-none uppercase">
          Naic Municipal
          <br />
          Library
        </h1>

        <p className="mt-6 text-sm text-stone-800 max-w-lg">
          Explore books, resources, and knowledge for learning, research,
          personal growth, and lifelong discovery—all in one place.
        </p>

        <button
          className="mt-8 bg-stone-800 hover:bg-stone-900 text-white text-sm font-bold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition"
          onClick={() => navigate('/login')}
        >
          Explore the Library
        </button>
      </div>

      <div className="w-full">
          <p className="mt-6 text-sm text-stone-800 max-w-lg">
          Try it now! for free
        </p>
      </div>
      
    </div>

    {/* Right Side */}
    <div className="h-full w-full rounded-lg border-4 border-stone-800 shadow-xl">
      <img
        src={User_Page}
        alt="User page"
        className="w-full h-full rounded-lg object-cover"
      />
    </div>

  </div>
</section>

<section id="about" className="min-h-screen w-full py-20 bg-white px-6 md:px-16 border-b">
  <div className="max-w-6xl mx-auto grid md:grid-cols-1 gap-12 items-center">

    {/* Content */}
    <div className="justify-center items-start flex flex-col">
      <span className="text-stone-800 rounded-full text-[10px] font-medium">
        2. About Naic Municipal Library
      </span>

      <h2 className="text-4xl md:text-7xl uppercase font-extrabold text-stone-800 mt-6 mb-6 leading-tight">
        Public Library free access to everyone
      
      </h2>

      <p className="text-stone-800 text-sm leading-relaxed mb-4">
        Naic Municipal Library is a public library that provides accessible
        books, educational materials, references, and digital resources for
        the community. It serves as a place where students, teachers,
        researchers, professionals, and residents can read, learn, and
        discover information.
      </p>

      <p className="text-stone-800 text-sm leading-relaxed">
        Through our digital library platform, users can conveniently explore
        available resources and discover materials that support education,
        research, personal development, and lifelong learning.
      </p>

      <div className="flex gap-8 mt-8">
        <div>
          <h3 className="text-3xl font-bold text-stone-800">100+</h3>
          <p className="text-stone-500">Library Resources</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-stone-800">24/7</h3>
          <p className="text-stone-500">Digital Access</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-stone-800">Free</h3>
          <p className="text-stone-500">Access Anytime</p>
        </div>
      </div>
    </div>

    <div className="w-full border-4 border-stone-800 rounded-lg shadow-xl">
      <img src={MapLocation} className="h-full w-full object-cover rounded-lg" />
    </div>

  </div>
</section>


<section id="features" className="min-h-screen w-full py-24 bg-white px-6 md:px-16 border-b">

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">

    {/* LEFT SIDE - TEXT */}
    <div>

      <h2 className="text-4xl bg-stone-800 rounded-xl md:text-5xl uppercase font-extrabold text-white py-4 px-6 leading-tight">
        With enhance interactive features
      </h2>

      <p className="text-stone-800 mt-6 rounded-full text-xs font-medium">
        3. Explore Library Features
      </p>

      <p className="text-stone-800 mt-6 text-sm leading-relaxed">
        The Naic Municipal Library digital platform makes it easier for
        community members to discover library resources, explore book
        collections, and access important information from one convenient
        platform.
      </p>

      <p className="text-stone-500 mt-4  text-sm leading-relaxed">
        Search through the library collection, view detailed book information,
        check availability, and manage your library activities with a simple
        and accessible digital experience.
      </p>


    </div>

    {/* RIGHT SIDE - FEATURES */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

  {/* Feature 1 */}
  <div className="bg-white p-6 rounded-2xl shadow-md border-2 hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-800 text-white text-xl mb-4">
      <BrainCircuit size={20}/>
    </div>

    <h3 className="font-bold text-stone-800 text-lg">
      AI Story Summarization
    </h3>

    <p className="text-sm text-stone-500 mt-2 leading-relaxed">
      Get concise, easy-to-understand summaries of selected books and stories
      using AI-powered text summarization.
    </p>
  </div>

  {/* Feature 2 */}
  <div className="bg-white p-6 rounded-2xl shadow-md border-2 hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-800 text-white text-xl mb-4">
       <AudioLines size={20}/>
    </div>

    <h3 className="font-bold text-stone-800 text-lg">
      Text-to-Speech
    </h3>

    <p className="text-sm text-stone-500 mt-2 leading-relaxed">
      Listen to digital reading materials with text-to-speech technology,
      making stories and information more accessible.
    </p>
  </div>

  {/* Feature 3 */}
  <div className="bg-white p-6 rounded-2xl border-2 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-800 text-white text-xl mb-4">
      <Clapperboard size={20}/>
    </div>

    <h3 className="font-bold text-stone-800 text-lg">
      Automatic Storytelling
    </h3>

    <p className="text-sm text-stone-500 mt-2 leading-relaxed">
      Transform written stories into engaging visual storytelling experiences
      with automatically generated story videos.
    </p>
  </div>

  {/* Feature 4 */}
  <div className="bg-white p-6 rounded-2xl border-2 shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-stone-800 text-white text-xl mb-4">
      <Sparkles size={20}/>
    </div>

    <h3 className="font-bold text-stone-800 text-lg">
      Interactive Reading
    </h3>

    <p className="text-sm text-stone-500 mt-2 leading-relaxed">
      Experience a more engaging way to explore digital books through
      multimedia content and interactive reading features.
    </p>
  </div>

</div>



  </div>
</section>
    </div>
      <Footer />
    </>
  );
};


export default Home_Page;