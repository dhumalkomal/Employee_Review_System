// express
const express = require('express');
// creatin app
const app = express();
// port
const PORT= 8000;
// connect to database
require('./config/mongoose').connect();

// passport local strategy
const passportConfig = require('./config/passport_local');
// passport
const passport = require('passport');
// for parsing the data in cookie
const cookieParser = require('cookie-parser')
// store the session create by passport
const session=require('express-session');
// importing layouts 
const expressLayouts =  require('express-ejs-layouts');
// flash messages package and middleware
const flash = require('connect-flash');
const myMware=require('./config/middleware');
// store the session in mongostore
const MongoStore = require('connect-mongo');

// middlewares

// for reading json data
app.use(express.json());
// for reading url data
app.use(express.urlencoded({
    extended:true
})); 

// for static files folder
app.use(express.static('assets'));

// for parsing the cookies
app.use(cookieParser());

// using layouts
app.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// setting view engine as ejs and defining its path
app.set('view engine','ejs');
app.set('views','./views');

// Use express-session for session management
app.use(session({
    secret: 'something', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (1 day in this example)
      secure: false, // Set this to false to allow the session over HTTP
    },
    // store the session in database
    store: MongoStore.create({
      mongoUrl:'mongodb://127.0.0.1:27017/ERS_db'
    })
  }));
  
// connect-flash middleware
app.use(flash());
app.use(myMware.setFlash);

// initialize passport
app.use(passport.initialize());
// passport sessions
app.use(passport.session());

// store the logged in user's data in locals variable
app.use(passport.setAuthenticatedUser);

// routes
app.use('/',require('./routes'));

// fire up server
app.listen(PORT,() => console.log(`Server is running on port: ${PORT}`));