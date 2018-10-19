import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const handle = nextApp.getRequestHandler()

const serve = () => async (ctx: Koa.Context) => {
  await handle(ctx.req, ctx.res)
  ctx.respond = false
}

const main = async () => {
  await nextApp.prepare()

  const app = new Koa()

  app
  .use(logger('dev'))
  .use(bodyParser())
  .use(serve())

  app.listen(port)
}

main()
