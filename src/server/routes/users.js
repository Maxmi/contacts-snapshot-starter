const { addUser, getUser } = require('../../models/db/users');

const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { navigateToHomePage } = require('../utils');

/**
 * GET and POST requests to signup page
 * @type {String}
 */
router.route('/signup')
  .get((request, response) => {
    response.render('users/signup', {
      title: 'Sign Up',
      error: '',
      currentUser: request.session.userID
    });
  })
  .post((request, response) => {
    const {email, password} = request.body;

    if(!email || !password) {
      response.render('users/signup', {
        currentUser: '',
        title: 'Sign Up',
        error: 'Provide both email and password to sign up'
      });
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        addUser(email, hash)
          .then(user => {
            navigateToHomePage(request, response, user);
          })
          .catch(err => {
            response.render('users/signup', {
              currentUser: '',
              title: 'Sign Up',
              error: 'Could not add user to database'
            });
          });
      });
    }
  });

/**
 * GET and POST requests to login page 
 * @type {String}
 */
router.route('/login')
  .get((request, response) => {
    response.render('users/login', {
      title: 'Login',
      error: '',
      currentUser: request.session.userID
    });
  })
  .post((request, response) => {
    const {email, password} = request.body;
    if(!(email || password)) {
      response.render('users/login', {
        currentUser: '',
        title: 'Login',
        error: 'Provide both email and password to login'
      });
    } else {
      getUser(email, password)
        .then((user) => {
          bcrypt.compare(password, user.password)
            .then((result) => {
              if(result) {
                navigateToHomePage(request, response, user);
              } else {
                response.render('users/login', {
                  currentUser: '',
                  title: 'Login',
                  error: 'Wrong email or password. Please try again'
                });
              }
            })
            .catch(err => {
              response.render('users/login', {
                currentUser: '',
                title: 'Login',
                error: 'Could not retrieve this user from db'
              });
            });
        });
    }
  });



module.exports = router;
