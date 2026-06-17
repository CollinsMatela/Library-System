import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Lib_BookCard from "./Lib_BookCard";
import { LibraryBig, BookCheck, NotepadText } from "lucide-react";
import axios from 'axios'
import Lib_ViewBook from './Lib_ViewBook'
import { useNavigate } from "react-router-dom";

const Lib_KindergartenBooks = ({storyBook, childrensBook}) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Received Story:", storyBook.length);
        console.log("Received Childrens:", childrensBook.length);
    }, [storyBook, childrensBook])

    const storybookKinder = storyBook.filter((book) => book.gradeCategory.toLowerCase() === "kindergarten");

    return(
        <section className="min-h-screen w-full">

            <div className="w-full px-10 mb-5">
                <h1 className="text-lg font-bold text-gray-500 rounded-full">Story book Section</h1>
                <p className="text-gray-400 text-sm">Oversee all available story books.</p>
            </div>
            <div className="w-full gap-2 grid grid-cols-4 px-10"> 
            {storybookKinder.map((book) => (
                <Lib_BookCard 
                              key={book?._id}
                              bookId={book?._id}
                              cover={book?.cover}
                              title={book?.title}
                              author={book?.author}
                              genre={book?.genre}
                              language={book?.language}
                              navigate={() => navigate(`/library/view-book/${book?._id}`)}
                />
                
            ))}
            </div>

            <div className="w-full px-10 mb-5">
                <h1 className="text-lg font-bold text-gray-500 rounded-full">Childrens book Section</h1>
                <p className="text-gray-400 text-sm">Oversee all available childrens books.</p>
            </div>
            <div className="w-full gap-2 grid grid-cols-4 px-10"> 
            {childrensBook.map((book) => (
                <Lib_BookCard key={book?._id}
                              bookId={book?._id}
                              cover={book?.cover}
                              title={book?.title}
                              author={book?.author}
                              genre={book?.genre}
                              language={book?.language}
                              readingLevel={book?.readingLevel}
                              moralTheme={book?.moralTheme}
                              storyType={book?.storyType}
                              onClick={() => alert(book?._id)}
                />
                
            ))}
            </div>

        </section>
    )
}
export default Lib_KindergartenBooks;