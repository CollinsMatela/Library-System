import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      default: null, // ISBN can be unavailable for some books
    },
    edition: {
      type: String,
      default: null,
    },
    volume: {
      type: String,

      default: null,
    },
    arrivalDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    from: {
      type: String,
      default: null,
    },
    publishedDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["Available", "Borrowed", "Reserved", "Lost", "Damaged"],
      default: "Available",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Book", bookSchema);