const initializeDatabase = require('./db/db.connect')
const BookModel = require('./model/books.model')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
app = express()
app.use(express.json())
app.use(cors({origin:"*"}))


initializeDatabase()

//welcome server message

app.get('/', (req,res) => {
  res.send('Welcome to book server')
})

//1.add new book function

const addNewBook = async(newbookData) =>
{
  try {
    const newBook = new BookModel(newbookData)
  if (newBook)
  {
    const savedBook = await newBook.save()
    return savedBook
  }
  }
  catch (error)
  {
    console.log('error in adding book.')
  }
  
}

//1.handle add new book request function

app.post('/books',async (req,res) => {
  
  try {
    const newBook = await addNewBook(req.body)
    if (newBook)
    {
      res.status(201).json({message:'new Book added successfully:',newBook})
    }
  }
  catch(error) {
    res.status(500).json({error:'Failed to add Book'})
  }

})

//3.get all books funtion

const getAllBooks = async() => {
  try {
    const books = await BookModel.find()
    return books
  }
  catch (error)
  {
    console.log('error while get the books:',error)
  }
}

//3.handle request get book function

app.get('/books',async (req,res) => {
  try {
    const books = await getAllBooks()
    res.json(books)
  }
  catch (error)
  {
res.status(500).json({error:'failed to get all books',error})
  }
})

//4.function to get book by Title

const bookByTitle =async (title) => {
  try {
    const book = await BookModel.findOne({title})
    return book
  }
  catch (error)
  {
    console.log('error while get book by title',error)
  }
}
//4.handle http request function for get book by Title

app.get('/books/:bookTitle',async (req,res) => {
  try {
    const book = await bookByTitle(req.params.bookTitle)
    res.json(book)
  }
  catch(error)
  {
res.status(500).json({error:'Failed to get book by title',error})
  }
})


//5. function for get book details by author

const getBooksByAuthor =async (author) => {
  try {
    const books = BookModel.find({ author })
    return books
  }
  catch (error)
  {
    console.log('error while get books by author',error)
  }
}

//5. handle request for get book details by author

app.get('/books/author/:authorName',async (req,res) => {
  try {
    const books = await getBooksByAuthor(req.params.authorName)
    res.json(books)
  }
  catch (error)
  {
res.status(500).json({error:'Failed to get books by Author',error})
  }
})

//6. get books by genre function

const getBooksByGenre =async (genre) => {
  try {
    const books = await BookModel.find({ genre })
    return books
  }
  catch (error)
  {
    console.log('error while get books by genre')
  }
}

//6. handle request for books by genre

app.get('/books/genre/:genreName',async (req,res) => {
  try {
    const books = await getBooksByGenre(req.params.genreName)
    res.json(books)
  } 
  catch (error)
  {
    res.status(500).json({error:"failed to get books by genre",error})
  }
})

//7.get books by year function

const getBooksByYear =async (publishedYear) => {
  try {
    const books =await BookModel.find({ publishedYear })
    return books
  } 
  catch (error)
  {
console.log('error in get books by year',error)
  }
}

//7.handle request for books by year function

app.get('/books/year/:yearInput', async (req, res) => {
  try {
    const books = await getBooksByYear(req.params.yearInput)
    res.json(books)
  }
  catch (error)
  {
    res.status(500).json({error:'failed to get books by Year',error})
  }
})

//8.update books by Id

const updateBooksById = async (bookId,BookDataToUpdate) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, BookDataToUpdate, { new: true })
    return updatedBook
  }
  catch (error)
  {
    console.log('error in updating books by Id',error)
  }
}

//8. handle request for update books by Id

app.post('/books/:bookId',async (req,res) => {
  try {
    const updatedBook = await updateBooksById(req.params.bookId, req.body)
    if (updatedBook)
    {
res.status(200).json({message:"Book updated successfully:",updatedBook})
    }
    else
    {
      res.status(404).json({ error: "Book Not Found" })
      }
  }
  catch (error)
  {
    res.status(500).json({error:"failed to update books by Id",error})
  }
})

//9.update book by name

const updateBookByName =async (title,updatedBookData) => {
  try {
    const updatedBook =await BookModel.findOneAndUpdate({ title }, updatedBookData, { new: true })
    return updatedBook
  }
  catch (error)
  {
console.log('Error in update book by name',error)
  }
}

//9.handle request for update book by name

app.post('/books/updateByName/:bookName', async (req,res) => {
  try {
    const bookName = req.params.bookName
    const updatedBookData = req.body
    const updatedBook = await updateBookByName(bookName,updatedBookData)
    if (updatedBook)
    {
res.status(200).json({message:'Book updated successfully',updatedBook})
    }
    else {
      res.status(404).json({error:'Book not found'})
    }
  }
  catch (error)
  {
res.status(500).json({error:"failed to update book by name",error})
  }
})

//10. delete book by id

const deleteBookById = async (bookId) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(bookId)
    return deletedBook
  }
  catch (error)
  {
    console.log('error in deleting book by id')
  }
}

//10.handle request for delete book by id

app.delete('/books/:bookId',async (req,res) => {
  try {
    const deletedBook = await deleteBookById(req.params.bookId)
    if (deletedBook)
    {
res.status(200).json({message:"Book deleted successfully!",deletedBook})
    }
    else
    {
      res.status(404).json({error:'book not found'})
      }
  }
  catch (error)
  {
    res.status(500).json({error:'failed to delete book by id',error})
  }
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
})

