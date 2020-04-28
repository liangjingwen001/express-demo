var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let {us, ps} = req.query;
  req.session.us = us
  req.session.ps = ps
  console.log(req.session.us)
  res.send('respond with a resource');
});

module.exports = router;
