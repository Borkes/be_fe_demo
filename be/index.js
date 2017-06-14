var path = require('path');
var express = require('express');
var session = require('express-session');
var log4js = require('log4js');

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
app.set('routes', path.join(__dirname, 'routes'))
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'dist')));
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
var routers = app.get('routes');
fs.readdirSync(routers).forEach(function (fileName) {
    var filePath = routers + fileName;
    var rname = fileName.substr(0, fileName.lastIndexOf("."));
    if (!fs.lstatSync(filePath).isDirectory()) {
        if (rname === 'index') {
            app.use('/', require(filePath));
        }
        app.use('/' + rname, require(filePath));
    } else {
        var dirName = fileName;
        fs.readdirSync(routes + dirName).forEach(function (childFileName) {
            var childFilePath = filePath + '/' + childFileName;
            var childName = childFileName.substr(0, childFileName.lastIndexOf('.'));
            if (!fs.lstatSync(childFilePath).isDirectory()) {
                if (childName === 'index') {
                    app.use('/' + dirName, require(childFilePath));
                }
                app.use('/' + dirName + '/' + childName, require(childFilePath));
            }
        })
    }
})

// 监听端口，启动程序
app.listen(3000, function () {
  console.log('hello world');
});