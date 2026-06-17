import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Lib_BookCard from "./Lib_BookCard";
import { LibraryBig, BookCheck, NotepadText } from "lucide-react";
import axios from 'axios'

const Lib_FirstGradeBooks = ({storyBook, referenceBook, educationalBook, childrensBook}) => {

    useEffect(() => {
        console.log("Received Story:", storyBook.length);
        console.log("Received Reference:", referenceBook.length);
        console.log("Received Educational:", educationalBook.length);
        console.log("Received Childrens:", childrensBook.length);
    }, [storyBook, referenceBook, educationalBook, childrensBook])

    const storybookGrade1 = storyBook.filter((book) => book.gradeCategory.toLowerCase() === "grade 1");
    const referencebookGrade1 = referenceBook.filter((book) => book.gradeCategory.toLowerCase() === "grade 1");
    const educationalbookGrade1 = educationalBook.filter((book) => book.gradeCategory.toLowerCase() === "grade 1");

    return(
        <section className="min-h-screen w-full">

            <div className="w-full px-10 mb-5">
                <h1 className="text-lg font-bold text-gray-500 rounded-full">Story book Section</h1>
                <p className="text-gray-400 text-sm">Oversee all available story books.</p>
            </div>
            <div className="w-full gap-2 grid grid-cols-4 px-10"> 
            {storybookGrade1.map((book) => (
                <Lib_BookCard key={book._id}
                              bookId={book?._id}
                              cover={book?.cover}
                              title={book?.title}
                              author={book?.author}
                              genre={book?.genre}
                              language={book?.language}
                />
                
            ))}
            </div>

            <div className="w-full px-10 mb-5">
                <h1 className="text-lg font-bold text-gray-500 rounded-full">Educational book Section</h1>
                <p className="text-gray-400 text-sm">Oversee all available educational books.</p>
            </div>
            <div className="w-full gap-2 grid grid-cols-4 px-10"> 
            {educationalbookGrade1.map((book) => (
                <Lib_BookCard key={book?._id}
                              bookId={book?._id}
                              cover={book?.cover}
                              title={book?.title}
                              author={book?.author}
                              subject={book?.subject}
                              language={book?.language}
                />
                
            ))}
            </div>

            <div className="w-full px-10 mb-5">
                <h1 className="text-lg font-bold text-gray-500 rounded-full">Reference book Section</h1>
                <p className="text-gray-400 text-sm">Oversee all available childrens books.</p>
            </div>
            <div className="w-full gap-2 grid grid-cols-4 px-10"> 
            {referencebookGrade1.map((book) => (
                <Lib_BookCard key={book?._id}
                              bookId={book?._id}
                              cover={book?.cover}
                              title={book?.title}
                              author={book?.author}
                              language={book?.language}
                              referenceType={book?.referenceType}
                              subjectArea={book?.subjectArea}
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
                />
                
            ))}
            </div>

        </section>
    )
}
export default Lib_FirstGradeBooks;