const Router =require('koa-router')
const passport = require('koa-passport')
const router = new Router()

router.post('/logout', (ctx, next) => {
  if (ctx.isAuthenticated()) {
     ctx.logout();
     ctx.redirect('/');
   } else {
     ctx.body = { success: false };
     ctx.throw(401);
   }
})

module.exports= router
