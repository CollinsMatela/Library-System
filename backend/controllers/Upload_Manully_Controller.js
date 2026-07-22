import Fiction_Model from "../models/Fiction_Model.js";
import NonFiction_Model from "../models/NonFiction_Model.js";

import cloudinary from "../config/cloudinary.js";
import fs from "fs";


const Upload_Manually_Controller = async (req, res) => {
  const {
    // General
    type, category, field, title, author, description, language, publication, publisher, isbn, illustrator, moral,
    edition, volume, ddc, copies, callNumber, availableAt, pages, subject, gradeLevel, series,

} = req.body;

  try {

    const parsedPages = JSON.parse(pages);

    const coverFile = req.files.find(f => f.fieldname === "cover");
    
    // 🔥 FIX: collect ALL page images from upload.any()
    const pageFiles = req.files.filter(f =>
      f.fieldname.startsWith("pageImages_")
    );

    // upload cover
    let coverImage = "";

    if (coverFile) {
      const coverUpload = await cloudinary.uploader.upload(
        coverFile.path,
        { folder: "books/covers" }
      );

      coverImage = coverUpload.secure_url;
      fs.unlinkSync(coverFile.path);
    }

    // 🔥 GROUP page images by page index
    const pageImagesMap = {};

    for (const file of pageFiles) {

      const match = file.fieldname.match(/pageImages_(\d+)/);

      if (!match) continue;

      const index = match[1];

      const result = await cloudinary.uploader.upload(
        file.path,
        { folder: "books/pages" }
      );

      if (!pageImagesMap[index]) {
        pageImagesMap[index] = [];
      }

      pageImagesMap[index].push(result.secure_url);

      fs.unlinkSync(file.path);
    }

    const updatedPages = parsedPages.map((page, index) => ({
      pageText: page.pageText,
      pageImage: pageImagesMap[index] || []
    }));


    if(type.toLowerCase() === 'fiction'){ 
      await Fiction_Model.create({
          type,
          category,

          title,
          author,
          description,
          language,
          publication,
          publisher,
          isbn,
          illustrator,
          moral,
          series,
          copies: Number(copies),
          callNumber,
          availableAt,

          cover: coverImage,
          pages: updatedPages,
          
          edition,
          volume
      })

      res.status(201).json({success: true, message: "Book uploaded successfully"});
    }

    if(type.toLowerCase() === 'non-fiction'){ 
      await NonFiction_Model.create({
          type,
          category,
          field,

          title,
          author,
          description,
          type: type,
          language,
          publication,
          publisher,
          isbn,

          ddc,
          copies: Number(copies),
          callNumber,
          availableAt,

          subject, 
          gradeLevel,

          cover: coverImage,
          pages: updatedPages,
          
          edition,
          volume
      })

      res.status(201).json({success: true, message: "Book uploaded successfully"});
    }

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default Upload_Manually_Controller;