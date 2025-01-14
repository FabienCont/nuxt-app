const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

const fetchUser = (() => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  const user = { id: 1, username: 'demo', password: 'demo' }
  return async function () {
    return user
  }
})()

passport.serializeUser(function (user, done) {
  var userId= user.id;
  var userName =user.username;
  var serializedUser={'username':userName};
  done(null, serializedUser)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await fetchUser()
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(new LocalStrategy(function (username, password, done) {
  fetchUser()
    .then((user) => {
      if (username === user.username && password === user.password) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))
