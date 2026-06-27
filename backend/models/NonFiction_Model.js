import mongoose from "mongoose";

const NonFictionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    category: { type: String, required: true },

    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    language: {type: String, required: true},
    publication: {type: String, required: true},
    publisher: {type: String, required: true},
    isbn: {type: String, required: true},

    scientificField: {type: String, default: "—"},
    mathBranch: {type: String, default: "—"},
    technologyField: {type: String, default: "—"},
    engineeringDiscipline: {type: String, default: "—"},
    medicalField: {type: String, default: "—"},

    referenceType: {type: String, default: "—"},
    subjectArea: {type: String, default: "—"},
    dictionaryType: {type: String, default: "—"},
    geographicCoverage: {type: String, default: "—"},

    subject: {type: String, default: "—"}, 
    gradeLevel: {type: String, default: "—"},

    researchField: {type: String, default: "—"},
    institution: {type: String, default: "—"},
    doi: {type: String, default: "—"},

    businessArea: {type: String, default: "—"},
    economicsBranch: {type: String, default: "—"},

    pages: [{
             pageText: {type: String},
             pageImage: [String]
    }],
    cover: { type: String, required: true },
    availability: { type: Boolean, required: true },

    edition: { type: String, default: "—" },
    volume: { type: String, default: "—" },
  },
  {
    timestamps: true
  }
);

const NonFiction_Model = mongoose.model("Non-Fiction Model", NonFictionSchema);
export default NonFiction_Model;