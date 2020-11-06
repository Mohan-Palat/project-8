
// DEPENDENCIES

// Needed for environment variables
require('dotenv').config()    // This needs to be at the very top
const express = require('express');
// Needed for sessions
const session = require('express-session')
// Needed for EJS Layouts
const expressLayouts = require('express-ejs-layouts');
// Override needed for put and delete requests
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
// Environment variable assignments
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODBURI;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// open the connection to mongo
db.on('open' , ()=>{});


// MIDDLEWARE

// Path for CSS, images, or any other items
app.use(express.static('public'));
// Needed for EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Define path and params for sessions information
app.use(
  session({
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false 
  })
)
// Body parser - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
// Define path for user routes and link to control file
app.use('/users', require('./controllers/usersController'));
// Define path for box routes and link to control file
app.use('/users', require('./controllers/boxesController'));
// Needed for sessions and must come after the body parser
app.use('/sessions', require('./controllers/sessionsController.js'));

// Seed Category collection
app.use('/seed', require('./seedCategory.js'));
// Seed Users and Boxes collection
app.use('/seed2', require('./seedUserAndBoxes.js'));


// Take user to the main page
app.get('/', (req, res) => {
    res.redirect('/sessions/new');
});


app.listen(PORT, () => console.log( 'Listening on port:', PORT));