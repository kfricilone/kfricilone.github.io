const express = require('express');
const router = express.Router();

const parser = require('../parser');

router.get('/', function(req, res, next) {

  parser.parse('service-rs', 'spring-rs', function(html) {
    res.send(html);
  });

});

module.exports = router;
