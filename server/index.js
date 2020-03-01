const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')
const PORT = process.env.PORT || '8000' //if heroku dyno hasn't configured a port default to 8000
const {db, User} = require('./db/models');

//set up express session and passport
const session = require('express-session')
const passport = require('passport')
//configure and create database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({db});

//if in test mode, stop listening to db for new sessions after tests are complete
if (process.env.NODE_ENV === 'test'){
  after('closing the session store', () => sessionStore.stopExpiringSession())
}
//if in dev mode, require secrets
if (process.env.NODE_ENV === 'development'){
  require('../secrets.js')
}

//passport registration
passport.serializeUser((user,done) => done(null, user.id))

passport.deserializeUser(async(id, done) => {
  try{
    const user = await User.findById(id);
    done(null, user);
  } catch(err){
    done(err);
  }
})

const createApp = () => {
  //logging middleware
  app.use(morgan('dev'));
  //static file serving middleware
  app.use(express.static(path.join(__dirname, '..', './public')));
  //body-parsing middleware
  app.use(express.json);
  app.use(express.urlencoded({extended: true}));
  //session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'insecure secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize());
  app.use(passport.session())

  //api & auth routes
  app.use('/api', require('./api'));
  app.use('/auth', require('./auth'));

  //if route does not match, redirect to index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', './public/index.html'))
  })

  //error-handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`listening on port: ${PORT}`)
  })
}
const syncDb = () => db.sync({force: true})

async function bootApp(){
  await sessionStore.sync(); // sync so that our session table gets created
  await syncDb();
  createApp();
  startListening();
}

if (require.main === module){
  bootApp();
} else {
  createApp();
}
module.exports = app;

