const renderError = (error, request, response) => {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`)
}

const navigateToHomePage = (request, response, user) => {
  console.log(user);
  request.session.userID = user.email;
  request.session.userRole = user.role;
  console.log('userRole is here', user.role);
  response.redirect('/');
}


// const renderUnathorized = (response) => {
//   response.send('Access forbidden')
// }

module.exports = {
  renderError,
  navigateToHomePage,
  // renderUnathorized
}
