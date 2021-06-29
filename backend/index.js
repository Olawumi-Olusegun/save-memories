const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const bodyParser = require('body-parser')
const DB_Connection = require('./helpers/DB_Connection');


const userRoutes = require('./routes/userRoutes');
const memoriesRoutes = require('./routes/memoriesRoutes');
DB_Connection();

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', userRoutes)
app.use('/', memoriesRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));