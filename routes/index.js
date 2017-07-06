var express = require("express");
var router = express.Router();

// route: SERVER_ROOT
router.get("/", function(req, res) {
  res.render("landing");
});

module.exports = router;
