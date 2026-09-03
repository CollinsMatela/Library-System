import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    language: {
        type: String,
        default: ""
    },

    publication: {
        type: String,
        default: ""
    },

    publisher: {
        type: String,
        default: ""
    },

    isbn: {
        type: String,
        default: ""
    },

    copies: {
        type: Number,
        min: 1,
        default: 1
    },

    callNumber: {
        type: String,
        default: ""
    },

    donatedFrom: {
        type: String,
        default: ""
    },

    receivedDate: {
        type: Date,
        default: Date.now
    },

    // Fiction-specific
    illustrator: {
        type: String,
        default: ""
    },

    moral: {
        type: String,
        default: ""
    },

    series: {
        type: String,
        default: ""
    },

    // Non-fiction-specific
    field: {
        type: String,
        default: ""
    },

    subject: {
        type: String,
        default: ""
    },

    gradeLevel: {
        type: String,
        default: ""
    },

    ddc: {
        type: String,
        default: ""
    },

    pages: [{
        pageText: String,
        pageImage: String,
        pageAudio: String,
        pageVideo: String
    }],

    cover: {
        type: String,
        required: true
    },

    edition: {
        type: String,
        default: ""
    },

    volume: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const Books_Model = mongoose.model("Books", BookSchema);
export default Books_Model;