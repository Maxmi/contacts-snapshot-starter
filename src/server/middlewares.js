const errorHandler = (error, request, response, next) => {
  response.status(500).send('Something bad happened. This page should be nicer looking');
};

const logErrors = (error, request, response, next) => {
  console.error(error.stack)
  next(error);
};

const notFoundHandler = (request, response) => {
  response.status(404).render('common/not_found')
}

const setDefaultResponseLocals = (request, response, next) => {
  response.locals.query = ''
  next()
}

//added new
const sessionChecker = (request, response, next) => {
  if(!(request.session.user && request.cookie.userID)) {
    response.redirect('/');
  } else {
    next();
  }
};

//added new
const deleteCookieForStaleSession = (request, response, next) => {
  if(request.cookies && request.cookies.userID && !request.session.user) {
    response.clearCookie('userID');
  } else {
    next();
  }
};

module.exports = {
  errorHandler,
  logErrors,
  notFoundHandler,
  setDefaultResponseLocals
 };
