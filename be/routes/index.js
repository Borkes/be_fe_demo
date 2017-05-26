module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/index');
  });
  app.get('/hello', function(req, res) {
    res.redirect('/hello');
  })
};
