const { Login } = require('../models.js')
const {tokenData,createToken} = require('./token')
exports.LoginIn =  async (ctx, next) => {
var name = ctx.request.body.name
 var psw = ctx.request.body.psw
 if(!psw || !name) return ctx.body={status:0,message:"错误"}
  try{
    var user = await Login.findOne({"name":name,"psw":psw})
    if(user){
      const token = createToken(tokenData,10)
      ctx.body = {
        status: 1,
        token
      } 
    }else{
      ctx.body = {
        status:2,
        data:'密码错误'
      }
    }

  }catch(e){
    ctx.body = {
      status:0,
      data:null
    }      
  }
}