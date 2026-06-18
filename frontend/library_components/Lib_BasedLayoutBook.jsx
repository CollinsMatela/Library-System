import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Images, X} from "lucide-react";

const Lib_BasedLayoutBook = ({book, pageIndex, nextPage, prevPage, onClose}) => {

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;

    return (
    <div className="relative h-screen w-1/2 flex flex-col overflow-y-auto gap-4">

      {book?.pages?.map((page, index) => (
        <div key={page._id} className=" w-full bg-white flex flex-col">

          {/* Text */}
          {page.pageText && (
            <div className="p-10 text-lg justify-center items-start flex flex-col bg-gray-50">
              
              <header className="w-full justify-end items-center flex mb-10 gap-2">
                   <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => alert('TTS not yet integrated.')}><Images className="text-gray-500"/></button>
                   <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => alert('TTS not yet integrated.')}><AudioLines className="text-gray-500"/></button>
                   <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={onClose}><X className="text-gray-500"/></button>
              </header>

              {/**Images Container */}
              <div className={`bg-gray-100 w-full mb-10 grid grid-cols-3 p-4`}>
                {/* Image */}
                {page?.[pageIndex]?.pageImage.map((image, index) => {
                    <img
                        src={image}
                        className="w-full h-100 h-100 object-cover"
                    />
                })}
                
              </div>
              
              <h1 className="text-md text-gray-800 leading-loose whitespace-pre-line">{page.pageText}</h1>

              <footer className="w-full justify-center items-center flex mt-10">
                <h1 className="text-xs text-gray-500">Page {index + 1}</h1>
              </footer>
            </div>
          )}

          {/* Empty state */}
          {!page.pageImage && !page.pageText && (
            <div className="flex justify-center items-center h-full">
              <ImageOff size={40} className="text-gray-500" />
            </div>
          )}

        </div>
      ))}

    </div>
  );
}
export default Lib_BasedLayoutBook