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

    console.log(req.files.map(file => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
    })));

    const parsedPages = JSON.parse(pages);

    const coverFile = req.files.find(file => file.fieldname === "cover");

    let coverImage = "";

    if (coverFile) {
      const result = await cloudinary.uploader.upload(coverFile.path, {
        folder: "books/covers",
      });

      coverImage = result.secure_url;
      fs.unlinkSync(coverFile.path);
    }

    const updatedPages = [];

    for (let i = 0; i < parsedPages.length; i++) {
      const page = parsedPages[i];

      const imageFile = req.files.find(
        file => file.fieldname === `pageImage_${i}`
      );

      const audioFile = req.files.find(
        file => file.fieldname === `pageAudio_${i}`
      );

      let imageUrl = "";
      let audioUrl = "";

      if (imageFile) {
        const result = await cloudinary.uploader.upload(imageFile.path, {
          folder: "books/pages/images",
        });

        imageUrl = result.secure_url;
        fs.unlinkSync(imageFile.path);
      }

      if (audioFile) {
        const result = await cloudinary.uploader.upload(audioFile.path, {
          resource_type: "video", // Cloudinary stores audio as "video"
          folder: "books/pages/audio",
        });

        audioUrl = result.secure_url;
        fs.unlinkSync(audioFile.path);
      }

      updatedPages.push({
        pageText: page.pageText,
        pageImage: imageUrl,
        pageAudio: audioUrl,
      });
    }


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