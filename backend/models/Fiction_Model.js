import mongoose from "mongoose";

const FictionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, default: "" },
    description: { type: String, default: "" },
    language: {type: String, default: ""},
    publication: {type: String, default: ""},
    publisher: {type: String, default: ""},
    isbn: {type: String, default: ""},
    copies: { type: Number, min:1, default: 1},
    callNumber: { type: String, default: "" },
    availableAt: { type: String, default: "" },

    pages: [{
             pageText: {type: String},
             pageImage: [String]
    }],
    cover: { type: String, required: true },
    availability: { type: Boolean, default: true },

    series: { type: String, default: "" },
    edition: { type: String, default: "" },
    volume: { type: String, default: "" },
  },
  {
    timestamps: true
  }
);

const Fiction_Model = mongoose.model("Fiction Model", FictionSchema);
export default Fiction_Model;