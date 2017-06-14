
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('testfile hello')
})
router.get('/hello', function(req, res) {
  res.send('testfile hello hello')
})

module.exports = router;
