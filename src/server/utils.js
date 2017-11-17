const renderError = (error, request, response) => {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`);
};

/**
 * redirects to home page
 * @param  {[type]} request  [req object]
 * @param  {[type]} response [res object]
 * @param  {[type]} user     [current user]
 * @return {[type]}          [home page]
 */
const navigateToHomePage = (request, response, user) => {
  request.session.userID = user.email;
  request.session.userRole = user.role;
  response.redirect('/');
};

module.exports = {
  renderError,
  navigateToHomePage,
};
