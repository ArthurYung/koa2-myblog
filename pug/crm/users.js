const { User } = require('../models.js')
const mongoose = require('mongoose');


exports.showUsers = async (ctx, next) => {
  try {
    const pageInfo = ~~ctx.request.body.page
    const pageSize = ~~ctx.request.body.size || 10
    const search = ctx.request.body.doc || false
    const jump = pageInfo * pageSize
    let users;
    if(search){
      const _match = new RegExp(search, "i")
      users = await User.find()
                        .or([{ name: _match}, {email: _match}])
                        .sort({ "_id": 1 })
                        .skip(jump)
                        .limit(pageSize) // 模糊查询
    }else{
      users = await User.find({})
                        .sort({ "_id": 1 })
                        .skip(jump)
                        .limit(pageSize)
    }
    ctx.type = 'application/json'
    ctx.body = {
      status: 1,
      pageNum: users.length,
      users
    }
  } catch (e) {
    ctx.body = {
      status: 0,
      data: null
    }
  }
}
// 删除
exports.deleteUser = async (ctx) => {
  try {
    const id = ctx.request.body.id || -1
    users = await User.remove({ _id: mongoose.Types.ObjectId(id) })
    if (users) {
      ctx.body = {
        status: 1,
        users
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

// 修改 2018-9-28
exports.updateUser = async (ctx) => {
  try {
    const id = ctx.request.body.key || -1
    const { name, email } = ctx.request.body // 2018-9-28
    users = await User.update({ _id: mongoose.Types.ObjectId(id) }, { name, email })
    if (users) {
      ctx.body = {
        status: 1,
        msg: users
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
