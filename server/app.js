const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: "./config.env" });
require('./db/conn');

app.use(express.json());
//make router file
app.use(require('./router/auth'));

//const User= require('./models/userSchema');

//const DB="mongodb+srv://sa:QKRSsh8GS9iXqwwy@mernstack.c33sefp.mongodb.net/test";
const LDB = "mongodb://localhost:27017/players";

const PORT = process.env.PORT;

//const DB="mongodb+srv://sa:QKRSsh8GS9iXqwwy@mernstack.c33sefp.mongodb.net/mernDB?retryWrites=true&w=majority";


//middleware

// const middleware = (req, res, next) => {
//     console.log('hi middleware');
//     next();
// }

//middleware();


// app.get('/', (req, res) => {
//     res.send('hello world');
// });

// app.get('/about', middleware, (req, res) => {
//     res.send('hello about');
// });

// app.get('/contactus', (req, res) => {
//     res.send('hello contactus');
// });

// app.get('/signin', (req, res) => {
//     res.send('hello signin');
// });

// app.get('/signup', (req, res) => {
//     res.send('hello signup');
// });


app.listen(PORT, () => {
    console.log("server is running on pot no ${PORT}");
});