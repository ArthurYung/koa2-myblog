const {User, Mysup} = require('./models.js')

/**
 * 更新用户信息操作
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getUser = async (ctx, next) => {
 var email = ctx.query.email
 var user = await User.findOne({
	  email: email
	})
  ctx.body={
    status: user ? 1 : 0,
    data:user
  }
}
exports.saveUser = async (ctx, next) => {
 var email = ctx.request.body.email
 var name = ctx.request.body.name
 if(!email || !name) return ctx.body={status:0,message:"错误"}
 var user = await User.findOne({
	  email: email
	})
  if(user){
    ctx.body = {
      status:0,
      message:"账户已存在"
    }
  }else{
    try{
      var save = await User.create({"email":email,"name":name})
      ctx.body = {
        status:1,
        data:save
      }
    }catch(e){
      ctx.body = {
        status:0,
        data:null
      }      
    }
  }
}

exports.upSup = async (ctx, next) => {
 const token = "Arthur"
 var user = await Mysup.findOne({
	  token: token
	})
  if(user){
    try{
      var up = await Mysup.update({ "token": token },{ $inc: { supNum: 1 } })
      ctx.body = {
        status:1,
        data:user.supNum + 1,
        response: up
      }
    }catch(e){
      ctx.body = {
        status: 0,
        data: null
      }
    }
  }else{
      ctx.body = {
      status: 0,
      data: null
    }   
  }
}


exports.showSup = async (ctx, next) => {
 const token = "Arthur"
 var user = await Mysup.findOne({
	  token: token
	})
  ctx.body = {
    status: user ? 1 : 0,
    data:user
  }   
}

