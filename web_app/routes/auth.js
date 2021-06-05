var express = require("express");
var router = express.Router();
const { check, body, validationResult } = require("express-validator");
const authController = require('../controllers/auth');

// model
const User = require('../models/user');

// http://localhost:3000/

router.get("/signin", authController.get_signin);
router.post("/signin",
    [
        check("email")
            .isEmail()
            .withMessage("Enter valid credential"),

        check("password")
            .isLength({ min: 5 })
            .withMessage("Enter valid credential")
    ],
    authController.post_signin
)

router.get("/signup", authController.get_signup);
router.post("/signup",
    [
        check("firstname")
            .isLength({ min: 3 })
            .withMessage("Name should be atleast 3 char"),

        check("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            "Email already exists."
                        );
                    }
                });
            }),

        check("password")
            .isLength({ min: 5 })
            .withMessage("Password should be at least 5 char"),

        check("country_code").isLength({ min: 1 })
            .withMessage("Enter valid conuntry code")
            .custom((value, { req }) => {
                if (value.toString().charAt(0) == '+') {
                    return Promise.reject("Please do not add '+'");
                }
                return true;
            }),

        body("phone", "Enter 10-digit phone no.").isLength({ min: 10 })
            .custom((value, { req }) => {
                return User.findOne({ 'contact.phone': `+${req.body.country_code}${value}` })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                "Mobile no. already exists."
                            );
                        }
                    })
            }),
    ],
    authController.post_signup
)

router.get('/logout', authController.getLogout);

module.exports = router;