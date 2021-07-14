const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express()
const port = 3000

// require("dotenv").config()

// Require route
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const router = require('./routes/index');

// set templating engine
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', './layouts/theme.ejs');


// Static files
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))



//route
app.use('/', router)

app.use('/', productRouter);

app.use('/users', userRouter);




// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useUnifiedTopology: true, useNewUrlParser: true , useCreateIndex: true, useFindAndModify: false}, 
  () => console.log('Connected to DB')
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

