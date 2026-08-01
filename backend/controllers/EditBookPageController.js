import Fiction_Model from "../models/Fiction_Model.js";
import NonFiction_Model from "../models/NonFiction_Model.js";

import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const EditBookPageController = async (req, res) => {
      const { bookId, pageId, pageText, pageImage, pageAudio } = req.body;

      try {

      let book = await Fiction_Model.findById(bookId) ||
                 await NonFiction_Model.findById(bookId);
      
      if (!book) { return res.status(404).json({message: "Book not found"});}

      const currentPage = book.pages.id(pageId);

      if (!currentPage) {
        return res.status(404).json({
            message: "Page not found"
        });
      }

      const updatedPage = {
        pageText,
        pageImage,
        pageAudio
      }



      if(book.type.toLowerCase() === 'fiction') {
        const result = await Fiction_Model.updateOne(
            { _id: bookId, "pages._id": pageId },
            {
                $set: {
                    "pages.$.pageText": updatedPage.pageText,
                    "pages.$.pageImage": updatedPage.pageImage,
                    "pages.$.pageAudio": updatedPage.pageAudio
                }
            }
        );

        console.log(result);
        res.status(200).json({ message: "Fiction:Page updated successfully", updatedPage });
      }
      if(book.type.toLowerCase() === 'non-fiction') {
        const result = await NonFiction_Model.updateOne(
        { _id: bookId, "pages._id": pageId },
            {
                $set: {
                    "pages.$.pageText": updatedPage.pageText,
                    "pages.$.pageImage": updatedPage.pageImage,
                    "pages.$.pageAudio": updatedPage.pageAudio
                }
            }
        );

        console.log(result);
        res.status(200).json({ message: "Non-Fiction: Page updated successfully", updatedPage });
      }
      
      } catch (error) {
        console.error("Error updating book page:", error);
        res.status(500).json({ message: "Internal server error" });
      }
}
export default EditBookPageController;