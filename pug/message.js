const { User, Message } = require('./models.js')
const mongoose = require('mongoose');
/**
 * 留言模块操作
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 */

exports.saveMsg = async (ctx, next) => {
  var email = ctx.request.body.email
  var message = ctx.request.body.message
  console.log(email,message)
  if (!email || !message) return ctx.body = { status: 0, message: "错误" }
  var user = await User.findOne({
    email: email
  })
  if (user) {
    try {
      var save = await Message.create({ "msg": message, "name": user.name, "sup": 0 })
      ctx.body = {
        status: 1,
        data: save
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: null
      }
    }
  } else {
    ctx.body = {
      status: 0,
      message: "未找到账户"
    }
  }
}

// 分页显示messages
exports.showMsg = async (ctx, next) => {
  const Id = ctx.query.msgId
  if (!Id) return ctx.body = { status: 0, message: "错误" }
  if (+Id === 1) {
    try {
      var show = await Message.find({}).sort({ "_id": -1 }).limit(10)
      ctx.body = {
        status: 1,
        data: show
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: "查询失败"
      }
    }
  } else {
    const sId = mongoose.Types.ObjectId(Id)
    try {
      var show = await Message.find({ "_id": { "$lt": sId } }).sort({ "_id": -1 }).limit(10)
      ctx.body = {
        status: 1,
        data: show
      }
    } catch (e) {
      ctx.body = {
        status: 0,
        data: "查询失败"
      }
    }
  }
}

// 评论点赞接口
exports.upSup = async (ctx, next) => {
  const Id = ctx.request.body.msgId
  const upNum = ctx.request.body.upNum // 此次点赞次数
  if (!Id || !upNum) return ctx.request.body = { status: 0, message: "错误" }
  const sId = mongoose.Types.ObjectId(Id)
  try {
    var up = await Message.update({ "_id": sId },{ $inc: { sup: upNum } })   
    ctx.body = {
      status: 1,
      data: up
    }
  } catch (e) {
    ctx.body = {
      status: 0,
      data: "更新失败"
    }
  }
}

