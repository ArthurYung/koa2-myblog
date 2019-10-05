const Koa = require("koa");
const cors = require("koa2-cors");
const mongoose = require("mongoose");
const router = require("./pug/router")();
const db = "mongodb://ouyang:a270079245@mymongo:27017/myBlog"; // mongodb连接地址

mongoose.connect(db, { useNewUrlParser: true }); // 连接mongodeb

const app = new Koa();

app.use(cors()); // cors跨域

app
  .use(router.routes()) // 路由加载
  .use(router.allowedMethods());
console.log("app start");

app.listen(3005); // 监听端口号
