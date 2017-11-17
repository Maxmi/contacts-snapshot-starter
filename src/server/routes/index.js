const router = require('express').Router();
const contactsRoutes = require('./contacts');
const contacts = require('../../models/contacts');

const userRoutes = require('./users');

const middlewares = require('../middlewares');

router.get('/', (request, response, next) => {
  contacts.findAll()
    .then((contacts) => {
      response.render('contacts/index', {
        contacts,
        currentUser: request.session.userID || ''
      });
    })
    .catch( error => next(error) );
});

router.get('/logout', (request, response, next) => {
  if (request.session) {
    request.session.destroy(err => {
      if(err) {
        return next(err);
      } else {
        return response.redirect('/');
      }
    });
  }
});

router.use('/contacts', contactsRoutes);
router.use('/users', userRoutes);

router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);
router.use(middlewares.notFoundHandler);

module.exports = router;
