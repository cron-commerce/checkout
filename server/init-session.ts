import * as Koa from 'koa'

export default () => async (ctx: Koa.Context, next: () => any) => {
  if (ctx.method === 'POST') {
    ctx.session = ctx.request.body as any
    ctx.redirect('/')
  } else {
    await next()
  }
}
