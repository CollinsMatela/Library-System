import mongoose from "mongoose";

const FictionSchema = new mongoose.Schema(
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
    type: {type: String, required: true},
    pages: [{
             pageText: {type: String},
             pageImage: [String]
    }],
    cover: { type: String, required: true },
    availability: { type: Boolean, required: true },

    fictionSeries: { type: String, default: "—" },
    edition: { type: String, default: "—" },
    volume: { type: String, default: "—" },
  },
  {
    timestamps: true
  }
);

const Fiction_Model = mongoose.model("Fiction Model", FictionSchema);
export default Fiction_Model;