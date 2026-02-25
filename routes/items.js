// routes/items.js
var express = require('express');
var router = express.Router();

/* GET items listing. */
router.get('/', function(req, res) {
  res.json({ message: 'respond with items' });
});

module.exports = router;