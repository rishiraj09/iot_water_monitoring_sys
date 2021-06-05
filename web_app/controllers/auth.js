const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");

const { v4: uuidv4 } = require('uuid');

// Models
const User = require('../models/user');


exports.get_signin = (req, res,) => {
    if (req.user) {
        return res.redirect('/');
    }
    console.log("Route- signin route");
    return res.render('./layout/auth/signin', {
        path: 'auth-signin',
        pageTitle: 'Sign In | Water Quality Management System',
        errorMessage: false,
        oldInput: {
            email: '',
            password: ''
        },
        validationErrors: []
    })
}

exports.post_signin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('./layout/auth/signin', {
            path: 'auth-signin',
            pageTitle: 'Sign In | Water Quality Management System',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).render('./layout/auth/signin', {
                    path: "auth-singin",
                    pageTitle: "Sign In | Water Quality Management System",
                    errorMessage: 'Invalid email or password',
                    oldInput: {
                        email: email,
                        password: password,
                    },
                    validationErrors: []
                });
            }

            bcrypt.compare(password, user.encrypted_password)
                .then(doMatch => {
                    if (doMatch) {

                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });

                    }
                    return res.status(422).render('./layout/auth/signin', {
                        path: "auth-singin",
                        pageTitle: "Sign In | Water Quality Management System",
                        errorMessage: 'Invalid email or password',
                        oldInput: {
                            email: email,
                            password: password,
                        },
                        validationErrors: []
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/auth/signin');
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}


exports.get_signup = (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }

    console.log("Route- signup route");
    return res.render('./layout/auth/signup', {
        path: 'auth-signup',
        pageTitle: 'Sign Up | Water Quality Management System',
        errorMessage: false,
        oldInput: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            country_code: '',
            phone: ''
        },
        validationErrors: []
    })
}

exports.post_signup = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    let country_code = req.body.country_code;
    const phone = req.body.phone;

    const fullname = `${firstname} ${lastname}`;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);

        return res.status(422).render('./layout/auth/signup', {
            path: 'auth-signup',
            pageTitle: 'Sign Up | Water Quality Management System',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                country_code: country_code,
                phone: phone
            },
            validationErrors: errors.array()
        })
    }

    if (country_code.toString().charAt(0) != "+") {
        country_code = `+${country_code}`;
    }

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                firstname: firstname,
                lastname: lastname,
                fullname: fullname,
                email: email,
                encrypted_password: hashedPassword,
                contact: {
                    countrycode: country_code,
                    number: phone,
                    phone: `${country_code}${phone}`
                },
            })
            user.save()
                .then(userDoc => {
                    console.log("User account created!");
                    console.log(userDoc);
                    return res.redirect("/auth/signin");
                })
                .catch(userErr => console.log(userErr))
        })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/auth/signin');
    });
};