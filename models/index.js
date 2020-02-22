"use strict";
var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if(config.use_env_variable)
{
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
}
else
{
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter(function(file)
    {
        return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
    })
    .forEach(function(file)
    {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName)
{
    if(db[modelName].associate)
    {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.CatchHistory = require("./catch.js")(sequelize, Sequelize);
db.Rig = require("./rig.js")(sequelize, Sequelize);
db.Tackle = require("./tackle.js")(sequelize, Sequelize);
db.User = require("./user.js")(sequelize, Sequelize);
//dependencies go here possibly



// //Relations
// db.Rig.belongsTo(db.CatchHistory);
// db.CatchHistory.hasMany(db.Rig);
// db.CatchHistory.belongsTo(db.User);
// db.User.hasMany(db.CatchHistory);

module.exports = db;