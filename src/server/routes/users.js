const users = require('../../models/users');

const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');


router.get('/signup', (request, response, next) => {
  response.render('contacts/signup', {
    title: 'Sign Up',
    error: '',
    email: request.session.userID
  })
});

router.post('/signup', (request, response, next) => {
  const {email, password} = req.body;

  if(!(email || password)) {
    response.render('contacts/signup', {
      title: 'Sign Up',
      error: 'Provide both email and password to sign up'
    });
  } else {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      //need to create function that adds user to db
      addUser(email, hash)
        .then(user => {
          request.session.userID = user.email;
          response.redirect('/'); //where exactly?
        })
        .catch(err => {
          response.render('contacts/signup', {
            title: 'Sign Up',
            error: 'Could not add user to database'
          })
        })
    })
  }
})


router.get('/login', (request, response, next) => {
  response.render('contacts/login', {
    title: 'Login',
    error: '',
    email: request.session.userID
  });
});


router.post('/login', (request, response, next) => {
  const {email, password} = request.body;
  if(!(email || password)) {
    response.render('contacts/login', {
      title: 'Login',
      error: 'Provide both email and password to login'
    })
  } else {
    //add db function
    getUser(email, password)
      .then(user => {
        bcrypt.compare(password, user.password)
          .then(result => {
            if(result) {
              request.session.userID = user.email,
              response.redirect('/'); //where do we need to redirect?
            } else {
              response.render('contacts/login', {
                title: 'Login',
                error: 'Wrong email or password. Please try again'
              })
            }
          })
          .catch(err => {
            response.render('contacts/login', {
              title: 'Login',
              error: 'Could not retrieve this user from db'
            })
          })
      })
  }
});
