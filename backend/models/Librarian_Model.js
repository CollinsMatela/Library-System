import mongoose from 'mongoose'

const LibrarianSchema = new mongoose.Schema({
      lastname: {type:String, default:""},
      firstname: {type:String, default:""},
      middlename: {type:String, default:""},
      role: {type: String, default:""},

      email: {type: String, default:""},
      password: {type: String, default:""},
})

const LibrarianModel = mongoose.model('Librarian', LibrarianSchema);
export default LibrarianModel;