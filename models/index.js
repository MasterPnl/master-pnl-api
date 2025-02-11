const Sequelize = require("sequelize");
const dbConfig = require("../config/config.json");

const db = {};
const { database, username, password, host, dialect } = dbConfig.development;
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
