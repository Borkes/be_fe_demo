const path = require('path');
const fs = require('fs')
const http = require('http')
const https = require('https')
const express = require('express');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const log4js = require('log4js');
const middle = require('./middlewares')
const app = express();
const dbconfig = require('./config/config_test').dbConfig;
global.DB = require('./util/db');

app.use(cookieParser()); //使用cookie
// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
app.set('routes', path.join(__dirname, 'routes'))
app.set('title', 'my app example') //默认settings, view里面使用settings.title
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
app.use(log4js.connectLogger(log4js.getLogger('main'), { level: 'AUTO', format: ':remote-addr :method :url :status :response-time ms' }))
// session 中间件
app.use(middle.session(redisStore));

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

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err.message)
})

// 监听端口，启动程序
/*app.listen(4000, function () {
  console.log('hello world?');
});
app实现：
app.listen = function(...arg) {
  let server = http.createServer(this);
  return server.listen.apply(server, arg)
}

*/

process.on('uncatchException', (err) => {
    console.log(err);
})

http.createServer(app).listen(8088, function () {
    console.log('hello world http 8088')
});
//https 没有安全证书
/*const option = {
  key: fs.readFileSync('ssh_key.pem'),
  cert: fs.readFileSync('ssh_cert.pem')
}
https.createServer(option, app).listen(4443, function() {
  console.log('hello world https 4433')
});*/