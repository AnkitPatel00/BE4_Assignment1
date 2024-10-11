const mongoose = require('mongoose')
require('dotenv').config()

const mongoURI = process.env.mongoDB_URI

const initializeDatabase =async () =>
{
  try {
    const connected = await mongoose.connect(mongoURI)
    if (connected)
    {
      console.log('Connected Successfully!')
    }
  }
  catch (error)
  {
    console.log('Connection failed',error)
  }
}

module.exports = initializeDatabase