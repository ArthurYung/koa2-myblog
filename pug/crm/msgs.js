const { Message } = require('../models.js')
const mongoose = require('mongoose');


exports.showMessages = async (ctx, next) => {
  try {
    const pageInfo = ~~ctx.request.body.page
    const pageSize = ~~ctx.request.body.size || 10
    const search = ctx.request.body.doc || false
    const jump = pageInfo * pageSize
    let msgs;
    let count;
    if(search){
      const _match = new RegExp(search, "i")
      count = await Message.find().or([{ name: _match}, {msg: _match}]).count()
      msgs = await Message.find()
                        .or([{ name: _match}, {msg: _match}])
                        .sort({ "_id": -1 })
                        .skip(jump)
                        .limit(pageSize) // 模糊查询
    }else{
      count = await Message.estimatedDocumentCount()
      msgs = await Message.find({})
                        .sort({ "_id": -1 })
                        .skip(jump)
                        .limit(pageSize)
    }
    ctx.type = 'application/json'
    ctx.body = {
      status: 1,
      pageNum: count,
      msgs
    }
  } catch (e) {
    ctx.body = {
      status: 0,
      data: null
    }
  }
}
// 删除
exports.deleteMessage = async (ctx) => {
  try {
    const id = ctx.request.body.id || -1
    msg = await Message.remove({ _id: mongoose.Types.ObjectId(id) })
    if (msg) {
      ctx.body = {
        status: 1,
        msg
      }
    } else {
      ctx.body = {
        status: 2,
        mssage: 'not find'
      }
    }
    ctx.type = 'application/json'
  } catch (e) {
    ctx.body = {
      status: 0,
      data: null
    }
  }
}

// 修改 2018-9-28
exports.updateMessage = async (ctx) => {
  try {
    const id = ctx.request.body.key || -1
    const newMsg = ctx.request.body.msg // 2018-9-28
    const newSup = ctx.request.body.sup
    msg = await Message.update({ _id: mongoose.Types.ObjectId(id) }, { msg: newMsg, sup: newSup })
    if (msg) {
      ctx.body = {
        status: 1,
        mssage: msg
      }
    } else {
      ctx.body = {
        status: 2,
        mssage: 'not find'
      }
    }
    ctx.type = 'application/json'
  } catch (e) {
    ctx.body = {
      status: 0,
      data: null
    }
  }
}

// 查找用户模糊搜索
exports.searchMessage = async (ctx) => {
  try {
    const doc = ctx.request.body.doc || -1
    const _match = new RegExp(doc, "i")
    msgs = await Message.find().or([{ name: _match}, {msg: _match},{time: _match}]) // 模糊查询
    if (msgs) {
      ctx.body = {
        status: 1,
        data: msgs
      }
    } else {
      ctx.body = {
        status: 2,
        msg: 'not find'
      }
    }
    ctx.type = 'application/json'
  } catch (e) {
    ctx.body = {
      status: 0,
      data: null
    }
  }
}