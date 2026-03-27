import Navigation from "../components/HomePageNavigation"
import Footer from "../components/Footer"
const Home_Page = () => {
    return(
        <>       
        <section className="min-h-screen w-full bg-white justify-center items-center flex flex-col px-20 gap-4">
            <Navigation/>
            <div className="border-2  rounded-xl px-2">✨ Online Library System</div>
            <h1 className="text-black text-8xl">Read, Play, and Learn Every Day!</h1>
            <h1 className="text-black text-lg">A fun and colorful place where little learners can explore stories, learn new things, and grow their imagination.</h1>
            <div className="bg-black justify-center items-center flex py-2 px-4 text-white rounded-full gap-2 cursor-pointer"> Get Started ➤ </div>
        </section>
        <Footer/>
        </>
    )    
}
export default Home_Page;