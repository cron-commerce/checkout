import 'isomorphic-unfetch'

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as session from 'koa-session'
import * as next from 'next'

import initSession from './init-session'

const port = parseInt(process.env.PORT, 10)
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
  app.keys = [process.env.SESSION_SECRET]

  app
  .use(logger('dev'))
  .use(session(app))
  .use(bodyParser())
  .use(initSession())
  .use(serve())

  app.listen(port)
}

main()
