require("dotenv").config();

// node core modules
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');



// Models
const User = require('./models/user');

const store = new MongoDBStore({
    uri: process.env.DATABASE,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 30
});

const app = express();

// keep the bodyparser here; reason: csrf token works with this arrangement
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Web routes
const home_route = require('./routes/home');
const auth_routes = require('./routes/auth');


// DB Connection
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("DB CONNECTED");
    });

app.use(express.static(path.join(__dirname, 'public'))); // setting public access folder

// Middlewares

app.use(cookieParser());
app.use(cors());

// define and initialize session
app.use(
    session({
        secret: 'mysecrettext',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});



// Web admin routes

app.use("/", home_route);
app.use("/auth", auth_routes);



// PORT
const port = process.env.PORT || 3000

// starting a server
app.listen(port, () => {
    console.log(`App is running at port ${port}`);
});