const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.MONGODB_URL;

const DB_Connection = async () => {
      try {
            await mongoose.connect(DB_URL, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                  useFindAndModify: true,
                  useCreateIndex: true
            });

            console.log("Connected to database");
            
      } catch (error) {
            console.log("Unable to connect to database")
      }
}

module.exports = DB_Connection;