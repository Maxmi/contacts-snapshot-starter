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

//initialize express-session to allow tracking of logged in users across sessions
app.use(session({
  store: new pgStore({
    conString: process.env.DATABASE_URL || 'postgres://localhost:5432/contacts_development'
  }),
  secret: 'mysessionsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  },
  secure: true
}));

app.use(methodOverride('_method'))

app.use(middlewares.setDefaultResponseLocals)

app.use('/', routes)

app.use((request, response) => {
  response.render('common/not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
