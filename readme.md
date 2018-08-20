# 我的个人站服务端代码

- 个人站链接: [https://www.vanoc.top]

> 基于koa2 + mongoose

# MyBlog 后台接口说明：

* 用户查询接口
```js
  url: /u/getUser
  type: GET
  data: {
    email: 用户邮箱号码 //String
  }
  result: {
    status: 0表示失败 1表示成功
    data: 返回的用户信息
  }
```

* 用户注册接口
```js
  url: /u/saveUser
  type: POST
  data: {
    email: 用户邮箱号码 //String
    name: 用户名 //String
  }
  result: {
    status: 0表示失败 1表示成功
    data: 返回的用户信息
  }
```


* 更新留言接口
```js
  url: /m/showMsg
  type: GET
  data: {
    msgId: 最后一条留言的Id 会返回ID之后的20条 若请求首屏则输入1 // String
  }
  result: {
    status: 0表示失败 1表示成功
    data: 返回请求的留言信息 // Array * 20
  }
```



* 保存留言接口
```js
  url: /m/saveMsg
  type: POST
  data: {
    email: 用户邮箱 // String
    message: 留言内容 // String
  }
  result: {
    status: 0表示失败 1表示成功
    data: 返回留言信息 
  }
```


* 留言点赞接口
```js
  url: /m/upSup
  type: POST
  data: {
    msgId: 被点赞留言的ID //String
    upNum: 被点赞的次数 //Number
  }
  result: {
    status: 0表示失败；1表示成功
    data: 操作信息
  }
```

* 本站点赞接口
```js
  url: /u/upSup
  type: GET
  data: {}
  result: {
    status: 0表示失败；1表示成功
    data: 返回点赞数
    response: 操作信息
  }
```

* 获取本站点赞数接口
```js
  url: /u/showSup
  type: GET
  data: {}
  result: {
    status: 0表示失败；1表示成功
    data: 返回点赞数
  }
```
