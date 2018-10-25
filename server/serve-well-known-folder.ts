import * as Koa from 'koa'
import * as mount from 'koa-mount'
import * as serve from 'koa-static'
import {resolve} from 'path'

export default (app: Koa) => {
  app.use(mount('/.well-known', serve(resolve(__dirname, '../static/.well-known'))))

  return (ctx: Koa.Context, next: () => any) => next
}
