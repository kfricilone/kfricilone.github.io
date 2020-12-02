const express = require('express');
const router = express.Router();

const parser = require('../parser');

router.get('/', function(req, res, next) {

  parser.parse('kfricilone', 'Protector', function(html) {
    res.send(html);
  });

});

module.exports = router;
