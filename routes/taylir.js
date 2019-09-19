var express = require('express');
var router = express.Router();

var parser = require('../parser');

router.get('/', function(req, res, next)
{

  parser.parse('kfricilone', 'Taylir', function(html)
  {
    res.send(html);
  });

});

module.exports = router;
