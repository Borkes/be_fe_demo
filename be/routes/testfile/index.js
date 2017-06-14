
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    //res.redirect('/index');
    res.send('testfile')
})
router.get('/hello', function(req, res) {
  res.send('hello testfile')
})

module.exports = router;
