
import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    month: {
        type: Number,
        default: 0
    },
    year: {
        type: Number,
        default: () => new Date().getFullYear()
    },

    totalCollection: {
        type: Number,
        default: 0
    },

    // Past collection at the beginning of the month
    pastCollection: {
        books: { type: Number, default: 0 },
        non_books_materials: { type: Number, default: 0 }
    },

    // Past non-book materials breakdown
    pastMaterials: {
        clippings: { type: Number, default: 0 },
        electronics: { type: Number, default: 0 },
        government_publication: { type: Number, default: 0 },
        maps: { type: Number, default: 0 },
        newspaper: { type: Number, default: 0 },
        magazines: { type: Number, default: 0 }
    },

    // Allocation from the National Library
    fromNationalLibrary: {
        books: { type: Number, default: 0 },
        non_books: { type: Number, default: 0 }
    },

    // Allocation from donations
    fromDonations: {
        books: { type: Number, default: 0 },
        non_books: { type: Number, default: 0 }
    },

    // Purchased from local funds / in-house preparation
    purchased: {
        books: { type: Number, default: 0 },
        magazines: { type: Number, default: 0 },
        newspaper: { type: Number, default: 0 },
        clippings: { type: Number, default: 0 },
        electronics: { type: Number, default: 0 },
        government_publication: { type: Number, default: 0 },
        maps: { type: Number, default: 0 }
    },

    // Library statistics
    numberOfDays: {
        type: Number,
        default: 0
    },
    numberOfReader: {
        type: Number,
        default: 0
    },

    reader_boys: {
        children: { type: Number, default: 0 },
        adult: { type: Number, default: 0 }
    },

    reader_girls: {
        children: { type: Number, default: 0 },
        adult: { type: Number, default: 0 }
    },

    numberOfComputerUser: {
        type: Number,
        default: 0
    },

    computer_boys: {
        children: { type: Number, default: 0 },
        adult: { type: Number, default: 0 }
    },

    computer_girls: {
        children: { type: Number, default: 0 },
        adult: { type: Number, default: 0 }
    },

    // Book usage statistics
    consultedBooks: { type: Number, default: 0 },
    circulatedBooks: { type: Number, default: 0 },

    consultedSerials: { type: Number, default: 0 },
    circulatedSerials: { type: Number, default: 0 },

    consultedClippings: { type: Number, default: 0 },
    circulatedClippings: { type: Number, default: 0 },

    consultedThesis: { type: Number, default: 0 },
    circulatedThesis: { type: Number, default: 0 },

    librarian_name: {
        type: String,
        default: ""
    }
});

const ReportModel = mongoose.model("ReportModel", ReportSchema);

export default ReportModel;
