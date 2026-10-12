import mongoose from 'mongoose'

const ReportSchema = mongoose.Schema({
  totalCollection: {type: Number, default: 0},
  fromNationalLibrary: {
      books: {type: Number, default: 0},
      non_books: {type: Number, default: 0}
  },
  fromDonations: {
      books: {type: Number, default: 0},
      non_books: {type: Number, default: 0}
  },
  purchased: {
      books: {type: Number, default: 0},
      magazines: {type: Number, default: 0},
      newspaper: {type: Number, default: 0},
      clippings: {type: Number, default: 0},
      electronics: {type: Number, default: 0},
      government_publication: {type: Number, default: 0},
      maps: {type: Number, default: 0},
  }, 
  NumberOfDays: {type: Number, default: 0},
  NumberOfReader: {type: Number, default: 0},
  reader_boys: {
    children: {type: Number, default: 0},
    adult: {type: Number, default: 0},
  },
  reader_girls: {
    children: {type: Number, default: 0},
    adult: {type: Number, default: 0},
  },
  NumberOfComputerUser: {type: Number, default: 0},
  computer_boys: {
    children: {type: Number, default: 0},
    adult: {type: Number, default: 0},
  },
  computer_girls: {
    children: {type: Number, default: 0},
    adult: {type: Number, default: 0},
  },
  consultedBooks: {type: Number, default: 0},
  circulatedBooks: {type: Number, default: 0},
  consultedSerials: {type: Number, default: 0},
  circulatedSerials: {type: Number, default: 0},
  consultedClippings: {type: Number, default: 0},
  circulatedClippings: {type: Number, default: 0},
  consultedThesis: {type: Number, default: 0},
  circulatedThesis: {type: Number, default: 0},

 librarian_name: {type: String, default: ""} 
})

const ReportModel = mongoose.model('ReportModel', ReportSchema)
export default ReportModel