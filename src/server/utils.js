const renderError = (error, request, response) => {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const navigateToHomePage = (request, response, user) => {
  request.session.userID = user.email;
  response.redirect('/');
}

const renderUnathorized = (response) => {
  response.send('Access forbidden')
}

module.exports = {
  renderError,
  navigateToHomePage,
  renderUnathorized
}
