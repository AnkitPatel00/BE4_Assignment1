const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number },
  genre: [{ type: String }],
  langauge: { type: String },
  country: { type: String },
  rating: { type: Number },
  summary: { type: String },
  coverImageUrl:{type:String}
},{timestamps:true})

const BookModel = mongoose.model('books', bookSchema)

module.exports = BookModel