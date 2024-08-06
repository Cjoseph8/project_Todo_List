require('dotenv').config();
const mongoose = require('mongoose');
const URL = process.env.DataBase
mongoose.connect(URL)
.then(() => {
    console.log('Database connected successfully');
})
.catch((err) => {
    console.log('Database failed to connect: ', err.message);
})