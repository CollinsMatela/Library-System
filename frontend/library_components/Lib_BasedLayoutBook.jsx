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
                   <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => alert('TTS not yet integrated.')}><AudioLines className="text-gray-500"/></button>
                   <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={onClose}><X className="text-gray-500"/></button>
              </header>
              
              <h1 className="text-md text-gray-800 leading-loose whitespace-pre-line">{page.pageText}</h1>

              {/** Images Container - Only renders if pageImage array exists and has items */}
              {page.pageImage && page.pageImage.length > 0 && (
                <div className="border-t-1 border-gray-500  w-full my-10 grid grid-cols-1 p-4 gap-2">
                <h1 className="text-md text-gray-800 leading-loose whitespace-pre-line">Images</h1>
                  
                  {page.pageImage.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Page ${index + 1} graphic ${imgIndex + 1}`}
                      className="w-full  object-cover rounded" 
                    />
                  ))}
                </div>
              )}

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