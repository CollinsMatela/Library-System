import Fiction_Model from '../models/Fiction_Model.js';
import NonFiction_Model from '../models/NonFiction_Model.js';

const EditBookInformationController = async (req, res) => {
    const {bookId} = req.params;
    const {title, author, language, publisher, publication, isbn, description, edition, volume, moral, illustrator, fictionSeries, scientificField, mathBranch, technologyField, engineeringDiscipline, medicalField, referenceType, subjectArea, dictionaryType, geographicCoverage, subject, gradeLevel, researchField, institution, doi, businessArea, economicsBranch} = req.body;
   
    console.log(description);
    console.log(edition);
    console.log(volume);

    try {
    let book = await Fiction_Model.findById(bookId) || await NonFiction_Model.findById(bookId);

    if(!book) {
        return res.status(404).json({message: "Book not found"});
    }

    if(book.type.toLowerCase() === 'fiction') {
      const updatedBook = await Fiction_Model.findByIdAndUpdate(bookId, {
        title: title,
        author: author,
        language: language,
        publisher: publisher,
        publication: publication,
        isbn: isbn,
        description: description,
        edition: edition,
        moral: moral,
        illustrator: illustrator,
        volume: volume,
        fictionSeries: fictionSeries,
      }, {new: true});
      
      res.status(200).json({message: "Fiction book information updated successfully", book: updatedBook});
    }
    else {
      const updatedBook = await NonFiction_Model.findByIdAndUpdate(bookId, {
        title: title,
        author: author,
        language: language,
        publisher: publisher,
        publication: publication,
        isbn: isbn,
        description: description,
        edition: edition,
        volume: volume,
        scientificField: scientificField,
        mathBranch: mathBranch,
        technologyField: technologyField,
        engineeringDiscipline: engineeringDiscipline,
        medicalField: medicalField,
        referenceType: referenceType,
        subjectArea: subjectArea,
        dictionaryType: dictionaryType,
        geographicCoverage: geographicCoverage,
        subject: subject,
        gradeLevel: gradeLevel,
        researchField: researchField,
        institution: institution,
        doi: doi,
        businessArea: businessArea,
        economicsBranch: economicsBranch,

      }, {new: true});
      res.status(200).json({message: "Non-fiction book information updated successfully", book: updatedBook});
    }
    } catch (error) {
        console.error("Error updating book information:", error);
        res.status(500).json({message: "Error updating book information", error: error.message});
    }
}
export default EditBookInformationController;