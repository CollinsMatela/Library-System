import Books_Model from "../models/Books_Model.js";
import StoryBookDetails_Model from "../models/StoryBookDetails_Model.js";
import EducationalBookDetails_Model from "../models/EducationalDetails_Model.js"
import ChildrensBookDetails_Model from "../models/ChildrensBookDetails_Model.js";
import ReferenceBookDetails_Model from "../models/ReferenceBookDetails_Model.js";

import cloudinary from "../config/cloudinary.js";
import fs from "fs";


const Upload_Manually_Controller = async (req, res) => {
  const {
      title, author, description, gradeCategory, language, publication, publisher, isbn, availability, type, pages,

      // Story Book
      genre, storySeries, storyVolume,

      // Work Book
      workbookTopic, workbookSubject, workbookType, workbookEdition,

      // Educational Book
      subject, educationalEdition,

      // Reference Book
      referenceType, subjectArea, referenceEdition, referenceVolume,

      // Children's Book
      readingLevel, illustrator, moralTheme, storyType
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

    // const book = await Books_Model.create({
    //   title,
    //   author,
    //   description,
    //   type: type,
    //   language,
    //   publication,
    //   publisher,
    //   isbn,
    //   gradeCategory,
    //   cover: coverImage,
    //   pages: updatedPages,
    //   availability
    // });

    if(type === 'storybook'){ 
      await StoryBookDetails_Model.create({
          title,
          author,
          description,
          type: type,
          language,
          publication,
          publisher,
          isbn,
          gradeCategory,
          cover: coverImage,
          pages: updatedPages,
          availability,
          genre
      })

      res.status(201).json({success: true, message: "Childrens book uploaded successfully"});
    }
    if(type === 'childrensbook'){
      await ChildrensBookDetails_Model.create({
        title,
          author,
          description,
          type: type,
          language,
          publication,
          publisher,
          isbn,
          gradeCategory,
          cover: coverImage,
          pages: updatedPages,
          availability,
          readingLevel, 
          illustrator, 
          moralTheme, 
          storyType
        }) 

        res.status(201).json({success: true, message: "Childrens book uploaded successfully"});
    }
    if(type === 'educationalbook'){
       await EducationalBookDetails_Model.create({
          title,
          author,
          description,
          type: type,
          language,
          publication,
          publisher,
          isbn,
          gradeCategory,
          cover: coverImage,
          pages: updatedPages,
          availability,
          subject,
          educationalEdition
        }) 
        res.status(201).json({success: true, message: "Educational book uploaded successfully"});
    }
    if(type === 'referencebook'){
      const referencebook = await ReferenceBookDetails_Model.create({
          title,
          author,
          description,
          type: type,
          language,
          publication,
          publisher,
          isbn,
          gradeCategory,
          cover: coverImage,
          pages: updatedPages,
          availability,
          referenceType, 
          subjectArea, 
          referenceEdition, 
          referenceVolume
        }) 
        res.status(201).json({success: true, message: "Reference book uploaded successfully"});
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