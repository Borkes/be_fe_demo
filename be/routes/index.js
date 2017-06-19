// 传入app路由
/*module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/index');
  });
  app.get('/hello', function(req, res) {
    res.redirect('/hello');
  })
};*/
//自动路由
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('hello')
})
router.get('/hello', function(req, res) {
  //res.redirect('/hello');
  console.log(req.route, req.ip, req.ips)
   res.send('world')
})

module.exports = router;
