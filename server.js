//___________________
//Dependencies
//___________________
// Needed for environment variables
require('dotenv').config()    // This needs to be at the very top
const express = require('express');
// Needed for sessions
const session = require('express-session')
// Needed for EJS Layouts
const expressLayouts = require('express-ejs-layouts');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODBURI;

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
// const PORT = process.env.PORT || 3000;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'paul-project2';
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
//___________________
//Middleware
//___________________
// Use public folder for static assets
app.use(express.static('public'));
// Needed for EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Define path and params for sessions information
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
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




//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

// This is not in the controller files because it is considered a separate page.
// Take user to the main page
app.get('/', (req, res) => {
    // res.render('sessions/new.ejs');
    res.redirect('/users');
});


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));