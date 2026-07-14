import mongoose from "mongoose";

const NonFictionSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    category: { type: String, required: true },
    field: { type: String, default: ""},

    title: { type: String, required: true },
    author: { type: String, default: ""},
    description: { type: String, default: ""},
    language: {type: String, default: ""},
    publication: {type: String, default: ""},
    publisher: {type: String, default: ""},
    isbn: {type: String, default: ""},

    subject: {type: String, default: ""}, 
    gradeLevel: {type: String, default: ""},

    pages: [{
             pageText: {type: String},
             pageImage: [String]
    }],
    cover: { type: String, required: true },
    availability: { type: Boolean, defualt: true },

    edition: { type: String, default: "" },
    volume: { type: String, default: "" },

    ddc: { type: String, default: "" },
    copies: { type: Number, min:1, default: 1},
    callNumber: { type: String, default: "" },
    availableAt: { type: String, default: "" },
  },
  {
    timestamps: true
  }
);

const NonFiction_Model = mongoose.model("Non-Fiction Model", NonFictionSchema);
export default NonFiction_Model;