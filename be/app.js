const path = require('path');
const fs = require('fs')
const express = require('express');
const session = require('express-session');
const log4js = require('log4js');

const app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
app.set('routes', path.join(__dirname, 'routes'))
// 设置静态文件目录
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(log4js.connectLogger(log4js.getLogger('main'), { level: 'AUTO', format: ':remote-addr :method :url :status :response-time ms' }))
// session 中间件
/*app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));*/

// 自动路由
const routers = app.get('routes');
function runRouter(root, routers) {
  fs.readdirSync(routers).forEach(function (fileName) {
    let filePath = routers + '/' + fileName;
    let rname = fileName.substr(0, fileName.lastIndexOf("."));
    //console.log(1,rname,2, fileName,3, filePath)
    if (!fs.lstatSync(filePath).isDirectory()) {
      if (rname === 'index') {
        app.use(root + '/', require(filePath));
      }
      app.use(root + '/' + rname, require(filePath));
    } else {
      let path = root + '/' + fileName;
      runRouter(path, filePath);
    }
  })
}
runRouter('', routers);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send(err.message)
})

// 监听端口，启动程序
app.listen(4000, function () {
  console.log('hello world?');
});