const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('koa-passport')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const Router = require('koa-router')
const loginRoute = require('./routes/login.js')
const logoutRoute = require('./routes/logout.js')

const app = new Koa()
const router = new Router()

app.keys = ['super-secret-key']
app.use(session(app))
app.use(bodyParser())

require('./auth')
app.use(passport.initialize())
app.use(passport.session())

app.use(loginRoute.routes());
app.use(loginRoute.allowedMethods()) // here I handle API call to login, see below.

app.use(logoutRoute.routes());
app.use(logoutRoute.allowedMethods()) // here I handle API call to login, see below.

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    ctx.req.session = ctx.session // for nuxtServerInit
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
