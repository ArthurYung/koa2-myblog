'use strict'

const Router = require('koa-router')
const User = require('./user.js')
const Koabody = require("koa-body")
const Msg = require('./message')

module.exports = function(){
	var router = new Router()

  router.get('/u/getUser', User.getUser) // 查询用户是否存在
  router.post('/u/saveUser',Koabody(), User.saveUser) // 注册用户
  router.get('/u/upSup', User.upSup) // 博客点赞
  router.get('/u/showSup', User.showSup) // 查询博客点赞数
  router.get('/m/showMsg', Msg.showMsg) // 查询留言
  router.post('/m/saveMsg',Koabody(), Msg.saveMsg) // 保存留言
  router.post('/m/upSup',Koabody(), Msg.upSup) // 留言点赞
  return router
}