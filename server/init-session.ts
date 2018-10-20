import * as Koa from 'koa'

export default () => async (ctx: Koa.Context, next: () => any) => {
  if (ctx.method === 'POST') {
    // for POST requests, we save the POST body to the session for later use
    ctx.session = ctx.request.body as any
    ctx.redirect('/')
  } else {
    // for other requests, we set the session to the req object so next.js can access it
    (ctx.req as any).session = ctx.session
    await next()
  }
}
