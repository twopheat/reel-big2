// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {


  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

  // activity route loads the activity.html page
  app.get("/activity", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/activity.html"));
  });

  // all route loads the dashboard.html page
  app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

};
