'use strict'

const Router = require('koa-router')
const User = require('./user.js')
const Koabody = require("koa-body")
const Msg = require('./message')

const CrmUser = require('./crm/users')
const CrmLogin = require('./crm/login')
const CrmMsg = require('./crm/msgs')

const {routeToken} = require('./crm/routeToken')

module.exports = function(){
	var router = new Router()

  router.get('/u/getUser', User.getUser) // 查询用户是否存在
  router.post('/u/saveUser',Koabody(), User.saveUser) // 注册用户
  router.get('/u/upSup', User.upSup) // 博客点赞
  router.get('/u/showSup', User.showSup) // 查询博客点赞数
  router.get('/m/showMsg', Msg.showMsg) // 查询留言
  router.post('/m/saveMsg',Koabody(), Msg.saveMsg) // 保存留言
  router.post('/m/upSup',Koabody(), Msg.upSup) // 留言点赞

  // crm
  router.post('/crm/login',Koabody(), CrmLogin.LoginIn) // 登陆后台
  router.post('/crm/uShow', Koabody(), routeToken, CrmUser.showUsers) // 查询用户
  router.post('/crm/delete',Koabody(), routeToken, CrmUser.deleteUser) // 删除用户
  router.post('/crm/upUser',Koabody(), routeToken, CrmUser.updateUser) // 修改用户
  router.post('/crm/mShow', Koabody(),  routeToken, CrmMsg.showMessages) // 查询留言
  router.post('/crm/mdelete',Koabody(), routeToken, CrmMsg.deleteMessage) // 删除留言
  router.post('/crm/upMsg',Koabody(), routeToken, CrmMsg.updateMessage) // 修改留言
  return router
}