const contacts = require('../../models/contacts');

const router = require('express').Router();
const { hasPermission } = require('../../models/authorization/roles');
const {renderError, renderUnathorized} = require('../utils');

//search action is available for all users
router.get('/search', (request, response, next) => {
  const query = request.query.q
  contacts.search(query)
    .then(function(contacts) {
      if (contacts) return response.render('contacts/index', { query, contacts })
      next()
    })
    .catch( error => next(error) )
})

//viewing a contact is available for all users
router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  contacts.findById(contactId)
    .then(function(contact) {
      if (contact) return response.render('contacts/show', { contact })
      next()
    })
    .catch( error => next(error) )
})


//available to admin only
router.get('/new', (request, response) => {
  const userRole = request.session.userRole;
  // console.log('userRole', userRole);

  if(hasPermission(userRole, 'new')) {
    response.render('contacts/new');
  } else {
    response.status(403).render('common/unauthorized');
  }
});


//available to admin only
router.post('/', (request, response, next) => {
  // const user = request.user;
  const userRole = request.session.userRole;
  if(hasPermission(userRole, 'createContact')) {
    contacts.create(request.body)
      .then(function(contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`)
        next()
      })
      .catch( error => renderError(error, request, response))
  } else {
    response.status(403).render('common/unauthorized');
  }
})

//available to admin only
router.delete('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId;
  const userRole = request.session.userRole;
  if(hasPermission(userRole, 'deleteContact')) {
    contacts.destroy(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/')
        next()
      })
      .catch( error => next(error))
  } else {
    response.status(403).render('common/unauthorized');
  }
})



module.exports = router
