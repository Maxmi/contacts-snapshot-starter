const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const methodOverride = require('method-override')
const routes = require('./server/routes');
const middlewares = require('./server/middlewares');
const session = require('express-session');
const pgStore = require('connect-pg-simple')(session);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

//initialize express-session to allow tracking of logged in users across sessions and keep sessions in db
app.use(session({
  store: new pgStore({
    conString: process.env.DATABASE_URL || 'postgres://localhost:5432/contacts_development'
  }),
  secret: 'mysessionsecret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  },
  secure: true
}));

//making userID available in templates
app.use((request, response, next) => {
  response.locals.currentUser = request.session.userID;
  next();
});

//making user available in routes (hiding that we are using express-sessions)
// app.use((request, response, next) => {
//   request.user = request.session.user;
//   next();
// });


app.use(methodOverride('_method'))

app.use(middlewares.setDefaultResponseLocals)


// app.use(middlewares.sessionChecker)

// app.use(middlewares.deleteCookieForStaleSession)



app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
