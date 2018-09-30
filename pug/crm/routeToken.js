const {verifyToken} = require('./token')

// 拦截路由器 验证token
// 一定要 async await 
exports.routeToken = async(ctx,next) => {
  const token = ctx.request.header["VanocToken"] || ctx.request.header["vanoctoken"]
  if(!token){
    ctx.body = {
      status:2,
      err:'签名实效'
    }
  }else if(!verifyToken(token)){
    ctx.body = {
      status:2,
      err:'签名实效'
    }
  }else{
   await next()
  }
}