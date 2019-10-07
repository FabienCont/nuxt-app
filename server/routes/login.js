const Router =require('koa-router')
const passport = require('koa-passport')
const router = new Router()

router.post('/login', async (ctx, next) => {
	return passport.authenticate('local', async (err, user, info, status) => {
		if (!user) {
			ctx.throw(401, info)
		}
		await ctx.login(user)
		console.log("user:",user)
		ctx.body = {'username':user.username};
	})(ctx)
})

module.exports= router
