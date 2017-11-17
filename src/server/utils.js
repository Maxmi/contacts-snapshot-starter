const renderError = (error, request, response) => {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`);
};

const navigateToHomePage = (request, response, user) => {
  request.session.userID = user.email;
  request.session.userRole = user.role;
  response.redirect('/');
};

module.exports = {
  renderError,
  navigateToHomePage,
};
