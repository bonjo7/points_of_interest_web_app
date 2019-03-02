'use strict';

const User = require('../models/user');

const Joi = require('joi');

const Accounts = {

    /*
    Function to display the main page
     */
    index: {
        auth: false,
        handler: function(request, h) {
            return h.view('main', { title: 'Welcome to Donations' });
        }
    },

    /*
    Function to display the sign up page
     */
    showSignup: {
        auth: false,
        handler: function(request, h) {
            return h.view('signup', { title: 'Sign up for Discovery Waterford' });
        }
    },

    /*
    FUnction which allows a new user to sign up
    This will provide validation to ensure a user enters the required fields
    While also ensuring that the user enters the correct input
     */
    signup: {
        auth: false,

        //Validate user input
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },

            //If validation fails display signup page
            failAction: function(request, h, error) {
                return h
                    .view('signup', {
                        title: 'Sign up error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },

        /*
        Create a new user object
        and send the information to the user database
        wrapped in a try block to ensure any errors are handled
         */
        handler: async function(request, h) {
            try {
                const payload = request.payload;
                let user = await User.findByEmail(payload.email);

                //If the user already exists by email inform the user that this email already exists
                if (user) {
                    const message = 'Email address is already registered';
                    throw new Boom(message);
                }
                const newUser = new User({
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    password: payload.password
                });

                user = await newUser.save();

                request.cookieAuth.set({ id: user.id });

                return h.redirect('/home');
            } catch (err) {
                return h.view('signup', { errors: [{ message: err.message }] });
            }
        }
    },

    /*
    FUnction to show login page
     */
    showLogin: {
        auth: false,
        handler: function(request, h) {
            return h.view('login', { title: 'Login to Discover Waterford' });
        }
    },

    /*
    Login function to allow the user to login
    Provide validation to ensure required fields are entered
     */
    login: {
        auth: false,
        validate: {
            payload: {
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('login', {
                        title: 'Login Error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        /*
        If the user does not exist inform them
        If they do exist compare the password to ensure its right
         */
        handler: async function(request, h) {
            const { email, password } = request.payload;
            try {
                let user = await User.findByEmail(email);
                if (!user) {
                    const message = 'Email address is not registered';
                    throw new Boom(message);
                }

                user.comparePassword(password);
                request.cookieAuth.set({ id: user.id });

                return h.redirect('/home');

            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    /*
    Allow the user to log out by claering the cookie authenication
     */
    logout: {
        handler: function(request, h) {
            request.cookieAuth.clear();
            return h.redirect('/');
        }
    },

    /*
    FUnction to display the settings page for the user
     */
    showSettings: {
        handler: async function(request, h) {
            try {
                //find the logged user by their id
                const id = request.auth.credentials.id;
                const user = await User.findById(id);

                return h.view('settings', { title: 'User Settings', user: user });
            } catch (err) {
                return h.view('login', { errors: [{ message: err.message }] });
            }
        }
    },

    /*
    Update user settings, providing validation
     */
    updateSettings: {
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string()
                    .email()
                    .required(),
                password: Joi.string().required()
            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('settings', {
                        title: 'Sign up error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },

        //edit the deatils of the user and save the new details
        handler: async function(request, h) {
            try {
                const userEdit = request.payload;
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                user.firstName = userEdit.firstName;
                user.lastName = userEdit.lastName;
                user.email = userEdit.email;
                user.password = userEdit.password;

                await user.save();

                return h.redirect('results');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    },

    /*
    Delete user function, allows the user to delete their account
    This function will call the deleteUserById method in the user.js script
     */
    deleteUser: {

        handler: async function(request, h){

            await User.deleteUserById(request.auth.credentials.id);

            //Once the user account has been deleted redirect to the index page
            return h.redirect('/');

        }

    },


};

module.exports = Accounts;