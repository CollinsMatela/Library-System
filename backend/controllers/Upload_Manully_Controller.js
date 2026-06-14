 import Books_Model from "../models/Books_Model.js";
import cloudinary from "../config/cloudinary.js";
import { nanoid } from "nanoid";
import { createRequire } from "module";
import { randomUUID } from "crypto";
import fs from "fs";


const Upload_Manually_Controller = async (req, res) => {
  const {title, author, description, genre, type, language, publication, gradeCategory, pages}= req.body

  try {

    const parsedPages = JSON.parse(pages);

    const coverFile = req.files.cover?.[0];
    const pageFiles = req.files.pageImages || [];

    let coverImage = "";

    if (coverFile) {
      const coverUpload = await cloudinary.uploader.upload(
        coverFile.path,
        {
          folder: "books/covers"
        }
      );

      coverImage = coverUpload.secure_url;

      fs.unlinkSync(coverFile.path);
    }

    const uploadedPageImages = [];

    for (const file of pageFiles) {

      const result = await cloudinary.uploader.upload(
        file.path,
        {
          folder: "books/pages"
        }
      );

      uploadedPageImages.push(result.secure_url);

      // remove temp file
      fs.unlinkSync(file.path);
    }

    const updatedPages = parsedPages.map((page, index) => ({
      pageText: page.pageText,
      pageImage: uploadedPageImages[index] || ""
    }));

    const book = await Books_Model.create({
      id: randomUUID(),
      title,
      author,
      description,
      genre,
      type: type,
      language,
      summary: "—",
      publication,
      gradeCategory,
      cover: coverImage,
      pages: updatedPages
    });


    res.status(201).json({
      success: true,
      message: "Book uploaded successfully",
      book
    });

    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default Upload_Manually_Controller;