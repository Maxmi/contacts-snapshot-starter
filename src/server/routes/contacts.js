const contacts = require('../../models/contacts');

const router = require('express').Router();
const {hasPermission} = require('../../models/authorization/roles');
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
  response.render('contacts/new')
});


//available to admin only
router.post('/', (request, response, next) => {
  const user = request.user;
  // if(userHasAccess(user.role, 'create')) {
    contacts.create(request.body)
      .then(function(contact) {
        if (contact) return response.redirect(`/contacts/${contact[0].id}`)
        next()
      })
      .catch( error => renderError(error, request, response))
  // } else {
    // response.status(401).render('common/unauthorized');
  // }
})

//available to admin only
router.delete('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  contacts.destroy(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch( error => next(error) )
})



module.exports = router
