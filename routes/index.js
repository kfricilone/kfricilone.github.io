var express = require('express');
var router = express.Router();

var parser = require('../parser');

router.get('/', function(req, res, next)
{

  parser.parse('kfricilone', 'kfricilone.me', function(html)
  {
    res.send(html);
  });

});

module.exports = router;
