const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const mimes = require('./util/mime')
// const static = require('koa-static')
const app = new Koa()
const port = 8888

// 解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return  mimes[ extName ]
}

// 返回静态资源
function returnStatic(ctx, path) {
  const u = ctx.header['user-agent'];
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  // 指定资源type
  let mime = parseMime( ctx.url )
  if ( mime ) {
    ctx.type = _mime
  }

  // 判断客户端类型 (默认请求的文件都存在，缺少404的判断)
  if(isAndroid || isiOS) {
    ctx.body = fs.readFileSync('./staticPhone/' + path, 'UTF-8' )
  } else {
    ctx.body = fs.readFileSync('./staticPc/' + path, 'UTF-8' )
  }
}

app.use(async (ctx) => {
  const path = ctx.originalUrl
  returnStatic(ctx, path)
})

app.listen(port, () => {
  console.log('服务在' + port + '端口启动')
})