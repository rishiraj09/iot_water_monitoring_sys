var express = require("express");
var router = express.Router();

const homecontroller = require('../controllers/home');

// http://localhost:3000

const isSignedIn = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        return res.redirect('/auth/signin');
    }
}
router.get('/', isSignedIn, homecontroller.getHome);

module.exports = router;